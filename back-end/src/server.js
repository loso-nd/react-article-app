import express from 'express';

// In memory database server to track comments, upvotes
const articleInfo = [
    { name: 'learn-node', upvotes: 0},
    { name: 'learn-react', upvotes: 0},
    { name: 'mongo-db', upvotes: 0}
];

const app = express();
const port = 8000;

// Tells our request app if it sees a request body, it should add it to this request.body object.
app.use(express.json());

// creating a new upvote
//GET the value of this route param ( name) to find the corresponding article and increment the number of up votes
app.get('/api/articles/:name/upvote', (req, res) =>  {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1

    // send back a response
    res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!')
});

app.get('/hello/:name', function(req, res) {
    res.send('Hello World, ' + req.params.name )
});

app.post('/hello', function(req, res) {
    res.send('Hello , ' + req.body.name + ' from a POST endpoint!')
});

// First arg is the port & Second is a callback function
app.listen(port, function() {
    console.log('Server is listening on port: 8000')
})