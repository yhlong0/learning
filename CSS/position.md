# CSS Position

*Position properties*
> static | relative | absolute | fixed | sticky

*Helper properties*
> top | right | bottom | left | z-index

###  1. Static 

Default position, z-index doesn't work with `position: static`


```html
<html>
  <title>CSS Position</title>
  <style>
  .parent {
  
  }
  
  .child-one {
  
  }
  
  .child-two {
  
  }
  
  .child-three {
  
  }
  
  </style>
  <body>
    <div class="parent">
      Parent
      <div class="child-one child">One</div>
      <div class="child-two child">Two</div>
      <div class="child-three child">Three</div>      
  </body>
</html>
```
