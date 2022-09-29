function setup() {
  createCanvas(640, 480);
  beholder.prepare();
  // makes the timeout a bit longer, so there are less false negatives in detection
  beholder.setMarkersTimeout(100);
  // if marker 0 is present, the key 65 ("a") is pressed
  beholder.markerPresenceToKey(0, 65);
}

function draw() {
  background("#ff000011");
  // if key "a" is pressed, change the background to blue
  if (keyIsDown(65)) {
    background("#0000ffff");
  }
}
