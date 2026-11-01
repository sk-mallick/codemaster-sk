(function(){
  var root=document.documentElement;
  if(!root.classList.contains('mo')) return;

  /* helpers */
  function splitWords(el){
    var label=el.textContent.replace(/\s+/g,' ').trim(), idx=0;
    el.setAttribute('aria-label',label);
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var frag=document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(t){
            if(!t) return;
            if(/^\s+$/.test(t)){ frag.appendChild(document.createTextNode(' ')); return; }
            var w=document.createElement('span'); w.className='m-w'; w.setAttribute('aria-hidden','true');
            var i=document.createElement('span'); i.textContent=t; i.style.setProperty('--wi',idx++);
            w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        } else if(n.nodeType===1 && n.tagName!=='BR'){ walk(n); }
      });
    })(el);
  }

  /* 1. Masked word reveal: hero headline + every section heading */
  var h1=document.querySelector('.hero h1'); if(h1) splitWords(h1);
  [].slice.call(document.querySelectorAll('.section-head h2,.about-copy h2,.faq-intro h2,.contact-copy h2')).forEach(splitWords);

  /* 2. Typing effect in the hero */
  var hc=document.querySelector('.hero-copy');
  if(hc){
    var full=hc.textContent.trim();
    hc.setAttribute('aria-label',full);
    hc.innerHTML='<span aria-hidden="true">I build <span class="m-typed"></span><span class="m-caret"></span></span>';
    var out=hc.querySelector('.m-typed');
    var phrases=['polished websites.','learning platforms.','student portals.','business dashboards.','AI-powered workflows.'];
    var pi=0,ci=0,del=false;
    function tick(){
      var word=phrases[pi];
      if(!del){ ci++; out.textContent=word.slice(0,ci); if(ci===word.length){ del=true; return setTimeout(tick,1900); } return setTimeout(tick,58); }
      ci--; out.textContent=word.slice(0,ci);
      if(ci===0){ del=false; pi=(pi+1)%phrases.length; return setTimeout(tick,380); }
      setTimeout(tick,28);
    }
    var started=false;
    function startTyping(){ if(started) return; started=true; setTimeout(tick,900); }
    if(root.classList.contains('intro-done')) startTyping();
    else new MutationObserver(function(m,o){ if(root.classList.contains('intro-done')){ o.disconnect(); startTyping(); } }).observe(root,{attributes:true,attributeFilter:['class']});
  }

  /* 3. Different entrance for different sections */
  function from(sel,v){ [].slice.call(document.querySelectorAll(sel)).forEach(function(e){ e.style.setProperty('--from',v); }); }
  var narrow=window.innerWidth<760, dx=narrow?24:64;
  from('.about-visual','translateX(-'+dx+'px) scale(.95)');
  from('.about-copy','translateX('+dx+'px)');
  from('.service-card','perspective(800px) rotateX(-16deg) translateY(40px)');
  from('.skill','scale(.8)');
  from('.process-card','translateY(46px)');
  from('.section-head,.faq-intro','translateY(22px)');
  from('.faq-list','translateX('+(narrow?20:40)+'px)');
  from('.contact-copy','translateX(-'+(narrow?20:56)+'px)');
  from('.contact-form','translateX('+(narrow?20:56)+'px)');
  [].slice.call(document.querySelectorAll('.faq-list details')).forEach(function(d,i){ d.style.setProperty('--di',i); });
  [].slice.call(document.querySelectorAll('.skill')).forEach(function(d,i){ d.style.setProperty('--sn',i); });

  /* 4. Hero motion graphics */
  var hero=document.querySelector('.hero');
  if(hero){
    var b=document.createElement('div'); b.className='m-blobs'; b.setAttribute('aria-hidden','true'); b.innerHTML='<i></i><i></i><i></i>';
    hero.insertBefore(b,hero.firstChild);
  }
  var art=document.querySelector('.hero-art');
  if(art){
    ['','two'].forEach(function(c){ var r=document.createElement('div'); r.className='m-orbit '+c; r.setAttribute('aria-hidden','true'); art.insertBefore(r,art.firstChild); });
  }

  /* 5. Trust strip marquee */
  var ti=document.querySelector('.trust-inner');
  if(ti){
    var items=[].slice.call(ti.querySelectorAll('strong'));
    if(items.length){
      var track=document.createElement('div'); track.className='m-track';
      for(var k=0;k<4;k++){
        items.forEach(function(it){ var c=it.cloneNode(true); if(k>0) c.setAttribute('aria-hidden','true'); track.appendChild(c); });
      }
      items.forEach(function(it){ it.remove(); });
      var wrap=document.createElement('div'); wrap.className='m-marq'; wrap.appendChild(track); ti.appendChild(wrap);
    }
  }

  /* 6. Footer signature: letter-by-letter */
  var sig=document.querySelector('.signature-name');
  if(sig){
    var li=0;
    [].slice.call(sig.childNodes).forEach(function(n){
      if(n.nodeType===3){
        var f=document.createDocumentFragment();
        n.textContent.split('').forEach(function(ch){ var sp=document.createElement('span'); sp.className='m-l'; sp.setAttribute('aria-hidden','true'); sp.textContent=ch; sp.style.setProperty('--li',li++); f.appendChild(sp); });
        sig.replaceChild(f,n);
      } else if(n.nodeType===1){ n.classList.add('m-l'); n.style.setProperty('--li',li++); }
    });
  }

  /* 7. Scroll-scrubbed highlight on the About lead */
  var lead=document.querySelector('.about-copy .lead'), words=[];
  if(lead){
    var txt=lead.textContent.trim(); lead.setAttribute('aria-label',txt); lead.textContent='';
    txt.split(/\s+/).forEach(function(w,i){ var sp=document.createElement('span'); sp.className='m-sw'; sp.setAttribute('aria-hidden','true'); sp.textContent=w; lead.appendChild(sp); lead.appendChild(document.createTextNode(' ')); words.push(sp); });
  }
  var busy=false;
  function scrub(){
    busy=false; if(!lead) return;
    var vh=window.innerHeight, r=lead.getBoundingClientRect();
    var start=vh*.9, end=vh*.5, p=Math.max(0,Math.min(1,(start-r.top)/(start-end)));
    var n=Math.round(p*words.length);
    words.forEach(function(w,i){ w.classList.toggle('m-lit',i<n); });
  }
  window.addEventListener('scroll',function(){ if(!busy){busy=true;requestAnimationFrame(scrub);} },{passive:true});
  window.addEventListener('resize',scrub,{passive:true});
  scrub();

  /* 8. Pointer spotlight on cards (desktop pointers only) */
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove',function(e){
      var c=e.target.closest&&e.target.closest('.service-card,.skill,.project-card'); if(!c) return;
      var r=c.getBoundingClientRect();
      c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px');
    },{passive:true});
  }

  /* observers for new elements */
  if('IntersectionObserver' in window){
    var o=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in-view'); o.unobserve(e.target); } }); },{threshold:.3});
    if(sig) o.observe(sig);
  } else if(sig){ sig.classList.add('in-view'); }
})();