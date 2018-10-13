var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

// 背景の色
renderer.setClearColor(new THREE.Color(0x222222));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 面のジオメトリ作成
var planeGeometry = new THREE.PlaneGeometry(60, 60);
// マテリアル作成。色を青に指定
var planeMaterial = new THREE.MeshLambertMaterial({color: 0x0000FF});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// 面を回転
plane.rotation.x = -0.5 * Math.PI;
// 面の位置を指定
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

// 面をシーンに追加
scene.add(plane);

// カメラの初期位置設定
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// スポットライト作成
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, 30, -5);
spotLight.castShadow = true;
// スポットライトをシーンに追加
scene.add(spotLight);

document.getElementById("3DScene").appendChild(renderer.domElement);

render();

var count = 0;
// レンダリング処理
function render() {
  count += 1;
  
  //　カメラを回転させる。
  camera.position.x = 30 * Math.cos(count*0.01);
  camera.position.z = 30 * Math.sin(count*0.01);
  camera.lookAt(scene.position);
  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}