let marker0;

function setup() {
  beholder.prepare();
  createCanvas(640, 480);
  // store reference to marker with id 0
  marker0 = beholder.getMarker(0);
}

function draw() {
  // beholder updates before all code in draw()
  background(color("crimson"));

  if (marker0.present) {
    // changes bg color and draws marker 0 info if detected
    background(color("lavender"));
    beholder.drawDebugMarker(0);
  }
}
