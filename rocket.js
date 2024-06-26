import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

console.log(bool);

let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  rocket,
  rocket_fire,
  HEIGHT,
  WIDTH;

const createScene = () => {
  HEIGHT = 690;
  WIDTH = 1100;
  console.log(window.innerWidth);
  scene = new THREE.Scene();

  // scene.fog = new THREE.Fog(0x03032b, 10, 1500);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 100;
  camera.position.z = 1000;
  camera.position.y = 270; //-270 is topmost
  // camera.rotation.x = 40;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize, false);

  // Create rocket group

  const rocketParts = {};

  rocketParts.topc = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 6, 4, 64),
    new THREE.MeshStandardMaterial({ color: 0xff80aa })
  );
  scene.add(rocketParts.topc);
  rocketParts.topc.position.y = 60;

  rocketParts.topa = new THREE.Mesh(
    new THREE.CylinderGeometry(6, 12, 8, 64),
    new THREE.MeshStandardMaterial({ color: 0xff80aa })
  );
  scene.add(rocketParts.topa);
  rocketParts.topa.position.y = 54;

  rocketParts.topb = new THREE.Mesh(
    new THREE.CylinderGeometry(12, 18, 20, 64),
    new THREE.MeshStandardMaterial({ color: 0xff80aa })
  );
  scene.add(rocketParts.topb);
  rocketParts.topb.position.y = 40;

  rocketParts.mida = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 20, 16, 64),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  scene.add(rocketParts.mida);
  rocketParts.mida.position.y = 22;

  rocketParts.midc = new THREE.Mesh(
    new THREE.CylinderGeometry(20, 20, 8, 64),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  scene.add(rocketParts.midc);
  rocketParts.midc.position.y = 10;

  rocketParts.midb = new THREE.Mesh(
    new THREE.CylinderGeometry(20, 18, 16, 64),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      receiveShadow: false,
    })
  );
  scene.add(rocketParts.midb);
  rocketParts.midb.position.y = -2;

  rocketParts.bota = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 14, 10, 64),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  scene.add(rocketParts.bota);
  rocketParts.bota.position.y = -15;

  rocketParts.botb = new THREE.Mesh(
    new THREE.CylinderGeometry(14, 12, 6, 64),
    new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.5,
      metalness: 1,
      side: THREE.DoubleSide,
    })
  );
  scene.add(rocketParts.botb);
  rocketParts.botb.position.y = -20;

  rocketParts.botc = new THREE.Mesh(
    new THREE.CylinderGeometry(10, 8, 4, 64),
    new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0,
      metalness: 1,
      side: THREE.DoubleSide,
    })
  );
  scene.add(rocketParts.botc);
  rocketParts.botc.position.y = -22;

  rocketParts.wina = new THREE.Mesh(
    new THREE.CylinderGeometry(12, 12, 23, 64),
    new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.5,
      metalness: 1,
      side: THREE.DoubleSide,
    })
  );
  scene.add(rocketParts.wina);
  rocketParts.wina.position.set(0, 20, 10);
  rocketParts.wina.rotation.set(Math.PI / 2, 0, 0);

  // Rocket window
  rocketParts.winb = new THREE.Mesh(
    new THREE.CylinderGeometry(9, 9, 8, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x0077ff,
      roughness: 0.1,
      transmission: 1,
      thickness: 0.9,
      side: THREE.DoubleSide,
    })
  );
  scene.add(rocketParts.winb);
  rocketParts.winb.position.set(0, 20, 18);
  rocketParts.winb.rotation.set(Math.PI / 2, 0, 0);

  rocketParts.fina = new THREE.Mesh(
    new THREE.BoxGeometry(40, 8, 18),
    new THREE.MeshStandardMaterial({
      color: 0xff80aa,
    })
  );
  scene.add(rocketParts.fina);
  rocketParts.fina.position.set(16, -10, 0);
  rocketParts.fina.rotation.set(Math.PI / 2, 0.7 * Math.PI, 0);

  rocketParts.finb = new THREE.Mesh(
    new THREE.BoxGeometry(40, 8, 18),
    new THREE.MeshStandardMaterial({
      color: 0xff80aa,
    })
  );
  scene.add(rocketParts.finb);
  rocketParts.finb.position.set(-16, -10, 0);
  rocketParts.finb.rotation.set(-Math.PI / 2, 0.7 * Math.PI, 0);

  var flame_material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color("yellow"),
      },
      color2: {
        value: new THREE.Color("red"),
      },
    },
    vertexShader: `
varying vec2 vUv;

void main() {
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`,
    fragmentShader: `
uniform vec3 color1;
uniform vec3 color2;

varying vec2 vUv;

void main() {

gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
}
`,
    wireframe: true,
  });

  rocket_fire = new THREE.Mesh(
    new THREE.CylinderGeometry(6, 0, 20, 64),
    flame_material
  );
  scene.add(rocket_fire);
  rocket_fire.position.y = -30;

  rocket = new THREE.Group();
  rocket.add(
    rocketParts.midb,
    rocketParts.mida,
    rocketParts.midc,
    rocketParts.topa,
    rocketParts.topb,
    rocketParts.bota,
    rocketParts.botb,
    rocketParts.botc,
    rocketParts.topc,
    rocketParts.wina,
    rocketParts.winb,
    rocketParts.fina,
    rocketParts.finb,
    rocket_fire
  );
  rocket.position.y = 0;
  scene.add(rocket);
};

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);

  const directionalLight = new THREE.DirectionalLight(0xffcb87, 1);
  directionalLight.position.set(-300, 300, 600);

  const pointLight = new THREE.PointLight(0xff4f4f, 2, 1000, 2);
  pointLight.position.set(-200, 100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};

const targetRocketPosition = 40;
const animationDuration = 2000;

const loop = () => {
  const t = (Date.now() % animationDuration) / animationDuration;

  renderer.render(scene, camera);
  let counter = 1;
  const delta = targetRocketPosition * Math.sin(Math.PI * 0.5 * t);
  if (rocket) {

    // rocket.rotation.y += 0.01;
    rocket.rotation.z = -0.9 ;
    // rocket.rotation.x += 0.01;
    // rocket.rotation.z += 0.01;
  //  rocket.position.y = delta * 10;
  }
  if (rocket_fire) {
    rocket_fire.scale.set(
      1 + delta / 50,           // breadth of fire
      1 + Math.abs(delta / 30), //length of fire
      1 + delta / 40            //depth of fire
    );
  }

  requestAnimationFrame(loop);
};

const main = () => {
  createScene();
  createLights();

  renderer.render(scene, camera);
  loop();
};

main();