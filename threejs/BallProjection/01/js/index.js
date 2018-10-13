var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xEE2222));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


var planeGeometry = new THREE.PlaneGeometry(60, 60);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0x3344EE});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

var sphereRadius = 4;
var sphereGeometry = new THREE.SphereGeometry(sphereRadius, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x22DD22});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 0;
sphere.position.y = sphereRadius;
sphere.position.z = 0;
sphere.castShadow = true;
var sphere_vel_y = 50;

scene.add(sphere);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
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
  sphere_vel_y -= 0.8;
  sphere.position.y += sphere_vel_y * 0.01;
  if (sphere.position.y < sphereRadius) {
    sphere.position.y = sphereRadius;
    sphere_vel_y = -sphere_vel_y*0.8;
  }
  if (energy() < 0.1) {
    sphere_vel_y = 50;
    sphere.position.y = sphereRadius;
  }
  
  camera.position.x = 30 * Math.cos(count*0.01);
  camera.position.z = 30 * Math.sin(count*0.01);
  camera.lookAt(scene.position);
  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function energy() {
  return (sphere.position.y - sphereRadius) + sphere_vel_y**2;
}