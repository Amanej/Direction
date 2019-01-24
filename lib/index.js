const url = require('url');
const fs = require('fs');
const path = require('path');

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
                //staticRouteCheckGet.handler(req,res);
                this.handleStaticRoute(req,res);
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
        console.log('folder exists ',folderExists,folder);

        this.routes.push(
            {
                name: "static",
                method: "GET",
                static: true,
                folder: folder,
                handler: this.handleStaticRoute
            }            
        )
    }
    getContentType(type) {
        const map = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/svg+xml',
            '.jpg': 'image/jpeg',
            '.wav': 'audio/wav',
            '.mp3': 'audio/mpeg',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword'
        };
        return map[type]
    }
    handleStaticRoute(req,res) {
        console.log(this)
        console.log(req.url);
        console.log(process.cwd());
        //res.end('Hello')
        const contentType = this.getContentType(path.extname(req.url));
        //let p = `./${req.url}`;
        let p  = './test/static/mark-github.svg'
        console.log("File exists ", fs.existsSync(p));
        fs.readFile(p,(err,data) => {
            if(err) {
                console.log(err);
                res.statusCode = 404;
                res.end('Couldnt find your file');
            } else {
                console.log('Data ',data);
                res.setHeader('content-type', `${contentType}`);
                res.statusCode = 200;
                res.end(data);
            }
        })
        //res.end('Hello')
    }
}

module.exports = Direction;