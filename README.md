# Direction

[![Build Status](https://travis-ci.org/Amanej/Direction.svg?branch=master)](https://travis-ci.org/Amanej/Direction)

> A node based router - in progress

## Usage

* Define routes

```
    DirectionRoutes = [
        {
            name: "god-dag",
            method: "GET",
            handler: (req,res) => {
                let message = JSON.stringify({"message":"Hei, ha en god dag!"});
                res.end(message);
            }
        },
        {
            name: "bootstrap",
            method: "GET",
            handler: (req,res) => {
                let file = fs.readFileSync("./test/helpers/bootstrap.html","utf-8");
                res.end(file);
            }
        }
    ]
```

Routes are expected to be:
```
    name - Route - String
    method - HTTP Method - String
    handler - Response function - Function
```

* Init Router

```
    const DirectionRouter = new Direction(DirectionRoutes);
```

* Pass to server

```
    const server = http.createServer((req,res) => {
        DirectionRouter.handleRequests(req,res)
    });    
```

## Features

* Basic json routes
* Serve HTML

## Todo

* Process post request
* Handle file uploads

### Battle test

* Build basic homepage with router
* Build webapp with router