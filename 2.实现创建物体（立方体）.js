import "./style.css";
import * as THREE from "three";
let scene, camera, renderer;

// 初始化加载场景与摄像机
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
}

// 1.创建立方体
function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const cube = new THREE.Mesh(geometry, material);

  camera.position.z = 5;

  scene.add(cube);
}

init();
createCube();

renderer.render(scene, camera);
