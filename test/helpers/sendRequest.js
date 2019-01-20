const http = require('http');

sendRequest = (url,cb) => {
    return http.get(url || "http://localhost:2024/god-dag",(res) => {
        const { statusCode } = res;
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            //console.log(rawData);
            const parsedData = JSON.parse(rawData);
            //console.log(parsedData, parsedData.message);
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
}

module.exports = sendRequest;