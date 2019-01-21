const fs = require('fs');
const http = require('http');
const Direction = require('../lib/index.js');

let DirectionRoutes = [
    {
        name: "god-dag",
        method: "GET",
        handler: (req,res) => {
            let message = JSON.stringify({"message":"Hei, ha en god dag!"});
            res.end(message);
        }
    },
    {
        name: "hello",
        method: "GET",
        handler: (req,res) => {
            let message = JSON.stringify({"message":"Hello, dude. You are great!"});
            res.end(message);
        }
    },
    {
        name: "website",
        method: "GET",
        handler: (req,res) => {
            let body = "<html><h2>Hello</h2></html>"
            //res.setHeader()
            res.end(body);
        }
    },
    {
        name: "mysite",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./demo/html/website.html","utf-8");
            res.end(file);
        }
    },
    {
        name: "bootstrap",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./demo/html/bootstrap.html","utf-8");
            res.end(file);
        }
    },
    {
        name: "vueapp",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./demo/html/vueapp.html","utf-8");
            res.end(file);
        }
    },
    {
        name: "",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./demo/html/index.html","utf-8");
            res.end(file);
        }
    }
]

const DirectionRouter = new Direction(DirectionRoutes);

const server = http.createServer((req,res) => {
    DirectionRouter.handleRequests(req,res)
});

let port = process.env.PORT || '2024';
server.listen(port,function() {
    console.log(`The server is listening on ${port}`)
});