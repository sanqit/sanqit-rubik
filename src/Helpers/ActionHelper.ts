import * as THREE from "three";
import TWEEN from "../tweenjs";
import Cube from "../cubejs";
import { OPHelper } from "./";
import { op } from "../Enums";

Cube.initSolver();

var getIndex = (x: number, y: number, z: number) => {
  return 9 * x + 3 * y + 1 * z;
};

export default class ActionHelper {
  static getOperationToAxisMap() {
    var operationToAxisMap: {
      [key: string]: THREE.Vector3;
    } = {};
    operationToAxisMap[op["F"]] = new THREE.Vector3(1, 0, 0);
    operationToAxisMap[op["Fw"]] = new THREE.Vector3(1, 0, 0);
    operationToAxisMap[op["F'"]] = new THREE.Vector3(-1, 0, 0);
    operationToAxisMap[op["Fw'"]] = new THREE.Vector3(-1, 0, 0);

    operationToAxisMap[op["S"]] = new THREE.Vector3(1, 0, 0);
    operationToAxisMap[op["S'"]] = new THREE.Vector3(-1, 0, 0);

    operationToAxisMap[op["B"]] = new THREE.Vector3(-1, 0, 0);
    operationToAxisMap[op["Bw"]] = new THREE.Vector3(-1, 0, 0);
    operationToAxisMap[op["B'"]] = new THREE.Vector3(1, 0, 0);
    operationToAxisMap[op["Bw'"]] = new THREE.Vector3(1, 0, 0);

    operationToAxisMap[op["L"]] = new THREE.Vector3(0, 0, 1);
    operationToAxisMap[op["Lw"]] = new THREE.Vector3(0, 0, 1);
    operationToAxisMap[op["L'"]] = new THREE.Vector3(0, 0, -1);
    operationToAxisMap[op["Lw'"]] = new THREE.Vector3(0, 0, -1);

    operationToAxisMap[op["M"]] = new THREE.Vector3(0, 0, 1);
    operationToAxisMap[op["M'"]] = new THREE.Vector3(0, 0, -1);

    operationToAxisMap[op["R"]] = new THREE.Vector3(0, 0, -1);
    operationToAxisMap[op["Rw"]] = new THREE.Vector3(0, 0, -1);
    operationToAxisMap[op["R'"]] = new THREE.Vector3(0, 0, 1);
    operationToAxisMap[op["Rw'"]] = new THREE.Vector3(0, 0, 1);

    operationToAxisMap[op["U"]] = new THREE.Vector3(0, -1, 0);
    operationToAxisMap[op["Uw"]] = new THREE.Vector3(0, -1, 0);
    operationToAxisMap[op["U'"]] = new THREE.Vector3(0, 1, 0);
    operationToAxisMap[op["Uw'"]] = new THREE.Vector3(0, 1, 0);

    operationToAxisMap[op["E"]] = new THREE.Vector3(0, 1, 0);
    operationToAxisMap[op["E'"]] = new THREE.Vector3(0, -1, 0);

    operationToAxisMap[op["D"]] = new THREE.Vector3(0, 1, 0);
    operationToAxisMap[op["Dw"]] = new THREE.Vector3(0, 1, 0);
    operationToAxisMap[op["D'"]] = new THREE.Vector3(0, -1, 0);
    operationToAxisMap[op["Dw'"]] = new THREE.Vector3(0, -1, 0);

    operationToAxisMap[op["x"]] = new THREE.Vector3(0, 0, -1);
    operationToAxisMap[op["x'"]] = new THREE.Vector3(0, 0, 1);

    operationToAxisMap[op["y"]] = new THREE.Vector3(0, -1, 0);
    operationToAxisMap[op["y'"]] = new THREE.Vector3(0, 1, 0);

    operationToAxisMap[op["z"]] = new THREE.Vector3(1, 0, 0);
    operationToAxisMap[op["z'"]] = new THREE.Vector3(-1, 0, 0);

    return operationToAxisMap;
  }

