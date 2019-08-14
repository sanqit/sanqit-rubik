import * as THREE from "three";

export default class CubeHelper {
  static createCubes = (scene: THREE.Scene) => {
    var cubes = [];
    var cubesEdges = [];
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        for (var z = 0; z < 3; z++) {
          var materials = [
            new THREE.MeshPhongMaterial({ color: 0x2f55cf }), // blue
            new THREE.MeshPhongMaterial({ color: 0x26b143 }), // green
            new THREE.MeshPhongMaterial({ color: 0xffffff }), // white
            new THREE.MeshPhongMaterial({ color: 0xe6e621 }), // yellow
            new THREE.MeshPhongMaterial({ color: 0xd92b2c }), // red
            new THREE.MeshPhongMaterial({ color: 0xff7800 }) // orange
          ];

          var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

          var cube = new THREE.Mesh(cubeGeometry, materials);
          cube.position.x = (x - 1) * 4.4;
          cube.position.y = (y - 1) * 4.4;
          cube.position.z = (z - 1) * 4.4;

          cubes.push(cube);

          // wireframe
          var geo = new THREE.EdgesGeometry(cube.geometry); // or WireframeGeometry
          var mat = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 1
          });
          var wireframe = new THREE.LineSegments(geo, mat);
          cube.add(wireframe);
        }
      }
    }

    cubes.forEach(cube => scene.add(cube));

    return cubes;
  };
}
