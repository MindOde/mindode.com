import { ensureThree, makeRenderer, onResize } from './threeSetup.js';
export async function initSlice(canvas){
  const THREE = await ensureThree();
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,1,.1,100); camera.position.set(0,0,6);
  onResize(renderer,camera,canvas);
  scene.add(new THREE.HemisphereLight(0xffffff,0x99ccff,.9));
  const key=new THREE.DirectionalLight(0xffffff,.7); key.position.set(2,2,3); scene.add(key);
  const sliceGeo=new THREE.BoxGeometry(4.5,3.6,0.6,64,48,2);
  const slice=new THREE.Mesh(sliceGeo,new THREE.MeshStandardMaterial({color:0xe0f2fe,metalness:0.05,roughness:0.6,transparent:true,opacity:.95})); scene.add(slice);
  const dotGeo=new THREE.SphereGeometry(0.05,8,8); const dotMat=new THREE.MeshStandardMaterial({color:0x22d3ee,emissive:0x0ea5e9,emissiveIntensity:.8}); const spots=[new THREE.Vector3(-1.2,0.6,0.31),new THREE.Vector3(0.9,-0.2,0.31),new THREE.Vector3(0.3,0.9,0.31),new THREE.Vector3(-0.6,-0.6,0.31),new THREE.Vector3(1.1,0.7,0.31)]; spots.forEach(p=>{const m=new THREE.Mesh(dotGeo,dotMat); m.position.copy(p); scene.add(m);});
  let t=0; const clock=new THREE.Clock(); let raf; function loop(){ const dt=clock.getDelta(); t+=dt; if(!prefersReduced){ slice.rotation.y=Math.sin(t*.4)*.15; } renderer.render(scene,camera); raf=requestAnimationFrame(loop);} loop();
}