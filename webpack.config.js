const path = require("path");
const mode = process.env.NODE_ENV;

module.exports = {
  target: "web",
  entry: {
    bundle: ["./src/p5.beholder.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: mode === "development" ? "p5.beholder.js" : "p5.beholder.min.js",
  },
  externals: {
    mathjs: {
      commonjs: "mathjs",
      commonjs2: "mathjs",
      amd: "mathjs",
      root: "mathjs",
    },
  },
};
