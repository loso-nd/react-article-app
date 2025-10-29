import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const app = express();

// Enable CORS for all routes
app.use(cors());

// Tells our request app if it sees a request body, it should add it to the request.body object.
app.use(express.json());

let db;

async function connectToDB() {
// Create a new instance of that MongoClient, enabling a connection to MongoDB 
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster21741.suamqwc.mongodb.net/?appName=${process.env.MONGO_CLUSTERNAME}`
    

    const client  =  new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    await client.connect();
    db = client.db('test');
}

//middleware to server frontend files to the backend
app.use(express.static(path.join(__dirname, '../dist')))

// anything not starting with api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Create a new endpoint that will allow us to load data for one of our articles without modifying it
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });
  res.json(article);
});

// Express middleware to check every req to validate if users have authorization to upvote or leave comments
app.use(async function(req, res, next) {
    const { authtoken } = req.headers

    if (authtoken) {
        const user = await admin.auth().verifyIdToken(authtoken);
        req.user = user;
        next();
    } else {
        res.sendStatus(400, "Bad Request");
    }
})


//GET the value of this route param (name) to find the corresponding article and increment the number of up votes
app.post('/api/articles/:name/upvote', async (req, res) =>  {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $inc: {upvotes: 1},
        $push: {upvoteIds: uid}
    }, {
        returnDocument: "after",
    });

    res.json(updatedArticle)
    } else {
        res.sendStatus(403, 'Request denied, that article does not exist');
    }
});

//Endpoint will allow users to add comments to an article.
app.post('/api/articles/:name/comments', async(req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text};

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $push: {comments: newComment}
    }, {
        returnDocument: 'after',
    });

    res.json(updatedArticle);
});

const PORT = process.env.PORT || 8000

async function start() {
    await connectToDB();

    app.listen(PORT, function() {
    
    console.log('Server is listening on port: ' + PORT)
    })
}

start();