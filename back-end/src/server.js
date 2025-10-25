import express from 'express';

// In memory database server to track comments, upvotes

const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'mongo-db', upvotes: 0, comments: [] },
];

const app = express();
const port = 8000;

// Tells our request app if it sees a request body, it should add it to this request.body object.
app.use(express.json());


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