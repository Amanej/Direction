# Direction

[![Build Status](https://travis-ci.org/Amanej/Direction.svg?branch=master)](https://travis-ci.org/Amanej/Direction)

> An node based router - in progress

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
    ]
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
* Serve static files

## Todo

* Process post request

### Battle test

* Build basic homepage with router
* Build webapp with router