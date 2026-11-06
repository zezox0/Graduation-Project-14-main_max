/* sawa2tlek – حركات 2026 (مستقلة عن script.js) */
(()=>{
const de=document.documentElement,$=s=>document.querySelector(s);
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
de.classList.add('fx');
const bar=document.createElement('div');bar.id='fxb';document.body.prepend(bar);

/* ظهور تدريجي عند التمرير */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('#home .sh,#home .sh2,#home .card,.faq details').forEach(el=>{
  const i=[...el.parentElement.children].indexOf(el);
  el.style.setProperty('--d',Math.min(i,5)*80+'ms');
  el.classList.add('rv');io.observe(el);
});

/* تمرير: شريط التقدم + الهيدر + بارالاكس الهيرو */
let tk=false;
const sc=()=>{tk=false;const y=scrollY,h=de.scrollHeight-innerHeight;
  bar.style.setProperty('--sp',h>0?y/h:0);
  $('#lh')?.classList.toggle('sc',y>20);
  $('.hero')?.style.setProperty('--py',y)};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(sc)}},{passive:true});sc();

/* إضاءة الكروت تتبع المؤشر */
document.addEventListener('pointermove',e=>{
  const c=e.target.closest?.('.card');if(!c)return;
  const r=c.getBoundingClientRect();
  c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px');
},{passive:true});

/* انتقال ناعم عند تبديل الثيم */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-a=theme]')){de.classList.add('tr');setTimeout(()=>de.classList.remove('tr'),600)}
});

/* انتقال بين صفحات النظام (يتفعّل لما الصفحة تتغير فقط، مش مع كل بحث/فلترة) */
const main=$('#main');
if(main){
  let last='';
  new MutationObserver(()=>{
    const key=(main.querySelector('h1')?.textContent||'')+main.children.length;
    const page=main.querySelector('h1')?.textContent||'';
    if(page===last)return;last=page;
    [...main.children].forEach((c,i)=>c.style.setProperty('--i',Math.min(i,8)));
    main.classList.remove('pgin');void main.offsetWidth;main.classList.add('pgin');
    clearTimeout(main._t);main._t=setTimeout(()=>main.classList.remove('pgin'),1600);
  }).observe(main,{childList:true});
}
})();
