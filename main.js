import * as THREE from "three";
// import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 5;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 7;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geo = new THREE.IcosahedronGeometry(1, 1, 1); // Fixed the geometry parameters
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);

mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0xff456f, 0x0f23f0, 5);
scene.add(hemiLight);

function animate(t = 0) {
  requestAnimationFrame(animate);

  //   // Update the scaling factor based on time
  //   const time = t * 0.0011; // Convert time to seconds

  //   const scale = Math.cos(time) + 5; // Use sine for smooth animation
  //   mesh.scale.setScalar(scale);
  //   mesh.rotation.y = t * 0.001;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
