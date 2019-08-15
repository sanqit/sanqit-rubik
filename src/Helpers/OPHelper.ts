import { op } from "../Enums";
export default class OPHelper {
  static getDirectOPS(): op[] {
    return [
      op["F"],
      op["Fw"],
      op["L"],
      op["Lw"],
      op["B"],
      op["Bw"],
      op["R"],
      op["Rw"],
      op["U"],
      op["Uw"],
      op["D"],
      op["Dw"],
      op["M"],
      op["S"],
      op["E"],
      op["x"],
      op["y"],
      op["z"]
    ];
  }

  static getReverseOPS(): op[] {
    return [
      op["F'"],
      op["Fw'"],
      op["L'"],
      op["Lw'"],
      op["B'"],
      op["Bw'"],
      op["R'"],
      op["Rw'"],
      op["U'"],
      op["Uw'"],
      op["D'"],
      op["Dw'"],
      op["M'"],
      op["S'"],
      op["E'"],
      op["x'"],
      op["y'"],
      op["z'"]
    ];
  }

  static generateRandomCommand(steps: number = 20) {
    var randomOperations: op[] = [];
    for (var i = 0; i < steps; i++) {
      var rand = Math.random();
      var randomOperation = OPHelper.parseOP(
        Math.floor(rand * Object.keys(op).length)
      );
      randomOperations.push(randomOperation);
    }

    return randomOperations;
  }

  static parseOP(val: number | string): op {
    if (typeof val === "string") {
      var parsed = op[val];

      if (parsed == null) {
        for (var key of Object.keys(op)) {
          if (op[key] === val) {
            parsed = op[key];
            break;
          }
        }
      }

      return parsed;
    }

    return op[Object.keys(op)[val]];
  }

  static parseCommand(command: string) {
    command = command
      .replace("Fw'2", "F'2 S'2")
      .replace("Bw'2", "B'2 S2")
      .replace("Lw'2", "L'2 M'2")
      .replace("Rw'2", "R'2 M2")
      .replace("Uw'2", "U'2 E2")
      .replace("Dw'2", "D'2 E'2")

      .replace("Fw2", "F2 S2")
      .replace("Bw2", "B2 S'2")
      .replace("Lw2", "L2 M2")
      .replace("Rw2", "R2 M'2")
      .replace("Uw2", "U2 E'2")
      .replace("Dw2", "D2 E2")

      .replace("Fw'", "F' S'")
      .replace("Bw'", "B' S")
      .replace("Lw'", "L' M'")
      .replace("Rw'", "R' M")
      .replace("Uw'", "U' E")
      .replace("Dw'", "D' E'")

      .replace("Fw", "F S")
      .replace("Bw", "B S'")
      .replace("Lw", "L M")
      .replace("Rw", "R M'")
      .replace("Uw", "U E'")
      .replace("Dw", "D E");

    var split = command.split(" ");
    var ops: op[] = [];
    split.map(x => {
      x = x.replace("(", "").replace(")", "");
      if (x.endsWith("2")) {
        x = x.substring(0, x.length - 1);
        let op = OPHelper.parseOP(x);
        if (op) {
          ops.push(op);
          ops.push(op);
        }
      } else {
        let op = OPHelper.parseOP(x);
        if (op) {
          ops.push(op);
        }
      }
      return undefined;
    });

    return ops;
  }
}
