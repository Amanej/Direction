const url = require('url');
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
            console.log("Path ",trimmedPath);
        // Find the right route 
        const findRoute = this.routes.filter(r => r.name == trimmedPath);
        // Not found, send default 404
        if(findRoute.length) {
            findRoute[0].handler(req,res);
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    }
}

module.exports = Direction;