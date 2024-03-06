import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入性能监视器的stats组件
import Stats from "three/examples/jsm/libs/stats.module.js";

// 引入3d转换器与渲染器
import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/addons/renderers/CSS3DRenderer.js";

// 创建场景，摄像机，渲染器，css3d渲染器
let scene, camera, renderer, labelRenderer;
let cube;
let controls;
// 创建性能监视器全局变量并实例化
let stats = new Stats();
// 创建分组
let group;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 调整摄像机到盒子中间
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
}

// 创建分组
function createGroup() {
  group = new THREE.Group();
}

function createCube() {
  // 创建一个数组，保存多个立方体数据
  const cubeInfoArr = [];

  for (let i = 0; i < 1; i++) {
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

    // 给绘制的立方体添加名字
    cube.name = "cn";

    // 将立方体添加到分组中
    group.add(cube);
  });
  // 将分组添加到场景中
  scene.add(group);

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

// 创建圆形缓冲几何体
function createCircle() {
  // 创建图形
  // radius — 圆形的半径，默认值为1
  // segments — 分段（三角面）的数量，最小值为3，默认值为32。
  const geometry = new THREE.CircleGeometry(5, 32);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  // 创建网格对象并渲染
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(-10, -10, -10);
  // 将物体添加到场景
  scene.add(circle);
}

// 创建球形缓冲几何体
function createSphere() {
  const geometry = new THREE.SphereGeometry(3, 32, 16);
  // 创建材质（点材质）
  const material = new THREE.PointsMaterial({ color: 0xff6600, size: 0.05 });
  // 创建材质
  const sphere = new THREE.Points(geometry, material);
  sphere.position.set(10, 10, 10);
  scene.add(sphere);
}

// 创建一条连续的线
function createLine() {
  const points = [];
  // 每一个点的x,y,z轴的坐标
  points.push(new THREE.Vector3(-5, 10, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(0, 15, 5));
  points.push(new THREE.Vector3(5, 15, 0));
  // 创建图形
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // 创建材质
  const material = new THREE.LineBasicMaterial({ color: 0xff6600 });
  // 创建线物体
  // 一条连续的线
  // const line = new THREE.Line(geometry, material);
  // 首尾相连的线
  // const line = new THREE.LineLoop(geometry, material);
  // 若干个定点之前绘制成一条线
  const line = new THREE.LineSegments(geometry, material);
  // 添加到场景
  scene.add(line);
}

// 创建线物体和材质
function createLine1() {
  const geometry = new THREE.SphereGeometry(3, 32, 16);
  // 创建材质（点材质）
  const material = new THREE.LineBasicMaterial({
    color: 0xff6600,
    linewidth: 5,
  });
  // 创建材质
  const sphere = new THREE.Line(geometry, material);
  sphere.position.set(5, 5, 5);
  scene.add(sphere);
}

// 测试
function createPlane() {
  const x = 0,
    y = 0;

  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const geometry = new THREE.ShapeGeometry(heartShape);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// 创建球形缓冲几何体，并且进行全景贴图
function createMap() {
  // 创建图形
  const geometry = new THREE.SphereGeometry(3, 32, 16);
  // 创建纹理加载器
  // new THREE.TextureLoader().setPath()设置公共路径
  const texture = new THREE.TextureLoader().load("image/earth/earth.png");
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  // 创建物体
  const sphere = new THREE.Mesh(geometry, material);
  // 创建场景
  scene.add(sphere);
}

// 创建立方体缓冲体并进行贴图
function createCubeAndImage() {
  // 图片路径
  // 顺序是 x前后 y前后 z前后
  const imgUrlArr = [
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg",
  ];
  // 创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 使用纹理加载器加载图片
  const TextureLoader = new THREE.TextureLoader();
  TextureLoader.setPath("image/park/"); //设置公共的资源路径
  const materialArr = imgUrlArr.map((item) => {
    const texture = TextureLoader.load(item);

    // three.js颜色通道为rgb颜色（为了防止图片太浅）
    texture.colorSpace = THREE.SRGBColorSpace;

    // 创建材质
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
  });

  // 创建物体
  cube = new THREE.Mesh(geometry, materialArr);

  // 调整立方体沿着z轴做-1缩小（镜面翻转）
  cube.scale.set(1, 1, -1);

  // 添加到场景
  scene.add(cube);
}

// 创建平面网格物体 并将视频进行加载
function createPlaneMap() {
  // 创建图形
  const geometry = new THREE.PlaneGeometry(2, 2);

  // 准备视频标签
  const video = document.createElement("video");
  video.src = "video/mouse_cat.mp4";
  video.muted = true; //静音
  video.addEventListener("loadedmetadata", () => {
    // 加载视频完成 开始播放
    video.play();
  });
  // 创建视频纹理对象
  const texture = new THREE.VideoTexture(video);
  // 把视频贴到材质上

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  // 创建物体
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, 5);
  // 添加到场景
  scene.add(plane);

  // 点击按钮-》播放视频
  // const button1 = document.createElement("button");
  // button1.innerText = "播放视频";
  // button1.style.position = "fixed";
  // button1.style.left = "200px";
  // button1.style.top = "0";
  // document.body.appendChild(button1);
  // button1.addEventListener("click", () => {
  //   video.play(); //播放视频
  // });

  // 点击按钮-》播放声音
  const button = document.createElement("button");
  button.innerText = "播放声音";
  button.style.position = "fixed";
  button.style.left = "100px";
  button.style.top = "0";
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    video.muted = !video.muted; //关闭静音
  });
}

