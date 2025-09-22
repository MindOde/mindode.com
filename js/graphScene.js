import { ensureThree, makeRenderer, onResize } from './threeSetup.js';
export async function initGraph(canvas){
  const THREE = await ensureThree();
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,1,.1,1000); camera.position.set(0,0,55);
  onResize(renderer, camera, canvas);
  scene.add(new THREE.HemisphereLight(0xffffff,0x99ccff,.9));
  const key = new THREE.DirectionalLight(0xffffff,.7); key.position.set(1,1,1); scene.add(key);
  let N=700,E=1100; const types=['Mood','Sleep','Focus','Work','Family','Community']; const colors={Mood:0x0ea5e9,Sleep:0x64748b,Focus:0x10b981,Work:0xf59e0b,Family:0xec4899,Community:0x6366f1};
  const nodes = Array.from({length:N}, (_,i)=>({x:(Math.random()-0.5)*40,y:(Math.random()-0.5)*40,z:(Math.random()-0.5)*40,vx:0,vy:0,vz:0,t:types[i%types.length]}));
  const edges = Array.from({length:E}, ()=>{let a=(Math.random()*N)|0,b=(Math.random()*N)|0; if(a==b)b=(b+1)%N; return {a,b};});
  const sphere=new THREE.SphereGeometry(0.25,8,8); const mat=new THREE.MeshStandardMaterial({color:0x0ea5e9,metalness:0.1,roughness:0.6,emissive:0x0e7490,emissiveIntensity:0.15}); const mesh=new THREE.InstancedMesh(sphere,mat,N);
  const col=new THREE.Color(), m=new THREE.Matrix4(); for(let i=0;i<N;i++){m.setPosition(nodes[i].x,nodes[i].y,nodes[i].z); mesh.setMatrixAt(i,m); col.setHex(colors[nodes[i].t]); mesh.setColorAt(i,col);} mesh.instanceMatrix.needsUpdate=true; mesh.instanceColor.needsUpdate=true; scene.add(mesh);
  const pos=new Float32Array(E*2*3); const geo=new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos,3)); const lines=new THREE.LineSegments(geo, new THREE.LineBasicMaterial({color:0x0369a1,transparent:true,opacity:.45})); scene.add(lines);
  function step(dt){ const repel=30,spring=0.02,damp=0.9; for(let i=0;i<N;i++){const n=nodes[i]; n.vx*=damp;n.vy*=damp;n.vz*=damp;} for(let i=0;i<N;i++){const ni=nodes[i]; for(let j=i+1;j<i+10&&j<N;j++){const nj=nodes[j]; let dx=ni.x-nj.x,dy=ni.y-nj.y,dz=ni.z-nj.z; let d2=dx*dx+dy*dy+dz*dz+0.01; let f=repel/d2; ni.vx+=dx*f;ni.vy+=dy*f;ni.vz+=dz*f; nj.vx-=dx*f;nj.vy-=dy*f;nj.vz-=dz*f;}} for(let i=0;i<E;i++){const e=edges[i],a=nodes[e.a],b=nodes[e.b]; let dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z; a.vx+=dx*spring;a.vy+=dy*spring;a.vz+=dz*spring; b.vx-=dx*spring;b.vy-=dy*spring;b.vz-=dz*spring;} for(let i=0;i<N;i++){const n=nodes[i]; n.x+=n.vx*dt;n.y+=n.vy*dt;n.z+=n.vz*dt; } }
  function update(){ const mtx=new THREE.Matrix4(); for(let i=0;i<N;i++){mtx.setPosition(nodes[i].x,nodes[i].y,nodes[i].z); mesh.setMatrixAt(i,mtx);} mesh.instanceMatrix.needsUpdate=true; const arr=geo.attributes.position.array; let k=0; for(let i=0;i<E;i++){const e=edges[i],a=nodes[e.a],b=nodes[e.b]; arr[k++]=a.x;arr[k++]=a.y;arr[k++]=a.z; arr[k++]=b.x;arr[k++]=b.y;arr[k++]=b.z;} geo.attributes.position.needsUpdate=true; }
  const ray=new THREE.Raycaster(); const mouse=new THREE.Vector2(-2,-2); const tip=document.getElementById('graphTip')||(()=>{const d=document.createElement('div'); d.id='graphTip'; d.className='tooltip hide'; document.body.appendChild(d); return d;})();
  canvas.addEventListener('pointermove',(e)=>{const r=canvas.getBoundingClientRect(); mouse.x=((e.clientX-r.left)/r.width)*2-1; mouse.y=-((e.clientY-r.top)/r.height)*2+1;});
  let settle=2.0; const clock=new THREE.Clock(); let raf; function loop(){ const dt=Math.min(clock.getDelta(),.05); if(!prefersReduced && settle>0){ settle-=dt; step(dt);} update(); ray.setFromCamera(mouse,camera); const hit=ray.intersectObject(mesh); if(hit.length){ const id=hit[0].instanceId??0; tip.textContent = nodes[id].t; tip.classList.remove('hide'); } else tip.classList.add('hide'); renderer.render(scene,camera); raf=requestAnimationFrame(loop);} loop();
  addEventListener('pointermove', (e)=>{ if(tip.classList.contains('hide')) return; tip.style.left=e.clientX+'px'; tip.style.top=e.clientY+'px'; });
}