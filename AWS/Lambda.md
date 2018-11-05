# How to use lamda

API Gateway + lambda

API Gateway -> get method -> Integration Request. -> Body Mapping Templates -> Content-Type (application/json)
```
{
  "min": "$input.params('min')",
  "max": "$input.params('max')"
}
```
Deployment stage -> Deploy 

Lamda function:

```
'use strict'

export.handler = (event, context, callback) => {
  let min = event.min;
  let max = event.max;
  
  let generatedNumber = Math.floor(Math.random()* max) + min;
  
  callback(null, generatedNumber);
};
```
