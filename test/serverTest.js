const http = require('http');
const Direction = require('../lib/index.js');


let DirectionRoutes = [
    {
        name: "god-dag",
        method: "GET",
        handler: (req,res) => {
            res.end("Hei, ha en god dag!")
        }
    }
]

const DirectionRouter = new Direction(DirectionRoutes);

const server  = http.createServer((req,res) => {
    DirectionRouter.handleRequests(req,res)
});

let port = process.env.PORT || '2024';
server.listen(port,function() {
    console.log(`The server is listening on ${port}`)
})