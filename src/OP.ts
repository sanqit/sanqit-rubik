enum OP {
  "F" = "F",
  "Fw" = "Fw",
  "L" = "L",
  "Lw" = "Lw",
  "B" = "B",
  "Bw" = "Bw",
  "R" = "R",
  "Rw" = "Rw",
  "U" = "U",
  "Uw" = "Uw",
  "D" = "D",
  "Dw" = "Dw",
  "M" = "M",
  "S" = "S",
  "E" = "E",
  "x" = "x",
  "y" = "y",
  "z" = "z",

  "F'" = "F'",
  "Fw'" = "Fw'",
  "L'" = "L'",
  "Lw'" = "Lw'",
  "B'" = "B'",
  "Bw'" = "Bw'",
  "R'" = "R'",
  "Rw'" = "Rw'",
  "U'" = "U'",
  "Uw'" = "Uw'",
  "D'" = "D'",
  "Dw'" = "Dw'",
  "M'" = "M'",
  "S'" = "S'",
  "E'" = "E'",
  "x'" = "x'",
  "y'" = "y'",
  "z'" = "z'"
}
export class OPHelper {
  static getDirectOPS(): OP[] {
    return [
      OP["F"],
      OP["Fw"],
      OP["L"],
      OP["Lw"],
      OP["B"],
      OP["Bw"],
      OP["R"],
      OP["Rw"],
      OP["U"],
      OP["Uw"],
      OP["D"],
      OP["Dw"],
      OP["M"],
      OP["S"],
      OP["E"],
      OP["x"],
      OP["y"],
      OP["z"]
    ];
  }

  static getReverseOPS(): OP[] {
    return [
      OP["F'"],
      OP["Fw'"],
      OP["L'"],
      OP["Lw'"],
      OP["B'"],
      OP["Bw'"],
      OP["R'"],
      OP["Rw'"],
      OP["U'"],
      OP["Uw'"],
      OP["D'"],
      OP["Dw'"],
      OP["M'"],
      OP["S'"],
      OP["E'"],
      OP["x'"],
      OP["y'"],
      OP["z'"]
    ];
  }

  static generateRandomCommand(steps: number = 20) {
    var randomOperations: OP[] = [];
    for (var i = 0; i < steps; i++) {
      var rand = Math.random();
      var randomOperation = OPHelper.parseOP(
        Math.floor(rand * Object.keys(OP).length)
      );
      randomOperations.push(randomOperation);
    }

    return randomOperations;
  }

  static parseOP(op: number | string): OP {
    if (typeof op === "string") {
      var parsed = OP[op];

      if (parsed == null) {
        for (var key of Object.keys(OP)) {
          if (OP[key] === op) {
            parsed = OP[key];
            break;
          }
        }
      }

      return parsed;
    }

    return OP[Object.keys(OP)[op]];
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
    var ops: OP[] = [];
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

export default OP;
