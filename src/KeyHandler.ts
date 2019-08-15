import * as THREE from "three";
import { op } from "./Enums";
import { ActionHelper } from "./Helpers";

export default class KeyHandler {
  private static map = {
    "70": op["F"],
    "102": op["F'"],
    "83": op["S"],
    "115": op["S'"],
    "66": op["B"],
    "98": op["B'"],

    "76": op["L"],
    "108": op["L'"],
    "77": op["M"],
    "109": op["M'"],
    "82": op["R"],
    "114": op["R'"],

    "85": op["U"],
    "117": op["U'"],
    "69": op["E"],
    "101": op["E'"],
    "68": op["D"],
    "100": op["D'"],

    "88": op["x"],
    "120": op["x'"],
    "89": op["y"],
    "121": op["y'"],
    "90": op["z"],
    "122": op["z'"]
  };
  static addControls(
    cubes: THREE.Mesh[],
    scene: THREE.Scene,
    done?: (x: any) => void
  ) {
    window.onkeypress = e => {
      if (e.target && e.target.tagName === "INPUT") return;
      var op = this.map[e.keyCode];
      if (op) {
        var tween = ActionHelper.action(cubes, scene, op);
        done && done(tween);
      }
    };
  }
}
