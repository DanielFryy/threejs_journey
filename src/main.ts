import "./style.css";
import * as THREE from "three/webgpu";

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Object
const group = new THREE.Group();
group.position.y = 0.5;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
group.add(cube3);

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGPURenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);

const init = async () => {
  await renderer.init();
  renderer.render(scene, camera);
};

// Timer
const timer = new THREE.Timer();
timer.connect(document);

// Animations
const tick = (timestamp: number) => {
  globalThis.window.requestAnimationFrame(tick);
  timer.update(timestamp);
  const delta = timer.getDelta();
  const elapsed = timer.getElapsed();
  group.rotation.z -= delta * 0.5;
  camera.position.y = Math.sin(elapsed);
  camera.position.x = Math.cos(elapsed);
  camera.lookAt(group.position);
  init();
};

globalThis.window.requestAnimationFrame(tick);
