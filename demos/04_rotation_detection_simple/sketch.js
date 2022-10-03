let mk0;
let baseAngle;
let lastAngle;
let detectionRangeDegrees = 10;

function setup() {
  beholder.prepare();
  createCanvas(300, 300);
  mk0 = beholder.getMarker(0);
  baseAngle = mk0.rotation;
  lastAngle = baseAngle;
}

function draw() {
  // Visuals
  background("black");

  // Interpolate angle towards last detected angle

  if (mk0.present) {
    // Write detected angle value
    push();
    fill("#fff");
    textSize(24);
    text(mk0.rotation, 20, height - 40, width - 20, 40);
    pop();
    // Update last detected angle
    baseAngle = mk0.rotation;
    lastAngle = baseAngle;
    // Draw detected angle as thick line
    angleLine("#fff", baseAngle);
  } else {
    // Draw detected angle as thin line
    angleLine("#fff", lastAngle, 1);
  }

  // Draw detection zone
  detectAndDisplayRange(90, baseAngle, 25, "cyan");
  detectAndDisplayRange(180, baseAngle, 25, "green");
  detectAndDisplayRange(270, baseAngle, 25, "orange");
}

function detectAndDisplayRange(
  detectionTargetAngle,
  currentAngle,
  angleRange,
  lineColor
) {
  // Show detection areas around range
  angleLine(lineColor, radians(detectionTargetAngle), 5);
  angleLine(lineColor, radians(detectionTargetAngle - angleRange / 2), 2);
  angleLine(lineColor, radians(detectionTargetAngle + angleRange / 2), 2);

  // Draw different if within bounds
  if (
    beholder.angleInRange(
      currentAngle,
      radians(detectionTargetAngle),
      radians(angleRange)
    )
  ) {
    angleLine(lineColor, radians(detectionTargetAngle), 15);
  }
}

function angleLine(lineColor, angleRadians, weight = 10) {
  push();
  fill(lineColor);
  stroke(lineColor);
  strokeWeight(weight);
  angleMode(RADIANS);
  translate(width / 2, height / 2);
  rotate(-angleRadians);
  line(0, 0, 0, -100);
  pop();
}
