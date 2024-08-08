// import * as THREE from "three";
// // import { OrbitControls } from "jsm/controls/OrbitControls.js";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
// const w = window.innerWidth;
// const h = window.innerHeight;
// const renderer = new THREE.WebGLRenderer({ antialias: true });

// renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);

// const fov = 75;
// const aspect = w / h;
// const near = 5;
// const far = 10;

// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.z = 4;

// const scene = new THREE.Scene();

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// const geo = new THREE.IcosahedronGeometry(1, 1, 1); // Fixed the geometry parameters
// const mat = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   flatShading: true,
// });

// const mesh = new THREE.Mesh(geo, mat);
// scene.add(mesh);

// const wireMat = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   wireframe: true,
// });

// const wireMesh = new THREE.Mesh(geo, wireMat);
// wireMesh.scale.setScalar(1.001);

// mesh.add(wireMesh);

// const hemiLight = new THREE.HemisphereLight(0xff456f, 0x0f23f0, 5);
// scene.add(hemiLight);

// // function animate(t = 0) {
// //   requestAnimationFrame(animate);

// //   //   // Update the scaling factor based on time
// //   //   const time = t * 0.0011; // Convert time to seconds

// //   //   const scale = Math.cos(time) + 5; // Use sine for smooth animation
// //   //   mesh.scale.setScalar(scale);
// //   //   mesh.rotation.y = t * 0.001;

// //   renderer.render(scene, camera);
// // }

// // // Start the animation loop
// // animate();

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1; // Adjusted for better view
const far = 100; // Adjusted for better view

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Create a wavy line
const createWavyLine = () => {
  const points = [];
  const numPoints = 100;
  const amplitude = 0.3;
  const frequency = 1;
  const length = 10; // Length of the wave

  for (let i = 0; i <= numPoints; i++) {
    const x = (i / numPoints) * length - length / 2;
    const y = amplitude * Math.sin(frequency * x);
    const z = 10; // Keep z constant
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  return line; // Return the line for later use
};

// Create a ball
const createBall = () => {
  // const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  // const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  // scene.add(ball);
  // return ball;

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

  return mesh;
};
const hemiLight = new THREE.HemisphereLight(0xff456f, 0x0f23f0, 5);
scene.add(hemiLight);
// Create a wavy line and a ball
const line = createWavyLine();
const ball = createBall();

let t = 0; // Parameter for animation
const speed = 0.005; // Speed of the ball

// Animation loop
const animateBall = () => {
  requestAnimationFrame(animateBall);

  t += speed;
  if (t > 1) {
    t = 0;
  }

  const lineGeometry = line.geometry;
  const positions = lineGeometry.attributes.position.array;
  const numPoints = positions.length / 3;

  const index = Math.floor(t * numPoints);
  const x = positions[index * 3];
  const y = positions[index * 3 + 1];
  const z = positions[index * 3 + 2];

  ball.position.set(x, y, z);

  controls.update(); // Update controls in animation loop
  renderer.render(scene, camera);
};

animateBall();

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