// 把原生DOM添加到3D场景中展示
function domTo3D() {
  // 1.准备dom标签和内容样式
  const span = document.createElement("span");
  span.innerHTML = "我是迪迦";
  span.style.color = "white";

  // 2.将2d转换为3d
  const tag3D = new CSS3DObject(span);
  tag3D.scale.set(1 / 16, 1 / 16, 1 / 16);
  scene.add(tag3D);

  // 3.通过3d渲染器渲染到浏览器
  labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.pointerEvents = "none"; //在什么条件下触发鼠标
  labelRenderer.domElement.style.position = "fixed";
  labelRenderer.domElement.style.left = "200px";
  labelRenderer.domElement.style.top = 0;
  document.body.appendChild(labelRenderer.domElement);
}

// 轨道控制器
function createControl() {
  controls = new OrbitControls(camera, renderer.domElement);
  // 开启阻尼效果
  controls.enableDamping = true;

  // 设置摄像机向外移动的距离
  // controls.maxDistance = 0.1;
  // 设置摄像机向内移动的距离
  // controls.minDistance = 0.1;
}

// 循环渲染
function renderLoop() {
  requestAnimationFrame(renderLoop);
  controls.update();
  // 手动更新性能监视器
  stats.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

// 创建坐标轴
function createHelper() {
  const axesHelper = new THREE.AxesHelper(20);
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

// 创建删除立方体方法
function removeCube() {
  window.addEventListener("dblclick", () => {
    // 单个删除
    // const arr = scene.children.filter((item) => item.name == "cn");
    // const c = arr[0];
    // if (c) {
    //   if (arr.length == 1) return;
    //   c.geometry.dispose();
    //   c.material.dispose();
    //   scene.remove(c);
    // }
    // 分组删除
    group.children.map((item) => {
      // 从内存中删除图形
      item.geometry.dispose();
      item.material.dispose();
    });
    // 从场景中移除组
    scene.remove(group);
  });
}

init();
// 调用创建物体方法
createGroup();
// 创建物体
createCube();

// 测试
// createPlane();
// 创建一条线
createLine();

// 创建线物体
createLine1();

// 创建球形缓冲几何体
createSphere();

// 创建圆形缓冲几何体
createCircle();

// 地图贴图
createMap();

// 全景公园
createCubeAndImage();

// 创建电视机平面网格物体
createPlaneMap();

// 原生dom3d展示
domTo3D();

// 创建轨道控制器
createControl();
// 创建坐标轴
createHelper();
// 性能监视器
createStats();
// 循环渲染
renderLoop();
// 删除立方体
removeCube();
// 3d场景适配方法
renderResize();
