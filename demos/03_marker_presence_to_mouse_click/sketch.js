function setup() {
  createCanvas(640, 480);
  beholder.prepare();
  // makes the timeout a bit longer, so there are less false negatives in detection
  beholder.setMarkersTimeout(100);
  // if marker 0 is present, press and later release the mouse at the
  // center of the screen
  beholder.markerPresenceToMouseClick(0, width / 2, height / 2);
  // if marker 1 is present, click the mouse at it's position
  beholder.markerPresenceToMouseClick(1);
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
