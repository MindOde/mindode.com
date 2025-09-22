import { initHero } from './heroScene.js';
import { initGraph } from './graphScene.js';
import { initSlice } from './sliceScene.js';

document.getElementById('year').textContent = new Date().getFullYear();
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) menuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

const scenes = [
  ['heroCanvas', initHero],
  ['graphCanvas', initGraph],
  ['sliceCanvas', initSlice],
];
const io = new IntersectionObserver((ents)=>{
  ents.forEach(async ent=>{
    if (ent.isIntersecting && !ent.target.dataset.boot) {
      const id = ent.target.id;
      const pair = scenes.find(s=> s[0]===id);
      if (pair) { ent.target.dataset.boot='1'; await pair[1](ent.target); }
    }
  });
},{threshold:.1});
scenes.forEach(([id])=>{ const el=document.getElementById(id); if(el) io.observe(el); });
