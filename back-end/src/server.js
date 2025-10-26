import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

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

//Create a new endpoint that will allow us to load data for one of our articles without modifying it
app.get('/api/articles/:name', async (req, res) =>  {
    const { name } = req.params;

// Create a new instance of that MongoClient, which will enable us to connect to MongoDB in the same way 
// that we were able to connect to it from the terminal by typing the command Mongosh.
    const uri = 'mongodb+srv://Cluster21741:amdpV3FoeVBT@cluster21741.suamqwc.mongodb.net/?appName=Cluster21741';

    const client  =  new MongoClient(uri, {
        // default setting object 
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    // tell Mongo client to connect to Mongodb instance
    await client.connect(); // this entire function is async

    // Referene to the cluster we created.
    const db = client.db('test');

    // make a query to the database we are connected to find the one article we are looking for
    const article = await db.collection('articles').findOne({ name })
    

    // send back the udpated article
    res.json(article);
});


//GET the value of this route param (name) to find the corresponding article and increment the number of up votes
app.post('/api/articles/:name/upvote', (req, res) =>  {
    const { name } = req.params;
    const article = articleInfo.find(a => a.name === name);
    article.upvotes += 1

    // send back the udpated article
    res.json(article);
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

    // send back the udpated article
    res.json(article);
});

// First arg is the port & Second is a callback function or route handler
app.listen(port, function() {
    console.log('Server is listening on port: 8000')
})

// ServerAPIVerion => creates a new instance of this MongoClient