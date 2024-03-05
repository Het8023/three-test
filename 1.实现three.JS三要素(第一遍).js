import "./style.css";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from "./counter.js";

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
// 1.导入three.js核心库
import * as three from "three";
let scene, camera, renderer;
// 2.创建场景
function createScene() {
  scene = new three.Scene();
}

// 3.创建摄像机
function createCamera() {
  camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
}

// 4.创建渲染器
function render() {
  renderer = new three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 5.添加到DOM
function addDOM() {
  document.body.append(renderer.domElement);
}

// 6.初始化加载
function init() {
  createScene();
  createCamera();
  render();
  addDOM();
}
init();
