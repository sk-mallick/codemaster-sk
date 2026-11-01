(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar=document.querySelector('.m-progress i');
  var nav=document.querySelector('.nav-wrap');
  var art=document.querySelector('.hero-art');
  var ticking=false;

  function onScroll(){
    var y=window.scrollY||0;
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    if(bar) bar.style.transform='scaleX('+Math.min(1,y/max).toFixed(4)+')';
    if(nav) nav.classList.toggle('m-scrolled',y>12);
    if(art&&!reduce&&y<1100) art.style.setProperty('--py',(y*0.07).toFixed(1)+'px');
    ticking=false;
  }
  window.addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(onScroll);} },{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  onScroll();

  // Active nav link follows the section in view
  var links=[].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if('IntersectionObserver' in window&&links.length){
    var map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var so=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        links.forEach(function(a){a.classList.remove('m-active');});
        var a=map[e.target.id]; if(a) a.classList.add('m-active');
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    ['home','studio','about','services','pricing','work','skills','process','faq','reviews','contact'].forEach(function(id){
      var el=document.getElementById(id); if(el) so.observe(el);
    });
  }

  if(reduce) return;
  root.classList.add('mo');

  // Hero entrance is sequenced after the intro curtain lifts
  var heroText=document.querySelector('.hero-grid>.reveal');
  if(heroText){
    heroText.classList.remove('reveal');
    heroText.classList.add('m-hero-text');
    [].slice.call(heroText.children).forEach(function(c,i){c.style.setProperty('--k',i);});
  }
  if(art){ art.classList.remove('reveal'); art.classList.add('m-hero-art'); }
  setTimeout(function(){root.classList.add('intro-done');},3600); // fallback

  // Staggered reveal for grouped items
  var groups=new Map();
  [].slice.call(document.querySelectorAll('.reveal')).forEach(function(el){
    var k=el.parentElement; if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(el);
  });
  groups.forEach(function(list){
    if(list.length<2) return;
    list.forEach(function(el,i){
      if(el.classList.contains('project-card')) return;
      el.style.transitionDelay=(Math.min(i,8)*70)+'ms';
      var clear=function(e){
        if(e.propertyName!=='opacity') return;
        el.style.transitionDelay='';
        if(!el.classList.contains('process-card')) el.classList.add('m-done');
        el.removeEventListener('transitionend',clear);
      };
      el.addEventListener('transitionend',clear);
    });
  });

  // Count-up for numeric stats, slide-up for the footer signature
  var sig=document.querySelector('.signature-name'); if(sig) sig.classList.add('m-sig');
  var nums=[].slice.call(document.querySelectorAll('.stat strong')).filter(function(n){return /^\d+\+?$/.test(n.textContent.trim());});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        io.unobserve(e.target);
        if(e.target.classList.contains('m-sig')){ e.target.classList.add('in-view'); return; }
        var txt=e.target.textContent.trim(), end=parseInt(txt,10), suf=txt.replace(/^\d+/,'');
        var t0=performance.now(), dur=1300;
        (function step(t){
          var p=Math.min(1,(t-t0)/dur), v=1-Math.pow(1-p,3);
          e.target.textContent=Math.round(end*v)+suf;
          if(p<1) requestAnimationFrame(step);
        })(t0);
      });
    },{threshold:.4});
    nums.forEach(function(n){io.observe(n);});
    if(sig) io.observe(sig);
  } else if(sig){ sig.classList.add('in-view'); }
})();