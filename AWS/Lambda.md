# How to use lamda

API Gateway + lambda

API Gateway -> get method -> Integration Request. -> Body Mapping Templates -> Content-Type (application/json)
```
{
  "min": $input.params('min'),
  "max": $input.params('max')
}
```
Deployment stage -> Deploy 

Lamda function:

```
'use strict'

export.handler = (event, context, callback) => {
  let min = parseInt(event.min);
  let max = parseInt(event.max);
  
  let generatedNumber = Math.floor(Math.random()* max) + min;
  
  callback(null, generatedNumber);
};
```

# Serverless

https://serverless-stack.com/chapters/what-is-serverless.html


