'use strict';

const aws = require('aws-sdk'); 

const s3 = new aws.S3({ 
    accessKeyId: "AKIAJS6LBP2N5E6", 
    secretAccessKey: "CbbOQnoS+ADRh/BhxnlTC3jtTPn/3u6ky0" 
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
        console.log(result.cmtsIpAddress);
        
    }

})
