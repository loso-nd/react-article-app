import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';

// In memory database server to track comments, upvotes
const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'mongo-db', upvotes: 0, comments: [] },
];

const app = express();
const port = 8000;

// Tells our request app if it sees a request body, it should add it to the request.body object.
app.use(express.json());

let db;

async function connectToDB() {
// Create a new instance of that MongoClient, enabling a connection to MongoDB in the same way 
// we connect to it from the terminal by typing the command Mongosh.
    const uri = 'mongodb+srv://Cluster21741:amdpV3FoeVBT@cluster21741.suamqwc.mongodb.net/?appName=Cluster21741';

    const client  =  new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    // tell Mongo client to connect to Mongodb instance
    await client.connect();

    // Referene to the database name
    db = client.db('test');
}

//Create a new endpoint that will allow us to load data for one of our articles without modifying it
app.get('/api/articles/:name', async (req, res) =>  {
    const { name } = req.params;

    // make a query to the database we are connected to find the one article we are looking for
    const article = await db.collection('articles').findOne({ name })
    
    res.json(article);
});


//GET the value of this route param (name) to find the corresponding article and increment the number of up votes
app.post('/api/articles/:name/upvote', async (req, res) =>  {
    const { name } = req.params;
// Start by finding the article by its name, use findOneAndUpdate to find the article whose name matches the name 
// route parameter. The second arg is an object specifying the changes we want to make to that document. 
// This one uses a special syntax that's unique to MongoDB => $inc, that stands for increment, 
// to increment the upvotes by one. 
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $inc: {upvotes: 1}
    }, {
// we need to pass a settings object that will tell MongoDB when we want to return the document that we're finding, 
// Options to return before or after update
        ReturnDocument: "after",
    });

    res.json(updatedArticle)
});

//Endpoint will allow users to add comments to an article.
app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articleInfo.find(a => a.name === name);

    article.comments.push({
        postedBy,
        text
    });

    res.json(article);
});

async function start() {
    await connectToDB();

    app.listen(port, function() {
    
    console.log('Server is listening on port: 8000')
    })
}

start();