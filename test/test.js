const assert = require('assert');
const chai = require('chai');
const chaiAssert = chai.assert;

const fs = require('fs');
const http = require('http');
const Direction = require('../lib/index.js');

const {sendRequest,promiseRequest} = require('./helpers/sendRequest');

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
            let file = fs.readFileSync("./test/helpers/website.html","utf-8");
            res.end(file);
        }
    },
    {
        name: "bootstrap",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./test/helpers/bootstrap.html","utf-8");
            res.end(file);
        }
    },
    {
        name: "vueapp",
        method: "GET",
        handler: (req,res) => {
            let file = fs.readFileSync("./test/helpers/vueapp.html","utf-8");
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

describe('Basic json request', function() {
    describe('Test first endpoint', function() {
        it('correct statusCode and json', function() {
            sendRequest("http://localhost:2024/god-dag",'json','utf-8',function(e,r) {
                assert.equal(r.statusCode, 200);
                assert.equal(r.data.message, "Hei, ha en god dag!");
            });
        })
    })
    describe('Test second endpoint', function() {
        it('correct statusCode and json', function() {
            sendRequest("http://localhost:2024/hello",'json','utf-8',function(e,r) {
                assert.equal(r.statusCode, 200);
                assert.equal(r.data.message, "Hello, dude. You are great!");
            })
        })
    });
})

describe('Basic html request', function() {
    describe('Test hellow world HTML file', function() {
        it('correct statusCode and data', function() {
            sendRequest("http://localhost:2024/website",'html','utf-8',function(e,r) {
                assert.equal(r.statusCode, 200);
            });
        })
        it('correct statusCode and data', function() {
            sendRequest("http://localhost:2024/website",'html','utf-8',function(e,r) {
                assert.equal(r.data, "<html><h2>Hello</h2></html>");
            });
        })

    })
    describe('Test bootstrap HTML file', function() {
        it('correct statusCode and data', function() {
            sendRequest("http://localhost:2024/bootstrap",'html','utf-8',function(e,r) {
                assert.equal(r.statusCode, 200);
            });            
        });
        it('correct file data', function() {
            sendRequest("http://localhost:2024/bootstrap",'html','utf-8',function(e,r) {
                let _htmlFile = fs.readFileSync("./test/helpers/bootstrap.html","utf-8")
                assert.equal(r.data, _htmlFile);
            });            
        });
    });
    describe('Test bootstrap Vue app file', function() {
        it('correct statusCode and data', function() {
            sendRequest("http://localhost:2024/vueapp",'html','utf-8',function(e,r) {
                assert.equal(r.statusCode, 200);
            });            
        });
        it('correct file data', function() {
            sendRequest("http://localhost:2024/vueapp",'html','utf-8',function(e,r) {
                let _htmlFile = fs.readFileSync("./test/helpers/vueapp.html","utf-8")
                assert.equal(r.data, _htmlFile);
                // Final call
                server.close();
            });            
        });
    });
});
