export async function ensureThree() {
  if (window.__THREE_READY__) return window.THREE;
  window.THREE = await import('https://unpkg.com/three@0.161.0/build/three.module.js');
  window.__THREE_READY__ = true; return window.THREE;
}
export function makeRenderer(canvas){
  const THREE = window.THREE;
  const r = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:'high-performance' });
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.setPixelRatio(Math.min(devicePixelRatio||1, 2));
  const rect = canvas.getBoundingClientRect(); r.setSize(rect.width, rect.height);
  return r;
}
export function onResize(renderer, camera, canvas){
  function resize(){ const rect = canvas.getBoundingClientRect(); camera.aspect=rect.width/rect.height; camera.updateProjectionMatrix(); renderer.setSize(rect.width, rect.height); }
  addEventListener('resize', resize); resize();
}