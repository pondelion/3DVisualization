var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0x221122));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


var dir = new THREE.Vector3(0, 1, 0);
var origin = new THREE.Vector3(0, 0, 0);
var length = 10;
var color = 0x00ff00;

var arrowHelper = new THREE.ArrowHelper(dir, origin, length, color, headWidth=4, headLength=1);
scene.add(arrowHelper);


camera.position.x = -15;
camera.position.y = 10;
camera.position.z = 10;
camera.lookAt(scene.position);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, 30, -5);
spotLight.castShadow = true;
scene.add(spotLight);

document.getElementById("3DScene").appendChild(renderer.domElement);

render();

var count = 0;
function render() {
  count += 1;
  
  arrowHelper.rotation.x = Math.cos(count*0.06);
  arrowHelper.rotation.y = Math.sin(count*0.12);
  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}