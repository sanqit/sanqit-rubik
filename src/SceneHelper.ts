import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import TrackballControls from "three-trackballcontrols";

class SceneHelper {
  static createRenderer = (width: number, height: number) => {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);
    return renderer;
  };

  static createControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    //const controls = new TrackballControls(camera, renderer.domElement);
    //controls.enableDamping = true
    //controls.dampingFactor = 0.25
    controls.enableZoom = true;
    controls.target.set(0, 5, 0);
    controls.update();
    return controls;
  };
}

export default SceneHelper;
