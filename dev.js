const Selector = require("node-option");

const fs = require("fs");
const spawn = require("child_process").spawn;

const selector = new Selector({
  markWrapperColor: "blue",
  checkedMarkColor: "white",
  textColor: "yellow",
  multiselect: true,
});

const files = fs.readdirSync("./games");

files.forEach((file) => {
  selector.add(file);
});

const result = selector.render();

result.then(
  (value) => {
    const startedWithHostFlag = process.argv.includes("--host");

    const command = `FORCE_COLOR=1 turbo run ${value
      .map((item) => `--filter=${item}`)
      .join(" ")} dev ${startedWithHostFlag ? "-- --host" : ""}`;

    const child = spawn(command, null, {
      stdio: "inherit",
      shell: true,
    });
  },
  (error) => {}
);
