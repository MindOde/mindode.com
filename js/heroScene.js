import { ensureThree, makeRenderer, onResize } from './threeSetup.js';
export async function initHero(canvas){
  const THREE = await ensureThree();
  const isMobile = matchMedia('(max-width: 420px)').matches;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(isMobile?55:45, 1, .1, 100); camera.position.set(0,.4,3.2);
  onResize(renderer, camera, canvas);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xa0d4ff, .9));
  const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(2,2,3); scene.add(key);
  const ico = new THREE.IcosahedronGeometry(1,5);
  const pos = ico.attributes.position; const v = new THREE.Vector3();
  function n3(x,y,z){ const s=Math.sin(x*12.9898+y*78.233+z*37.719)*43758.5453; return (s-Math.floor(s))*2-1; }
  for(let i=0;i<pos.count;i++){ v.fromBufferAttribute(pos,i); const r=n3(v.x*1.6,v.y*1.8,v.z*1.7); const s=0.18*r+1.0; v.multiplyScalar(s); pos.setXYZ(i,v.x,v.y*1.05,v.z*0.95); }
  pos.needsUpdate=true; ico.computeVertexNormals();
  const brain = new THREE.Mesh(ico, new THREE.MeshStandardMaterial({ color:0xbfdcff, metalness:0.0, roughness:0.6 })); scene.add(brain);
  brain.material.onBeforeCompile=(shader)=>{ shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
    float rim=1.0-max(dot(normalize(vViewPosition), normalize(normal)),0.0);
    gl_FragColor.rgb += vec3(0.8,0.9,1.0)*pow(rim,3.0)*0.4;`); };
  const path = new THREE.CatmullRomCurve3([new THREE.Vector3(1.6,0,0),new THREE.Vector3(0,0,1.6),new THREE.Vector3(-1.6,0,0),new THREE.Vector3(0,0,-1.6)], true);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(path,200,0.02,8,true), new THREE.MeshStandardMaterial({color:0x0ea5e9, roughness:0.8, metalness:0.1})); scene.add(hose);
  const chest = new THREE.Mesh(new THREE.TorusGeometry(0.1,0.03,12,64), new THREE.MeshStandardMaterial({ color:0x6b7280, metalness:0.9, roughness:0.25 })); chest.position.set(0,0,1.6); scene.add(chest);
  const listen = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.2,-0.1,0.9), new THREE.Vector3(0.7,-0.15,0.2)]),32,0.01,6,false), new THREE.MeshStandardMaterial({ color:0x0ea5e9, emissive:0x0ea5e9, emissiveIntensity:0.0 })); listen.visible=false; scene.add(listen);
  const clamp = isMobile?1.5:3;
  canvas.addEventListener('pointermove', (e)=>{ if(prefersReduced) return; const r=canvas.getBoundingClientRect(); const x=((e.clientX-r.left)/r.width-.5)*clamp*Math.PI/180; const y=((e.clientY-r.top)/r.height-.5)*clamp*Math.PI/180; brain.rotation.x=y; brain.rotation.y=x; });
  let docked=false; addEventListener('scroll', ()=>{ if(docked||prefersReduced) return; docked=true; listen.visible=true; let t=0; const id=setInterval(()=>{ t+=0.05; listen.material.emissiveIntensity=Math.sin(t*6)*0.4+0.6; if(t>1.8){clearInterval(id); listen.visible=false;}},50); }, {passive:true});
  let raf; function loop(){ if(!prefersReduced){ chest.position.copy(path.getPointAt(((Date.now()%8000)/8000))); hose.rotation.y += 0.002; } renderer.render(scene,camera); raf=requestAnimationFrame(loop);} loop();
  return { stop(){ cancelAnimationFrame(raf); }, dispose(){ renderer.dispose(); } };
}