import "./style.css";

import * as THREE from "three";

let scene, camera, renderer;

function init() {
  // 创建场景对象
  scene = new THREE.Scene();

  //   创建透视摄像机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //   创建渲染器，并设置画布大小
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 将摄像机与场景渲染到画布上
  renderer.render(scene, camera);

  //   添加DOM
  document.body.append(renderer.domElement);
}

init();
