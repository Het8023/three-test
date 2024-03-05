import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入性能监视器的stats组件
import Stats from "three/examples/jsm/libs/stats.module.js";

let scene, camera, renderer;
let cube;
let controls;
// 创建性能监视器全局变量并实例化
let stats = new Stats();

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
  // 创建一个数组，保存多个立方体数据
  const cubeInfoArr = [];

  for (let i = 0; i < 10; i++) {
    // 生成一个随机0-255的数字
    // let random = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    const obj = {
      color: `rgb(${Math.floor(
        Math.random() * (255 - 0 + 1) + 0
      )}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(
        Math.random() * (255 - 0 + 1) + 0
      )})`,
      w: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      h: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      d: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      x: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      y: Math.floor(Math.random() * (5 - -5 + 1) + -5),
      z: Math.floor(Math.random() * (5 - -5 + 1) + -5),
    };
    cubeInfoArr.push(obj);
  }

  cubeInfoArr.map((item) => {
    // 创建图形
    const geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      color: item.color,
    });
    // 创建物体网格对象，并且图形与材质加载到物体网格对象中
    cube = new THREE.Mesh(geometry, material);
    // 设置立方体的坐标
    cube.position.set(item.x, item.y, item.z);
    // 将物体添加到场景中
    scene.add(cube);
  });

  // 创建图形
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // // 创建材质
  // const material = new THREE.MeshBasicMaterial({ color: 0x20a0ff });
  // cube = new THREE.Mesh(geometry, material);

  // const geometry1 = new THREE.BoxGeometry(1, 1, 1);
  // // 创建材质
  // const material1 = new THREE.MeshBasicMaterial({ color: 0x20a0ff });
  // cube1 = new THREE.Mesh(geometry1, material1);
  // scene.add(cube1);

  // scene.add(cube);
}

function createControl() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

function renderLoop() {
  requestAnimationFrame(renderLoop);
  controls.update();
  // 手动更新性能监视器
  stats.update();
  renderer.render(scene, camera);
}

function createHelper() {
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

// 创建场景适配方法
function renderResize() {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// 创建性能监视器
function createStats() {
  // 实例化性能监视器
  // 设置监视器面板类型
  stats.setMode(0);
  // 设置监视器位置
  stats.domElement.position = "fixed";
  // 设置监视器位置
  stats.domElement.style.left = "0";
  // 设置监视器位置
  stats.domElement.style.top = "0";
  document.body.appendChild(stats.domElement);
}

init();
// 创建物体
createCube();
// 创建轨道控制器
createControl();
// 创建坐标轴
createHelper();
// 性能监视器
createStats();
// 循环渲染
renderLoop();
// 3d场景适配方法
renderResize();
