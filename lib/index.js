const url = require('url');
const fs = require('fs');
// Super simple router
class Direction {
    constructor(routes) {
        // Expects
        /* 
            {
                name: ,
                method: ,
                handler: 
            }
        */
        this.routes = routes;
    }
    handleRequests(req,res) {
        // Get Method
        const method = req.method.toLowerCase();
        // Get Headers
        const headers = req.headers;
        // Parse URL
            // Parse url 
            const parsedUrl = url.parse(req.url,true);
            // Get path
            let trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
            console.log('trimmedPath ',trimmedPath);
        // Find the right route 
        const findRoute = this.routes.filter(r => r.name == trimmedPath);
        
        // Not found, send default 404
        if(findRoute.length) {
            findRoute[0].handler(req,res);
        } else {
            let staticRouteCheckGet = this.checkForStaticRoute(trimmedPath);
            if(staticRouteCheckGet) {
                staticRouteCheckGet.handler(req,res);
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        }
    }
    checkForStaticRoute(path) {
        const staticRoute = this.routes.find(r => r.static);
        if(staticRoute) {
            let reqIsForStatic = (path.indexOf(staticRoute.name)+1);
            return reqIsForStatic ? staticRoute : false
        } else {
            return false
        }
    }
    setStaticFolder(folder) {
        let folderExists = fs.existsSync(`./${folder}`)
        console.log('folder exists ',folderExists);

        this.routes.push(
            {
                name: "static",
                method: "GET",
                static: true,
                handler: this.handleStaticRoute
            }            
        )
    }
    handleStaticRoute(req,res) {
        console.log(req,res)
        /*let file = fs.readFileSync("./test/helpers/bootstrap.html","utf-8");
        res.end(file);*/
        res.end("Hello")
    }
}

module.exports = Direction;