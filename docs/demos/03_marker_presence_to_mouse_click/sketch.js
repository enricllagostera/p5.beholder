function setup() {
  createCanvas(640, 480);
  p5beholder.prepare();
  // makes the timeout a bit longer, so there are less false negatives in detection
  p5beholder.setMarkersTimeout(100);
  // if marker 0 is present, press and later release the mouse at the
  // center of the screen
  p5beholder.markerPresenceToMouseClick(0, width / 2, height / 2);
  // if marker 1 is present, click the mouse at it's position
  p5beholder.markerPresenceToMouseClick(1);
}

function mousePressed() {
  console.log("mouse pressed");
  background("#0000ffff");
}

function draw() {
  background("#ff000011");
  // if key "a" is pressed, change the background to blue
  if (mouseIsPressed) {
    fill(color("black"));
    ellipse(mouseX, mouseY, 100, 100);
  }
}
