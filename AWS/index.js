'use strict';

const aws = require('aws-sdk'); 

const s3 = new aws.S3({ 
    accessKeyId: "A12345", 
    secretAccessKey: "Bddjhj123" 
}); 

const getParams = {
    Bucket: 'yhlbucket',
    Key: 'data.json'
}

//Fetch or read data from aws s3
s3.getObject(getParams, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        const result = JSON.parse(new Buffer(data.Body.toString("utf8")))
        console.log(result.something);
        
    }

})
