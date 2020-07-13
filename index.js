const path = require('path');
const port = 8000;
const http = require('http');

const server = http.createServer();
server.listen(port, function(err){
    if(err){
        console.log('Error: ', err);
    }
    console.log("Server is up and running on port", port);
});