const menuButton=document.getElementById('menuBtn');
const navigation=document.getElementById('navLinks');
const themeToggle=document.getElementById('themeToggle');
const topButton=document.getElementById('topButton');

menuButton?.addEventListener('click',()=>{navigation.classList.toggle('open');menuButton.textContent=navigation.classList.contains('open')?'×':'☰';});
document.querySelectorAll('#navLinks a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.textContent='☰';}));

const savedTheme=localStorage.getItem('prabinTheme');
if(savedTheme==='light')document.body.classList.add('light');
function updateThemeIcon(){themeToggle.textContent=document.body.classList.contains('light')?'☀':'☾';themeToggle.setAttribute('aria-label',document.body.classList.contains('light')?'Switch to dark mode':'Switch to light mode');}
updateThemeIcon();
themeToggle?.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('prabinTheme',document.body.classList.contains('light')?'light':'dark');updateThemeIcon();});

document.getElementById('year').textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>topButton.classList.toggle('show',window.scrollY>500),{passive:true});
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.section,.project,.education-item,.hero-content,.hero-visual').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

const video=document.querySelector('.video-project video');
if(video){video.addEventListener('loadedmetadata',()=>{video.controls=true;});}

window.addEventListener('keydown',e=>{if(e.key==='Escape'){navigation.classList.remove('open');menuButton.textContent='☰';}});
