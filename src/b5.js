// import BeholderLib from 'beholder-detection/dist/beholder-detection.js';
const Beholder = require("beholder-detection");
const b5 = Beholder.default;

b5.isReady = false;
b5.b5DefaultConfig = {
  camera_params: {
    videoSize: 0, // The video size values map to the following [320 x 240, 640 x 480, 1280 x 720, 1920 x 1080]
    rearCamera: false, // Boolean value for defaulting to the rear facing camera. Only works on mobile
    torch: false, // Boolean value for if torch/flashlight is on. Only works for rear facing mobile cameras. Can only be set from init
  },
  detection_params: {
    minMarkerDistance: 10,
    minMarkerPerimeter: 0.2,
    maxMarkerPerimeter: 0.8,
    sizeAfterPerspectiveRemoval: 49,
  },
  feed_params: {
    contrast: 0,
    brightness: 0,
    grayscale: 0,
    flip: false,
  },
  overlay_params: {
    present: true, // Determines if the Beholder overlay will display or be invisible entirely via display: none
    hide: true, // Determines if the overlay should be hidden on the left of the screen or visible
  },
};

b5.prepareBeholder = (
  config = b5.b5DefaultConfig,
  querySelector = "#beholder_root"
) => {
  if (querySelector == null || querySelector == "#beholder_root") {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "beholder_root");
    document.querySelector("body").appendChild(newDiv);
  }
  b5.init(querySelector, config);
};

b5.preUpdate = () => {
  b5.cameraWidth = b5.getVideo().width;
  b5.cameraHeight = b5.getVideo().height;
  b5.update();
};

if (p5) {
  p5.prototype.registerMethod("pre", b5.preUpdate);

  b5.drawDebugMarker = (markerId = 0) => {
    let marker = b5.getMarker(markerId);
    if (marker.present == false) return;
    push();
    fill(255, 0, 0);
    stroke(0, 0, 0);
    beginShape();
    vertex(
      b5.cameraToCanvasCoord(marker.corners[0]).x,
      b5.cameraToCanvasCoord(marker.corners[0]).y
    );
    vertex(
      b5.cameraToCanvasCoord(marker.corners[1]).x,
      b5.cameraToCanvasCoord(marker.corners[1]).y
    );
    vertex(
      b5.cameraToCanvasCoord(marker.corners[2]).x,
      b5.cameraToCanvasCoord(marker.corners[2]).y
    );
    vertex(
      b5.cameraToCanvasCoord(marker.corners[3]).x,
      b5.cameraToCanvasCoord(marker.corners[3]).y
    );
    endShape(CLOSE);
    fill(0, 255, 0);
    let center = b5.cameraToCanvasXY(marker.center.x, marker.center.y);
    ellipse(center.x, center.y, 10, 10);
    textSize(12);
    text(marker.rotation, center.x, center.y + 30, 80, 40);
    pop();
  };

  b5.cameraToCanvasX = (x) => {
    return map(x, 0, b5.cameraWidth, 0, width);
  };

  b5.cameraToCanvasY = (y) => {
    return map(y, 0, b5.cameraHeight, 0, height);
  };

  b5.cameraToCanvasCoord = (coord) => {
    return {
      x: b5.cameraToCanvasX(coord.x),
      y: b5.cameraToCanvasY(coord.y),
    };
  };

  b5.cameraToCanvasXY = (pX, pY) => {
    return {
      x: b5.cameraToCanvasX(pX),
      y: b5.cameraToCanvasY(pY),
    };
  };

  global.b5 = b5;
}
