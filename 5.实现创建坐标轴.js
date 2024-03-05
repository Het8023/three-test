import "./style.css";
import * as THREE from "three";

// 引入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer;
let controls;

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
  const material = new THREE.MeshBasicMaterial({ color: 0x20a0ff });

  const cube = new THREE.Mesh(geometry, material);

  camera.position.z = 5;

  scene.add(cube);
}

// 创建轨道控制器
function createControls() {
  controls = new OrbitControls(camera, renderer.domElement);
}

// 在循环渲染中更新场景
function renderLoop() {
  // 循环渲染(根据当前计算机浏览器刷新帧率,(默认60次 / 秒), 不断调用此函数渲染最新画面状态, )
  // 好处是: 当前页面切换到后台, 暂停递归
  requestAnimationFrame(renderLoop);

  //   更新(手动js代码更新摄像机信息,必须调用轨道控制器 update 方法)
  controls.update();

  // 传入场景与摄像机, 并渲染到画面
  renderer.render(scene, camera);
}

// 创建辅助坐标轴
function createHelper() {
  const axesHelper = new THREE.AxesHelper(3);
  //   将坐标轴添加到场景中
  scene.add(axesHelper);
}

init();
createCube();

createControls();

// 调用坐标轴方法
createHelper();

// 调用在循环渲染中更新场景方法
renderLoop();
