import * as THREE from "build/three.module.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "jsm/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "jsm/helpers/RectAreaLightHelper.js";
const canvas = document.querySelector( "#c" );
const renderer = new THREE.WebGLRenderer( { canvas,antialias: true } );
// camera
const camera = new THREE.PerspectiveCamera( 55, 2, 0.1, 2000 );
camera.position.set( 155, 222, 222 );

// controls
const controls = new OrbitControls( camera, canvas );
controls.update();

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x333333 );

// GROUND
var geometry = new THREE.PlaneBufferGeometry( 555, 555 );
var planeMaterial = new THREE.MeshPhongMaterial( { color: 0x555555,side: THREE.DoubleSide } );
var ground = new THREE.Mesh( geometry, planeMaterial );
ground.position.set( 0, 0, 0 );
ground.rotation.x = Math.PI / -2;
scene.add( ground );

// HemisphereLight
// const skyColor = 0xffffff;  // light blue
// const groundColor = 0xB97A20;  // brownish orange
// const light = new THREE.HemisphereLight( skyColor, groundColor, 1 );
// scene.add( light );

// Lights

const ambient = new THREE.AmbientLight( 0xFFFFFF, 1.5 );
scene.add( ambient );

RectAreaLightUniformsLib.init();
{
  const light = new THREE.RectAreaLight( 0xFFFFFF, 9, 500, 500 );
  light.position.set( 0, 160, 200 );
  light.rotation.x = THREE.MathUtils.degToRad( -55 );
  scene.add( light );
  const helper = new RectAreaLightHelper( light );
  light.add( helper );
}
{
  const light = new THREE.RectAreaLight( 0xFFFFFF, 9, 500, 500 );
  light.position.set( 0, 160, -200 );
  light.rotation.x = THREE.MathUtils.degToRad( 230 );
  scene.add( light );
  const helper = new RectAreaLightHelper( light );
  light.add( helper );
}

// {
//   const light = new THREE.RectAreaLight( 0xFFFFFF, 6, 111, 111,0.2 );
//   light.position.set( 0, 99, 0 );
//   light.rotation.x = THREE.MathUtils.degToRad( -90 );
//   scene.add( light );
// }
// {
//   const light = new THREE.RectAreaLight( 0xFFFFFF, 6, 111, 111,0.2 );
//   light.position.set( 0, 99, 0 );
//   light.rotation.x = THREE.MathUtils.degToRad( -90 );
//   scene.add( light );
// }
new GLTFLoader().load( "./monsoon/scene.gltf", function ( gltf ) {
  const root1 = gltf.scene;
  root1.position.set( 0,3,-99 );
  scene.add( root1 );
}, undefined, function ( err ) {console.log( err );} );

new GLTFLoader().load( "./end_game/scene.gltf", function ( gltf ) {
  const root = gltf.scene;
  root.position.set( 0,1,99 );
  root.rotation.set( 0, Math.PI , 0 );
  scene.add( root );
}, undefined, function ( err ) {console.log( err );} );

function resizeRendererToDisplaySize( renderer ) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if ( needResize ) {
    renderer.setSize( width, height, false );
  }
  return needResize;
}

function render() {
  if ( resizeRendererToDisplaySize( renderer ) ) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render( scene, camera );
  requestAnimationFrame( render );
}
requestAnimationFrame( render );
