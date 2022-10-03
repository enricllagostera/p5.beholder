let marker0;

function setup() {
  p5beholder.prepare();
  createCanvas(640, 480);
  background(color("blue"));
  // store reference to marker with id 0
  marker0 = p5beholder.getMarker(0);
}

function draw() {
  // beholder updates before all code in draw()
  background(color("crimson"));

  if (marker0.present) {
    // changes bg color and draws marker 0 info if detected
    background(color("lavender"));
    p5beholder.debugDrawMarker(0);
  }
}