  static groupAndSwap(cubes: THREE.Mesh[], scene: THREE.Scene, operation: op) {
    var group = new THREE.Object3D();

    var repeat = [
      op["F'"],
      op["Fw'"],
      op["S'"],
      op["B"],
      op["Bw"],
      op["L'"],
      op["Lw'"],
      op["M'"],
      op["R"],
      op["Rw"],
      op["U"],
      op["Uw"],
      op["E'"],
      op["D'"],
      op["Dw'"],
      op["x"],
      op["y"],
      op["z'"]
    ].some(x => x === operation)
      ? 3
      : 1;
    for (var i = 0; i < repeat; i++) {
      switch (operation) {
        case op["F"]:
        case op["F'"]:
          group = this.rotateZ(cubes, scene, [1]);
          break;
        case op["Fw"]:
        case op["Fw'"]:
          group = this.rotateZ(cubes, scene, [1, 1]);
          break;
        case op["S"]:
        case op["S'"]:
          group = this.rotateZ(cubes, scene, [0, 1]);
          break;
        case op["B"]:
        case op["B'"]:
          group = this.rotateZ(cubes, scene, [0, 0, 1]);
          break;
        case op["Bw"]:
        case op["Bw'"]:
          group = this.rotateZ(cubes, scene, [0, 1, 1]);
          break;
        case op["L"]:
        case op["L'"]:
          group = this.rotateX(cubes, scene, [1]);
          break;
        case op["Lw"]:
        case op["Lw'"]:
          group = this.rotateX(cubes, scene, [1, 1]);
          break;
        case op["M"]:
        case op["M'"]:
          group = this.rotateX(cubes, scene, [0, 1]);
          break;
        case op["R"]:
        case op["R'"]:
          group = this.rotateX(cubes, scene, [0, 0, 1]);
          break;
        case op["Rw"]:
        case op["Rw'"]:
          group = this.rotateX(cubes, scene, [0, 1, 1]);
          break;
        case op["U"]:
        case op["U'"]:
          group = this.rotateY(cubes, scene, [0, 0, 1]);
          break;
        case op["Uw"]:
        case op["Uw'"]:
          group = this.rotateY(cubes, scene, [0, 1, 1]);
          break;
        case op["E"]:
        case op["E'"]:
          group = this.rotateY(cubes, scene, [0, 1]);
          break;
        case op["D"]:
        case op["D'"]:
          group = this.rotateY(cubes, scene, [1]);
          break;
        case op["Dw"]:
        case op["Dw'"]:
          group = this.rotateY(cubes, scene, [1, 1]);
          break;
        case op["x"]:
        case op["x'"]:
          group = this.rotateX(cubes, scene, [1, 1, 1]);
          break;
        case op["y"]:
        case op["y'"]:
          group = this.rotateY(cubes, scene, [1, 1, 1]);
          break;
        case op["z"]:
        case op["z'"]:
          group = this.rotateZ(cubes, scene, [1, 1, 1]);
          break;
      }
    }

    scene.add(group);
    return group;
  }

  private static rotateX(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    layers: number[]
  ) {
    var first = layers[0];
    var second = layers[1];
    var third = layers[2];

    var clone = cubes.map(cube => cube);
    var group = new THREE.Object3D();
    for (var x = 0; x < 27; x += 9) {
      for (var y = 0; y < 9; y += 3) {
        for (var z = 0; z < 3; z++) {
          if (!first && z === 0) continue;
          if (!second && z === 1) continue;
          if (!third && z === 2) continue;
          scene.remove(cubes[x + y + z]);
          group.add(cubes[x + y + z]);
        }
      }
    }

    for (var i = 0; i < 3; i++) {
      if (!first && i === 0) continue;
      if (!second && i === 1) continue;
      if (!third && i === 2) continue;

      cubes[getIndex(0, 0, i)] = clone[getIndex(0, 2, i)];
      cubes[getIndex(0, 1, i)] = clone[getIndex(1, 2, i)];
      cubes[getIndex(0, 2, i)] = clone[getIndex(2, 2, i)];

      cubes[getIndex(1, 0, i)] = clone[getIndex(0, 1, i)];
      cubes[getIndex(1, 1, i)] = clone[getIndex(1, 1, i)];
      cubes[getIndex(1, 2, i)] = clone[getIndex(2, 1, i)];

      cubes[getIndex(2, 0, i)] = clone[getIndex(0, 0, i)];
      cubes[getIndex(2, 1, i)] = clone[getIndex(1, 0, i)];
      cubes[getIndex(2, 2, i)] = clone[getIndex(2, 0, i)];
    }

    return group;
  }

  private static rotateY(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    layers: number[]
  ) {
    var first = layers[0];
    var second = layers[1];
    var third = layers[2];

    var clone = cubes.map(cube => cube);
    var group = new THREE.Object3D();
    for (var x = 0; x < 27; x += 9) {
      for (var y = 0; y < 9; y += 3) {
        if (!first && y === 0) continue;
        if (!second && y === 3) continue;
        if (!third && y === 6) continue;
        for (var z = 0; z < 3; z++) {
          scene.remove(cubes[x + y + z]);
          group.add(cubes[x + y + z]);
        }
      }
    }

    for (var i = 0; i < 3; i++) {
      if (!first && i === 0) continue;
      if (!second && i === 1) continue;
      if (!third && i === 2) continue;

      cubes[getIndex(0, i, 0)] = clone[getIndex(2, i, 0)];
      cubes[getIndex(0, i, 1)] = clone[getIndex(1, i, 0)];
      cubes[getIndex(0, i, 2)] = clone[getIndex(0, i, 0)];

      cubes[getIndex(1, i, 0)] = clone[getIndex(2, i, 1)];
      cubes[getIndex(1, i, 1)] = clone[getIndex(1, i, 1)];
      cubes[getIndex(1, i, 2)] = clone[getIndex(0, i, 1)];

      cubes[getIndex(2, i, 0)] = clone[getIndex(2, i, 2)];
      cubes[getIndex(2, i, 1)] = clone[getIndex(1, i, 2)];
      cubes[getIndex(2, i, 2)] = clone[getIndex(0, i, 2)];
    }

    return group;
  }

