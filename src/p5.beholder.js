// import BeholderLib from 'beholder-detection/dist/beholder-detection.js';
/**
 * @namespace
 * @requires Beholder
 */
const beholder = require("beholder-detection").default;

/**
 * An object holding camera, detection, feed and overlay defaults for the Beholder detection system.
 * @memberOf beholder
 * @private
 */
beholder._p5DefaultConfig = () => {
  return {
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
};

if (p5) {
  /**
   * Configures and initializes the Beholder system. It must be called at during the sketch `setup()`.
   * @public
   * @param {BeholderConfig} config Information about Beholder detection setup (optional)
   * @param {string} querySelector A CSS selector for an element where Beholder will be added
   *
   */
  beholder.prepare = (
    config = beholder._p5DefaultConfig(),
    querySelector = "#beholder_root"
  ) => {
    if (querySelector == null || querySelector == "#beholder_root") {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "beholder_root");
      document.querySelector("body").appendChild(newDiv);
    }
    beholder.init(querySelector, config);
  };

  /**
   * If a marker is present, the mouse button 0 goes down and, when undetected, goes up. The position of the resulting click can be defined, in pixels.
   *
   * @param {number} markerId The id of the marker to check presence
   * @param {number} clickX The X position where of the resulting click
   * @param {number} clickY The Y position where of the resulting click
   */
  beholder.markerPresenceToMouseClick = (
    markerId = 0,
    clickX = 0,
    clickY = 0
  ) => {
    let pos = createVector(clickX, clickY);

    const downEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      button: 0,
      clientX: pos.x,
      clientY: pos.y,
    });

    const upEvent = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      button: 0,
      clientX: pos.x,
      clientY: pos.y,
    });

    beholder._forwardEventForId(markerId, "markerdetected", downEvent);
    beholder._forwardEventForId(markerId, "markerundetected", upEvent);
  };

  beholder.markerPresenceToKey = (markerId, pKeyCode) => {
    const downEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: pKeyCode,
    });

    const upEvent = new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      keyCode: pKeyCode,
    });

    beholder._forwardEventForId(markerId, "markerdetected", downEvent);
    beholder._forwardEventForId(markerId, "markerundetected", upEvent);
  };

  beholder.setMarkersTimeout = (timeout = 50) => {
    for (let i = 0; i < beholder.getAllMarkers().length; i++) {
      const item = beholder.getMarker(i);
      item.timeout = timeout;
    }
  };

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

  beholder.markerRotationInRange = (
    markerId,
    detectionTargetAngle,
    angleRange
  ) => {
    const m = beholder.getMarker(markerId);
    const currentAngle = m.present ? m.rotation : 0;
    return beholder.angleInRange(
      currentAngle,
      detectionTargetAngle,
      angleRange
    );
  };

  beholder.angleInRange = (currentAngle, detectionTargetAngle, angleRange) => {
    const av = p5.Vector.fromAngle(currentAngle, 1);
    const dv = p5.Vector.fromAngle(detectionTargetAngle, 1);
    const da = dv.angleBetween(av);
    return abs(da) <= angleRange / 2;
  };

  // PRIVATE METHODS

  beholder._forwardEventForId = (markerId, eventName, destEvt) => {
    window.addEventListener(eventName, (srcEvt) => {
      if (srcEvt.detail.id == markerId) {
        window.dispatchEvent(destEvt);
      }
    });
  };

  beholder._preUpdate = () => {
    beholder.cameraWidth = beholder.getVideo().width;
    beholder.cameraHeight = beholder.getVideo().height;

    let prevPresence = beholder.getAllMarkers().map((m) => m.present);

    beholder.update();

    let currPresence = beholder.getAllMarkers().map((m) => m.present);

    if (frameCount == 1) {
      prevPresence = [false];
      currPresence = [false];
    }

    prevPresence.forEach((prevState, index) => {
      const currState = currPresence[index];

      if (prevState == false && currState == true) {
        let evDetected = new CustomEvent("markerdetected", {
          detail: { id: index, marker: beholder.getMarker(index) },
        });
        window.dispatchEvent(evDetected);
        return;
      }
      if (prevState == true && currState == false) {
        let evUndetected = new CustomEvent("markerundetected", {
          detail: { id: index, marker: beholder.getMarker(index) },
        });
        window.dispatchEvent(evUndetected);
        return;
      }
    });
  };

  p5.prototype.registerMethod("pre", beholder._preUpdate);

  global.beholder = beholder;
}
