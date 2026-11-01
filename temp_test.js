(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const main=$('main');
if(main){main.id='main';main.tabIndex=-1;const a=document.createElement('a');a.className='skip';a.href='#main';a.textContent='Skip to content';document.body.prepend(a);}

/* Project previews: local screenshot -> live screenshot service -> existing placeholder */
$$('#work .project-card').forEach(c=>{
 const link=$('.project-link',c),vis=$('.project-visual',c),idx=$('.project-index',c),h=$('h3',c);
 if(!link||!vis||!idx)return;
 const img=new Image();img.className='shot';img.loading='lazy';img.decoding='async';
 img.alt='Screenshot of '+(h?h.textContent:'project');
 let tried=0;
 img.onerror=()=>{if(!tried++)img.src='https://s0.wp.com/mshots/v1/'+encodeURIComponent(link.href)+'?w=800&h=500';else img.remove();};
 img.src='assets/projects/'+idx.textContent.trim()+'.jpg';
 vis.appendChild(img);
});

/* Pricing buttons pre-fill the enquiry */
const msg=$('#message');
$$('.pr .btn').forEach(b=>b.addEventListener('click',()=>{
 const plan=b.textContent.replace('Choose','').trim();
 if(msg&&!msg.value.trim())msg.value='Hi Subham, I am interested in the '+plan+' plan. About my project: ';
}));

/* Contact: mailto alone fails for people without a mail app, so add WhatsApp + an email link */
const form=$('#contactForm');
if(form){
 const sub=$('button[type=submit]',form),box=document.createElement('div');box.className='form-actions';
 sub.before(box);box.append(sub);
 const wa=document.createElement('button');wa.type='button';wa.className='btn btn-dark';wa.textContent='Send on WhatsApp instead';
 wa.addEventListener('click',()=>{
  if(!form.checkValidity()){form.reportValidity();return;}
  const f=form.elements;
  const t='Hi Subham, I am '+f.name.value.trim()+'.\nService: '+f.service.value+'\n\n'+f.message.value.trim()+'\n\nEmail: '+f.email.value.trim();
  window.open('https://wa.me/918114963709?text='+encodeURIComponent(t),'_blank','noopener');
 });
 box.append(wa);
}
const cl=$('.contact-links');
if(cl&&!$('a[href^="mailto:"]',cl)){
 cl.insertAdjacentHTML('beforeend','<a class="contact-link" href="mailto:subhammallick454@gmail.com"><span class="bubble"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span><span>Email<small>subhammallick454@gmail.com</small></span></a>');
}

/* Gate: modal semantics, focus, background inert, question text, skip */
const gate=$('#gate');
if(gate){
 gate.setAttribute('aria-modal','true');
 const pcs=$('.pcs',gate),q=document.createElement('p');q.className='gate-q';q.textContent='How would you like to explore?';pcs.prepend(q);
 const skip=document.createElement('button');skip.type='button';skip.className='gate-skip';skip.textContent='Skip and view the main site';
 skip.onclick=()=>$('.pc[data-p="client"]',gate).click();gate.append(skip);
 const bg=$$('main,.nav-wrap,.signature');
 const sync=()=>{const open=!gate.classList.contains('out');
  bg.forEach(e=>open?e.setAttribute('inert',''):e.removeAttribute('inert'));
  if(open&&gate.classList.contains('ready')){const f=$('.pc',gate);f&&f.focus({preventScroll:true});}};
 new MutationObserver(sync).observe(gate,{attributes:true,attributeFilter:['class']});sync();
}

/* Pause off-screen animation */
if('IntersectionObserver' in window){
 [['.hero','hero-off'],['.trust-strip','trust-off']].forEach(([s,c])=>{const el=$(s);if(!el)return;
  new IntersectionObserver(([e])=>document.documentElement.classList.toggle(c,!e.isIntersecting)).observe(el);});
}

/* Footer name: scale to container so it is never clipped or wrapped */
const sig=$('.signature-name');
function fitSig(){
 if(!sig)return;sig.style.removeProperty('font-size');
 const w=sig.clientWidth,s=sig.scrollWidth;
 if(s>w+1)sig.style.setProperty('font-size',(parseFloat(getComputedStyle(sig).fontSize)*w/s*.97)+'px','important');
}
addEventListener('resize',fitSig,{passive:true});addEventListener('load',fitSig);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitSig);
setTimeout(fitSig,600);
})();