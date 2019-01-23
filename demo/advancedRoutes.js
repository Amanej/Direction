const https = require('https');
// XML2JSON
const xml2js = require('xml2js');

const parseRates = require('./dataParse/parseRates.js')

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
                  
                xml2js.parseString(rawData, function (err, result) {
                    if(err) {
                        console.error('e',err)
                        cb(err,null)
                    } else {
                        // Parsed currency rates
                        const rates = result["message:StructureSpecificData"]['message:DataSet'][0].Series;
                        const parsedRates = parseRates.getCurrencyPairs(rates);
                        //console.log('parsedRates ',parsedRates);
                        const stringifiedData = JSON.stringify(parsedRates);
                        cb(null,{
                            data: stringifiedData,
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