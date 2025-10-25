import express from 'express';

const app = express();
const port = 8000

// Tells our request app if it sees a request body, it should add it to this request.body object.
app.use(express.json());

// Define a path to and endpoint to request a return(message or response)
// 1st arg is the route, 2nd is the callback funciton
app.get('/hello', function(req, res) {
    res.send('Hello World, from a GET endpoint!')
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