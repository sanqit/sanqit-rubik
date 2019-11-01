import * as React from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import Stats from "stats.js";
import SceneHelper from "./SceneHelper";
import TWEEN from "./tweenjsWrapper";
import { CubeHelper, ActionHelper, OPHelper } from "./Helpers";
import KeyHandler from "./KeyHandler";

interface ThreeSceneProps {
  width: number | string;
  height: number | string;
}

interface ThreeSceneState {}

class ThreeScene extends React.Component<ThreeSceneProps, ThreeSceneState> {
  container: HTMLDivElement;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  frameId: number;
  stats: Stats;
  controls: OrbitControls;
  tween: TWEEN.Tween;

  scene2: THREE.Scene;
  camera2: THREE.PerspectiveCamera;
  renderer2: THREE.WebGLRenderer;

  cubes: THREE.Mesh[] = [];
  constructor(props: ThreeSceneProps) {
    super(props);
    this.state = {};
  }

  private initMainScene() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    var scene = (this.scene = new THREE.Scene());
    //scene.add(new THREE.GridHelper(50, 10));

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-30, 20, 60);
    spotLight.castShadow = true;
    spotLight.intensity = 0.3;
    scene.add(spotLight);

    var ambientLight = new THREE.AmbientLight(0xeeeeee);
    scene.add(ambientLight);

    var renderer = (this.renderer = SceneHelper.createRenderer(width, height));
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    this.container.appendChild(renderer.domElement);

    var clock = (this.clock = new THREE.Clock());

    const fov = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 10000;
    var camera = (this.camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    ));
    camera.position.set(-35, 20, 16);

    var controls = (this.controls = new OrbitControls(
      camera,
      renderer.domElement
    ));

    controls.enablePan = false;
    controls.enableZoom = false;

    var cubes = (this.cubes = CubeHelper.createCubes());
    cubes.forEach((cube: THREE.Mesh) => scene.add(cube));
    this.start();
    this.addStats();

    KeyHandler.addControls(cubes, scene, tween => (this.tween = tween));
  }

  private initAdditionaScene() {
    var width = 200;
    var height = 200;

    var scene2 = (this.scene2 = new THREE.Scene());
    scene2.add(new THREE.AxesHelper(100));

    var renderer2 = (this.renderer2 = SceneHelper.createRenderer(
      width,
      height
    ));
    renderer2.setClearColor(0xf0f0f0, 1);
    renderer2.setSize(width, height);
    this.container.appendChild(renderer2.domElement);

    // camera
    var camera2 = (this.camera2 = new THREE.PerspectiveCamera(
      50,
      width / height,
      1,
      1000
    ));
    camera2.up = this.camera.up; // important!
  }

  componentDidMount() {
    this.initMainScene();
    this.initAdditionaScene();
  }
  componentWillUnmount() {
    this.stop();
    this.container.removeChild(this.renderer.domElement);
  }

  addStats = () => {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.container.appendChild(this.stats.dom);
  };
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderScene();
  };
  renderScene = () => {
    this.stats.begin();
    var delta = this.clock.getDelta();
    this.controls.update(delta);
    this.tween && TWEEN.update();

    this.controls.update();

    this.camera2.position.copy(this.camera.position);
    this.camera2.position.sub(this.controls.target); // added by @libe
    this.camera2.position.setLength(300);

    this.camera2.lookAt(this.scene2.position);

    this.stats.end();

    this.renderer.render(this.scene, this.camera);
    this.renderer2.render(this.scene2, this.camera2);
  };
  render() {
    const { width, height } = this.props;
    return (
      <div>
        <div
          style={{ width: width, height: height, position: "absolute" }}
          ref={(container: HTMLDivElement) => (this.container = container)}
        >
          <div style={{ textAlign: "center" }}>
            <div>
              {OPHelper.getDirectOPS().map(ops => (
                <button
                  key={ops}
                  onClick={() =>
                    (this.tween =
                      ActionHelper.action(this.cubes, this.scene, ops) ||
                      this.tween)
                  }
                >
                  {ops}
                </button>
              ))}
            </div>
            <div>
              {OPHelper.getReverseOPS().map(ops => (
                <button
                  key={ops}
                  onClick={() =>
                    (this.tween =
                      ActionHelper.action(this.cubes, this.scene, ops) ||
                      this.tween)
                  }
                >
                  {ops}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={() => {
                  if (ActionHelper.reset()) {
                    this.cubes.forEach(cube => this.scene.remove(cube));
                    this.cubes = CubeHelper.createCubes();
                    this.cubes.forEach(cube => this.scene.add(cube));
                  }
                }}
              >
                reset
              </button>
              <button
                onClick={() =>
                  (this.tween =
                    ActionHelper.shuffle(this.cubes, this.scene) || this.tween)
                }
              >
                shuffle
              </button>
              <button
                onClick={() =>
                  (this.tween =
                    ActionHelper.solve(this.cubes, this.scene) || this.tween)
                }
              >
                solve
              </button>
            </div>
            <input
              ref="input"
              defaultValue={
                "z' (U2 M2 U M2 U2 S2 D' S2) z (U2 M2 U M2 U2 S2 D' S2) (M' S' M S) z' y' (M2 E2 S2) R U2 D2 F B U D' R L F B2 U2 L2 U2 R2 U R2 L2 F2 B2 D B2"
              }
              onKeyUp={e => {
                if (e.keyCode === 13) {
                  var command = this.refs.input.value;
                  this.tween =
                    ActionHelper.runCommand(this.cubes, this.scene, command) ||
                    this.tween;
                }
              }}
            />
            <button
              onClick={() =>
                (this.tween =
                  ActionHelper.runCommand(
                    this.cubes,
                    this.scene,
                    this.refs.input.value
                  ) || this.tween)
              }
            >
              >
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ThreeScene;
