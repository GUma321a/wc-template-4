// ************************** Change Background Color ************************** //
let getElementsInArea = (function(docElm){
  let viewportHeight = docElm.clientHeight;

  return function(e, opts){
      let found = [], i;
      
      if ( e && e.type == 'resize' ){
        viewportHeight = docElm.clientHeight;
      }

      for ( i = opts.elements.length; i--; ){
          let elm           = opts.elements[i];
          let htmlContainer = document.querySelector("html");
          let pos           = elm.getBoundingClientRect();
          let topPerc       = pos.top    / viewportHeight * 100;
          let bottomPerc    = pos.bottom / viewportHeight * 100;
          // let middle        = (topPerc + bottomPerc)/2;
          let inViewport    = bottomPerc > opts.zone[1] && topPerc < (100-opts.zone[1]);

          htmlContainer.classList.toggle(opts.markedClass, inViewport);

          if ( inViewport ){
            found.push(elm);
          }
      }
  };
})(document.documentElement);


function getElementsInAreaOptions(e){
  getElementsInArea(e, {
      elements    : document.querySelectorAll('.black-background-trigger'), 
      markedClass : 'active-black',
      zone        : [50, 50] // percentage distance from top & bottom
  });
  
  getElementsInArea(e, {
      elements    : document.querySelectorAll('.rose-background-trigger'), 
      markedClass : 'active-rose',
      zone        : [50, 50] // percentage distance from top & bottom
  });
}

window.addEventListener('scroll', getElementsInAreaOptions);
window.addEventListener('resize', getElementsInAreaOptions);
// ************************** Change Background Color ************************** //