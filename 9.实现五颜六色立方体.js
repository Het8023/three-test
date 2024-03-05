import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let scene, camera, renderer;
let cube;
let controls;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
}

function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const colorArr = ["red", "green", "blue", "yellow", "pink", "orange"];
  const material = colorArr.map((item) => {
    return new THREE.MeshBasicMaterial({ color: item });
  });

  cube = new THREE.Mesh(geometry, material);
  // const material1 = new THREE.MeshBasicMaterial({ color: 0x20a0ff });
  // const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff11 });
  // const material3 = new THREE.MeshBasicMaterial({ color: 0x00ef33 });
  // const material4 = new THREE.MeshBasicMaterial({ color: 0x003f55 });
  // const material5 = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
  // const material6 = new THREE.MeshBasicMaterial({ color: 0x11ff33 });
  // cube = new THREE.Mesh(geometry, [
  //   material1,
  //   material2,
  //   material3,
  //   material4,
  //   material5,
  //   material6,
  // ]);
  scene.add(cube);
}

function createControl() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

function renderLoop() {
  requestAnimationFrame(renderLoop);
  controls.update();
  renderer.render(scene, camera);
}

function createHelper() {
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

function renderResize() {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

init();
createCube();
createControl();
renderLoop();
createHelper();
renderResize();
