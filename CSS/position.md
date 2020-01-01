# CSS Position

*Position properties*
> static | relative | absolute | fixed | sticky

*Helper properties*
> top | right | bottom | left | z-index

###  1. Static 

Default position, elements follow the document flow. `top | right | bottom | left` doesn't work with `position: static`

###  2. Relative

Similar to static position but you could use `top | right | bottom | left` to change position of the element relative to where the document normally be. (lift it up and move it, the element still occupied original space)

```html
<html>
  <title>CSS Position</title>
  <style>
  .parent {
  
  }
  
  .child-one {
    position: relative;
    top: 10px;
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
