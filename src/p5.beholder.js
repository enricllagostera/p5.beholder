// import BeholderLib from 'beholder-detection/dist/beholder-detection.js';
const beholder = require("beholder-detection").default;

beholder.isReady = false;
beholder.p5DefaultConfig = {
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

beholder.prepare = (
  config = beholder.p5DefaultConfig,
  querySelector = "#beholder_root"
) => {
  if (querySelector == null || querySelector == "#beholder_root") {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "beholder_root");
    document.querySelector("body").appendChild(newDiv);
  }
  beholder.init(querySelector, config);
};

beholder.preUpdate = () => {
  beholder.cameraWidth = beholder.getVideo().width;
  beholder.cameraHeight = beholder.getVideo().height;
  beholder.update();
};

if (p5) {
  p5.prototype.registerMethod("pre", beholder.preUpdate);

  beholder.drawDebugMarker = (markerId = 0) => {
    let marker = beholder.getMarker(markerId);
    if (marker.present == false) return;
    push();
    fill(255, 0, 0);
    stroke(0, 0, 0);
    beginShape();
    vertex(
      beholder.cameraToCanvasCoord(marker.corners[0]).x,
      beholder.cameraToCanvasCoord(marker.corners[0]).y
    );
    vertex(
      beholder.cameraToCanvasCoord(marker.corners[1]).x,
      beholder.cameraToCanvasCoord(marker.corners[1]).y
    );
    vertex(
      beholder.cameraToCanvasCoord(marker.corners[2]).x,
      beholder.cameraToCanvasCoord(marker.corners[2]).y
    );
    vertex(
      beholder.cameraToCanvasCoord(marker.corners[3]).x,
      beholder.cameraToCanvasCoord(marker.corners[3]).y
    );
    endShape(CLOSE);
    fill(0, 255, 0);
    let center = beholder.cameraToCanvasXY(marker.center.x, marker.center.y);
    ellipse(center.x, center.y, 10, 10);
    textSize(12);
    text(marker.rotation, center.x, center.y + 30, 80, 40);
    pop();
  };

  beholder.cameraToCanvasX = (x) => {
    return map(x, 0, beholder.cameraWidth, 0, width);
  };

  beholder.cameraToCanvasY = (y) => {
    return map(y, 0, beholder.cameraHeight, 0, height);
  };

  beholder.cameraToCanvasCoord = (coord) => {
    return {
      x: beholder.cameraToCanvasX(coord.x),
      y: beholder.cameraToCanvasY(coord.y),
    };
  };

  beholder.cameraToCanvasXY = (pX, pY) => {
    return {
      x: beholder.cameraToCanvasX(pX),
      y: beholder.cameraToCanvasY(pY),
    };
  };

  global.beholder = beholder;
}
