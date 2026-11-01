/* Client reviews. Desktop: looping marquee. Small screens: scroll-driven card stack.
   ⚠ SAMPLE TEXT: replace every entry in REVIEWS with real client reviews
   (name, role, project type, rating e.g. 4.8, quote). Cards, stars and the average update automatically. */
(function(){
  var REVIEWS=[
    {name:'Preschool Director',role:'Education',project:'School website',rating:5,text:'The website finally explains our programs clearly. Parents find admissions details in seconds and enquiries have become much easier to handle.'},
    {name:'Construction Firm Owner',role:'Construction',project:'Business website',rating:4.8,text:'Clean, professional and quick to load. Our completed projects look great on every phone and clients now trust us before the first call.'},
    {name:'Beauty Academy Founder',role:'Training academy',project:'Academy website',rating:4.9,text:'Courses, fees and gallery are all beautifully organised. Students tell us the site feels as polished as our own classes.'},
    {name:'Coaching Centre Founder',role:'Education',project:'Learning portal',rating:4.7,text:'Students log in, see their progress and study resources in one place. It saves our team hours of daily follow-ups.'},
    {name:'College Chapter Lead',role:'Student community',project:'Community website',rating:5,text:'Event pages were live within days and members love how simple everything is. Communication was prompt throughout the project.'},
    {name:'Fitness Studio Owner',role:'Health & fitness',project:'Business website',rating:4.6,text:'Memberships and trainers are presented exactly how we imagined. A few small tweaks were handled fast and without fuss.'},
    {name:'Agency Partner',role:'Digital agency',project:'Web development',rating:4.8,text:'Reliable, detail-oriented and great at turning rough ideas into working pages. Delivered on schedule and easy to collaborate with.'},
    {name:'Construction Company Director',role:'Construction',project:'Business website',rating:4.9,text:'The layout shows our services and recent work confidently. We have already received enquiries directly through the contact form.'}
  ];

  var section=document.getElementById('reviews'), mount=document.getElementById('rvMount');
  if(!section||!mount) return;
  var navWrap=document.querySelector('.nav-wrap');
  var toggle=document.getElementById('rvToggle');
  var mq=window.matchMedia('(min-width: 901px)');
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STAR_PATH='<path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z"/>';
  var mode='', stackCards=[], sticks=[], io=null, raf=0, liveIO=null;

  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function stars(n){
    var h='';
    for(var k=0;k<5;k++){
      var f=Math.max(0,Math.min(1,n-k));
      h+='<span class="st" style="--k:'+k+'"><svg class="bg" viewBox="0 0 24 24" aria-hidden="true">'+STAR_PATH+'</svg>'+
         (f>0?'<span class="fl" style="width:'+(f*100).toFixed(0)+'%"><svg viewBox="0 0 24 24" aria-hidden="true">'+STAR_PATH+'</svg></span>':'')+'</span>';
    }
    return h;
  }
  function initials(n){var w=n.split(/\s+/);return (w[0][0]+(w[1]?w[1][0]:'')).toUpperCase();}
  var ROT=[-2,1.6,-1.2,2.2,-1.7,1.3,-2.3,1.5,-1,1.9], TX=[-5,6,-3,5,-6,3,-4,6,-2,4];
  function card(r,i,hidden,shade){
    return '<article class="rv-card" data-tone="'+(i%3)+'" style="--i:'+i+';--rot:'+ROT[i%ROT.length]+'deg;--tx:'+TX[i%TX.length]+'px"'+(hidden?' aria-hidden="true"':'')+'>'+(shade?'<i class="rv-shade" aria-hidden="true"></i>':'')+
      '<span class="rv-quote" aria-hidden="true">\u201C</span>'+
      '<div class="rv-who"><span class="rv-av" aria-hidden="true">'+initials(r.name)+'</span><div><strong>'+esc(r.name)+'</strong><span>'+esc(r.role)+'</span></div></div>'+
      '<div class="rv-rate"><div class="rv-stars" role="img" aria-label="'+r.rating+' out of 5 stars">'+stars(r.rating)+'</div><span class="rv-score">'+r.rating.toFixed(1)+'</span></div>'+
      '<p class="rv-text">\u201C'+esc(r.text)+'\u201D</p>'+
      '<span class="rv-tag">'+esc(r.project)+'</span></article>';
  }

  // Summary: average + count
  var avg=REVIEWS.reduce(function(a,r){return a+r.rating;},0)/REVIEWS.length;
  document.getElementById('rvAvg').textContent=avg.toFixed(1);
  document.getElementById('rvCount').textContent='from '+REVIEWS.length+' client reviews';
  var as=document.getElementById('rvAvgStars');
  as.innerHTML=stars(avg); as.setAttribute('aria-label','Average rating '+avg.toFixed(1)+' out of 5');

  function teardown(){
    if(io){io.disconnect();io=null;} if(liveIO){liveIO.disconnect();liveIO=null;}
    stackCards=[]; sticks=[]; mount.innerHTML='';
  }

  function renderMarquee(){
    var copies=reduced?1:3, rows=[REVIEWS.slice(0,4),REVIEWS.slice(4)], out='';
    rows.forEach(function(list,ri){
      var inner='';
      for(var c=0;c<copies;c++){ list.forEach(function(r,i){ inner+=card(r,i+ri*4,c>0); }); }
      out+='<div class="rv-row'+(ri?' rev':'')+'"><div class="rv-track">'+inner+'</div></div>';
    });
    mount.innerHTML='<div class="rv-marquee" id="rvMarquee">'+out+'</div>';
    var m=document.getElementById('rvMarquee');
    // constant speed regardless of card count / screen width
    [].forEach.call(m.querySelectorAll('.rv-track'),function(t,ri){
      var setW=t.scrollWidth/copies; t.style.setProperty('--dur',Math.max(25,setW/(ri?34:42)).toFixed(1)+'s');
    });
    var cards=[].slice.call(m.querySelectorAll('.rv-card'));
    if('IntersectionObserver' in window){
      liveIO=new IntersectionObserver(function(es){
        es.forEach(function(e){
          m.classList.toggle('is-live',e.isIntersecting);
          if(e.isIntersecting) cards.forEach(function(c){c.classList.add('is-on');});
        });
      },{threshold:.1});
      liveIO.observe(m);
    } else { m.classList.add('is-live'); cards.forEach(function(c){c.classList.add('is-on');}); }
    toggle.disabled=reduced; toggle.setAttribute('aria-pressed','false');
    toggle.setAttribute('aria-label','Pause auto-scrolling reviews');
  }

  function renderStack(){
    mount.innerHTML='<div class="rv-stack" id="rvStack">'+REVIEWS.map(function(r,i){return card(r,i,false,true);}).join('')+'</div>';
    stackCards=[].slice.call(mount.querySelectorAll('.rv-card'));
    if('IntersectionObserver' in window){
      io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('is-on');io.unobserve(e.target);} });
      },{threshold:.3});
      stackCards.forEach(function(c){io.observe(c);});
    } else stackCards.forEach(function(c){c.classList.add('is-on');});
    measureStack();
  }

  var stackGeo=null;
  function measureStack(){
    if(mode!=='stack'||!stackCards.length) return;
    var navH=navWrap?navWrap.offsetHeight:68, rvTop=navH+16;
    section.style.setProperty('--rv-top',rvTop+'px');
    var stack=document.getElementById('rvStack');
    stack.style.removeProperty('--rv-h');
    var h=0; stackCards.forEach(function(c){h=Math.max(h,c.offsetHeight);});
    h=Math.ceil(h); stack.style.setProperty('--rv-h',h+'px');
    var gap=parseFloat(getComputedStyle(stackCards[0]).marginBottom)||0;
    var stackTop=stack.getBoundingClientRect().top+window.pageYOffset;
    // Scroll position at which each card becomes "stuck", computed once from layout.
    stackGeo={h:h,pos:stackCards.map(function(c,j){return stackTop+j*(h+gap)-(rvTop+Math.min(j,5)*10);}),last:stackCards.map(function(){return -1;})};
    updateStack(true);
  }

  // Cards that get covered shrink and darken a little. Pure scroll maths (no layout reads),
  // one transform + one opacity write per card, and only when the value actually changed.
  function updateStack(force){
    raf=0;
    if(mode!=='stack'||reduced||!stackGeo) return;
    var g=stackGeo, n=stackCards.length, sy=window.pageYOffset, t=new Array(n), acc=0, i;
    for(i=0;i<n;i++) t[i]=Math.min(1,Math.max(0,1-(g.pos[i]-sy)/g.h));
    for(i=n-1;i>=0;i--){
      var d=Math.min(acc,6), key=Math.round(d*200);
      if(force===true||key!==g.last[i]){
        g.last[i]=key;
        var c=stackCards[i];
        c.style.transform='translate3d('+TX[i%TX.length]+'px,0,0) rotate('+ROT[i%ROT.length]+'deg) scale('+(1-d*.035).toFixed(4)+')';
        var sh=c.firstElementChild; if(sh&&sh.className==='rv-shade') sh.style.opacity=(d*.07).toFixed(3);
      }
      acc+=t[i];
    }
  }
  function onScroll(){ if(mode==='stack'&&!raf) raf=requestAnimationFrame(updateStack); }

  function setMode(){
    var next=mq.matches?'marquee':'stack';
    if(next===mode) return;
    teardown(); mode=next;
    if(mode==='marquee') renderMarquee(); else renderStack();
  }

  toggle.addEventListener('click',function(){
    var m=document.getElementById('rvMarquee'); if(!m) return;
    var p=m.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed',String(p));
    toggle.setAttribute('aria-label',p?'Play auto-scrolling reviews':'Pause auto-scrolling reviews');
  });
  window.addEventListener('scroll',onScroll,{passive:true});
  var lastW=window.innerWidth;
  window.addEventListener('resize',function(){
    if(window.innerWidth===lastW) return; lastW=window.innerWidth;
    setMode(); if(mode==='stack') measureStack();
  },{passive:true});
  if(mq.addEventListener) mq.addEventListener('change',setMode); else if(mq.addListener) mq.addListener(setMode);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){
    if(mode==='stack') measureStack(); else {mode='';setMode();}
  });
  window.addEventListener('load',function(){ if(mode==='stack') measureStack(); });
  setMode();
})();