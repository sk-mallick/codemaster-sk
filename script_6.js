/* Fit card titles on one line: one shared size for all cards, shrinking only if the longest needs it */
(function(){
  function fit(){
    var hs=[].slice.call(document.querySelectorAll('#work .project-heading h3'));
    hs.forEach(function(h){ h.style.fontSize=''; });
    if(!hs.length) return;
    var base=parseFloat(getComputedStyle(hs[0]).fontSize), size=base;
    var over=function(){ return hs.some(function(h){ return h.scrollWidth>h.clientWidth+0.5; }); };
    while(over() && size>12){ size-=0.5; hs.forEach(function(h){ h.style.fontSize=size+'px'; }); }
  }
  var t;
  function later(){ clearTimeout(t); t=setTimeout(fit,120); }
  window.addEventListener('resize',later,{passive:true});
  window.addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit,400); setTimeout(fit,2500);
})();