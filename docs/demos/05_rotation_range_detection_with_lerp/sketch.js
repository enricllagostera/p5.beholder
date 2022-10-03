let mk0;
let baseAngle;
let lastAngle;
let lerpFactor = 2.0;
let sliderLerp;
let labelLerp;
let detectionRangeDegrees = 10;
let gui = [];

function setup() {
  p5beholder.prepare({});
  let cnv = createCanvas(300, 300);
  console.log(cnv);
  mk0 = p5beholder.getMarker(0);
  baseAngle = mk0.rotation;
  lastAngle = baseAngle;

  sliderLerp = createSlider(0.1, 20, 7, 0.1);
  lerpFactor = sliderLerp.value();
  sliderLerp.position(20, height - 70);
  sliderLerp.style("width", width - 50 + "px");
  labelLerp = {
    draw: () => {
      push();
      fill("#fff");
      textSize(15);
      textAlign(LEFT, CENTER);
      text(`lerpFactor: ${lerpFactor}`, 20, height - 90);
      pop();
    },
  };
  gui.push(labelLerp);
}

function draw() {
  // Visuals
  background("black");
  lerpFactor = sliderLerp.value();
  gui.forEach((elt) => elt.draw());

  // Interpolate angle towards last detected angle
  let av = p5.Vector.fromAngle(baseAngle, 1);
  let rv = p5.Vector.fromAngle(lastAngle, 1);
  av.lerp(rv, deltaTime * 0.001 * lerpFactor);
  baseAngle = av.heading();
  angleLine("#f00", baseAngle);

  if (mk0.present) {
    // Write detected angle value
    push();
    fill("#fff");
    textSize(24);
    text(mk0.rotation, 20, height - 40, width - 20, 40);
    pop();
    // Update last detected angle
    lastAngle = mk0.rotation;
    // Draw detected angle as thick line
    angleLine("#fff", mk0.rotation);
  } else {
    // Draw detected angle as thin line
    angleLine("#fff", lastAngle, 1);
  }

  // Draw detection zone
  detectRange(90, baseAngle, 35, "cyan");
  detectRange(180, baseAngle, 35, "green");
  detectRange(270, baseAngle, 35, "orange");
}

function detectRange(
  detectionTargetAngle,
  currentAngle,
  angleRange,
  lineColor
) {
  // Show detection areas around range
  angleLine(lineColor, radians(detectionTargetAngle), 5);
  angleLine(lineColor, radians(detectionTargetAngle - angleRange / 2), 2);
  angleLine(lineColor, radians(detectionTargetAngle + angleRange / 2), 2);

  if (
    p5beholder.angleInRange(
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
