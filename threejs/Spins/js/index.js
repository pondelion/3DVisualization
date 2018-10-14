var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0x222222));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

i = 0

do {
  j = 0
	do {
		var dir = new THREE.Vector3(0, 1, 0);
		var origin = new THREE.Vector3((i-5)*4, 5, (j-5)*4);
		var length = 10;
		var hex = 0x00ff00;

		var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, headWidth=4, headLength=1);
    arrowHelper.name = 'spin' + String(i) + String(j);
    arrowHelper.rotation.x = 3.14*i*j;
		scene.add(arrowHelper);
		j += 1
	} while (j < 10)
	i += 1
} while (i < 10)

camera.position.x = -30;
camera.position.y = 32;
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

  camera.position.x = 30 * Math.cos(count*0.01);
  camera.position.z = 30 * Math.sin(count*0.01);
  camera.position.y= 16 * (Math.sin(count*0.008)+1.3);
  camera.lookAt(scene.position);
  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}