  private static rotateZ(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    layers: number[]
  ) {
    var first = layers[0];
    var second = layers[1];
    var third = layers[2];

    var clone = cubes.map(cube => cube);
    var group = new THREE.Object3D();
    for (var x = 0; x < 27; x += 9) {
      if (!first && x === 0) continue;
      if (!second && x === 9) continue;
      if (!third && x === 18) continue;

      for (var y = 0; y < 9; y += 3) {
        for (var z = 0; z < 3; z++) {
          scene.remove(cubes[x + y + z]);
          group.add(cubes[x + y + z]);
        }
      }
    }

    for (var i = 0; i < 3; i++) {
      if (!first && i === 0) continue;
      if (!second && i === 1) continue;
      if (!third && i === 2) continue;

      cubes[getIndex(i, 0, 0)] = clone[getIndex(i, 0, 2)];
      cubes[getIndex(i, 0, 1)] = clone[getIndex(i, 1, 2)];
      cubes[getIndex(i, 0, 2)] = clone[getIndex(i, 2, 2)];

      cubes[getIndex(i, 1, 0)] = clone[getIndex(i, 0, 1)];
      cubes[getIndex(i, 1, 1)] = clone[getIndex(i, 1, 1)];
      cubes[getIndex(i, 1, 2)] = clone[getIndex(i, 2, 1)];

      cubes[getIndex(i, 2, 0)] = clone[getIndex(i, 0, 0)];
      cubes[getIndex(i, 2, 1)] = clone[getIndex(i, 1, 0)];
      cubes[getIndex(i, 2, 2)] = clone[getIndex(i, 2, 0)];
    }
    return group;
  }

  static shuffle(cubes: THREE.Mesh[], scene: THREE.Scene) {
    var randomOperations = OPHelper.generateRandomCommand();

    var tween;
    var nextAction = () => {
      randomOperations = randomOperations.splice(1);
      if (randomOperations.length) {
        tween = this.action(cubes, scene, randomOperations[0], nextAction);
      }
    };

    tween = this.action(cubes, scene, randomOperations[0], nextAction);

    return tween;
  }

  static reset() {
    if (this.locked) return false;
    this.solvers = [new Cube()];
    return true;
  }

  private static solvers = [new Cube()];
  private static locked = false;
  static action(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    op: op,
    done?: Function
  ) {
    if (this.locked) return;
    this.locked = true;

    var ops = OPHelper.parseCommand(op);

    ops.forEach(o => {
      this.solvers[this.solvers.length - 1].move(o);
    });

    var axis = ActionHelper.getOperationToAxisMap()[op];
    var group = ActionHelper.groupAndSwap(cubes, scene, op);

    var curRotationAmount = 0;
    var endRotationAmount = Math.PI / 2;
    var tween = new TWEEN.Tween({ theta: curRotationAmount })
      .to({ theta: endRotationAmount }, 150)
      .onUpdate((e: { theta: number }) => {
        group.rotateOnAxis(axis, e.theta - curRotationAmount);
        curRotationAmount = e.theta;
        if (e.theta === endRotationAmount) {
          setTimeout(() => {
            scene.remove(group);
            var rotatedCubes: THREE.Object3D[] = [];
            group.children.forEach(function(cube) {
              var worldPos = group.localToWorld(cube.position);
              cube.position.x = worldPos.x;
              cube.position.y = worldPos.y;
              cube.position.z = worldPos.z;
              rotatedCubes.push(cube);
            });

            rotatedCubes.forEach(c => {
              this.rotateAroundWorldAxis(c, axis, endRotationAmount);
              scene.add(c);
            });

            this.locked = false;
            done && done();
          }, 1);
        }
      })
      .start();

    return tween;
  }

  private static rotateAroundWorldAxis(
    object: THREE.Object3D,
    axis: THREE.Vector3,
    radians: number
  ) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  }

  static runCommand(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    command: string,
    done?: Function
  ) {
    //document.getElementById("overlay").style.display = "none";
    var solution = OPHelper.parseCommand(command);
    var nextAction = () => {
      var tween;
      if (solution.length) {
        var move = solution[0];
        tween = this.action(cubes, scene, move, nextAction);
        solution = solution.splice(1);
      } else {
        done && done();
      }
      return tween;
    };

    return nextAction();
  }

  static solve(cubes: THREE.Mesh[], scene: THREE.Scene) {
    //document.getElementById("overlay").style.display = "";
    var solveOne = () => {
      var tween;
      if (this.solvers[this.solvers.length - 1].isSolved()) {
        if (this.solvers.length > 1) {
          this.solvers.pop();
        }
      } else {
        var solution = this.solvers[this.solvers.length - 1].solve();
        tween = this.runCommand(cubes, scene, solution, () => {
          if (this.solvers.length > 1) {
            this.solvers.pop();
          }
        });
      }
      return tween;
    };

    return solveOne();
  }
}
