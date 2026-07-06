const cursor=document.querySelector('.cursor');
window.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}});
document.querySelectorAll('a,button,.tilt').forEach(el=>{el.addEventListener('mouseenter',()=>cursor&&cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor&&cursor.classList.remove('active'));});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const countObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);let current=0;const step=Math.max(1,Math.ceil(target/42));const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer);}el.textContent=current;},28);countObserver.unobserve(el);});},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

const tiltEls=document.querySelectorAll('.tilt');
tiltEls.forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;const rx=((y/r.height)-.5)*-7;const ry=((x/r.width)-.5)*7;card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;});card.addEventListener('mouseleave',()=>{card.style.transform='';});});

document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;});el.addEventListener('mouseleave',()=>{el.style.transform='';});});

const form=document.getElementById('estimateForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent('Maher Media Project Estimate Request');const body=encodeURIComponent(`Name: ${data.get('name')||''}\nCompany/Organization: ${data.get('company')||''}\nProject Type: ${data.get('type')||''}\nBudget Range: ${data.get('budget')||''}\nTimeline: ${data.get('timeline')||''}\n\nProject Details:\n${data.get('details')||''}`);window.location.href=`mailto:blakemaher012@gmail.com?subject=${subject}&body=${body}`;});}
