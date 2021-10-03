const http = require('http');
const Direction = require('./lib/index.js');

let DirectionRoutes = [
    {
        name: "god-dag",
        method: "GET",
        handler: (req,res) => {
            let message = JSON.stringify({"message":"Hei, ha en god dag!"});
            res.end(message);
        }
    }
]

const DirectionRouter = new Direction(DirectionRoutes);
DirectionRouter.setStaticFolder('test/static');

const server = http.createServer((req,res) => {
    DirectionRouter.handleRequests(req,res)
});

let port = process.env.PORT || '2024';
server.listen(port,function() {
    console.log(`The server is listening on ${port}`)
});
