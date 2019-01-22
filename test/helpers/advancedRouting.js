const https = require('https');
// XML2JSON
const xml2js = require('xml2js');

const extensiveRoutes = {
    fetchDataExternalSource: function(cb) {
        const url = "https://data.norges-bank.no/api/data/EXR?lastNObservations=1";
        return https.get(url,(res) => {
            const { statusCode } = res;
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              try {
                  
                //console.log("rawData ",rawData)
                xml2js.parseString(rawData, function (err, result) {
                    console.dir(result);
                    if(err) {
                        
                    } else {
                        console.log(result)
                        let parsedData = JSON.stringify(result);
                        cb(null,{
                            data: parsedData,
                            statusCode: statusCode
                        });
                    }
                });

              } catch (e) {
                    console.error(e.message);
                    cb(e,null);
              }
            });
        });    
    },
    fetchDataDatabase: function() {

    }
}

module.exports = extensiveRoutes;