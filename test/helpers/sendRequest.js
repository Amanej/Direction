const http = require('http');

sendRequest = (url,type,encoding,cb) => {
    return http.get(url || "http://localhost:2024/god-dag",(res) => {
        const { statusCode } = res;
        res.setEncoding(encoding || 'utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            let parsedData;
            
            switch(type) {
                case 'json':
                        parsedData = JSON.parse(rawData);
                    break;
                case 'html':
                        parsedData = rawData;
                    break;                    
            }
            
            cb(null,{
                data: parsedData,
                statusCode: statusCode
            });
          } catch (e) {
                console.error(e.message);
                cb(e,null);
          }
        });
    });    
};
sendRequestPromise = (url) => {
    return new Promise(function(resolve,reject) {        
        http.get(url || "http://localhost:2024/god-dag",(res) => {
            const { statusCode } = res;
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              try {
                const parsedData = JSON.parse(rawData);
                resolve({
                    data: parsedData,
                    statusCode: statusCode
                })
              } catch (e) {
                    console.error(e.message);
                    reject(e);
              }
            });
        });    
    })
}

module.exports.sendRequest = sendRequest;
module.exports.promiseRequest = sendRequestPromise;