/**
 * The main class of the library. It should have a single instance per sketch, which is then prepared at the `setup()` function.
 */
class P5Beholder {
  /**
   * Creates an instance of P5Beholder. It is automatically called during p5 loading. Initialization of the library is only compelte after `prepare()` is called on sketch setup (see {@link P5Beholder#prepare}).
   * @class
   * @private
   */
  constructor() {
    // Requires the Beholder system
    this._bh = require("beholder-detection").default;
  }

  /**
   * Sets-up the p5beholder and sketch integration. Adds Beholder to the HTML page at the and initializes it with proper config file.
   * **Important**: must be called once on `setup()`.
   * The config file must use {@link P5Beholder._defaultConfig} as a base.
   *
   * @param {*} [config=P5Beholder._defaultConfig] - Controls how Beholder detection will run.
   * @param {string} [querySelector="#beholder_root"] - Picks an HTML element to be the parent of the Beholder system elements (GUI, etc).
   * @memberof P5Beholder
   */
  prepare(
    config = P5Beholder._defaultConfig,
    querySelector = "#beholder_root"
  ) {
    // Stores the configuration
    this._config = config;
    this._rootQuery = querySelector;
    // Sets up Beholder in the document DOM.
    if (this._rootQuery == null || this._rootQuery == "#beholder_root") {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "beholder_root");
      document.querySelector("body").appendChild(newDiv);
    }
    // Start the detection system
    this._bh.init(this._rootQuery, this._config);
  }

  /**
   *If a marker is present, the mouse button 0 goes down and, when undetected, goes up. The position of the resulting click can be defined, in pixels.
   * @param {number!} [markerId=0] - The id of the marker to check presence.
   * @param {number} [clickX=0] - The X position where of the resulting click.
   * @param {number} [clickY=0] - The Y position where of the resulting click.
   * @memberof P5Beholder
   */
  markerPresenceToMouseClick(markerId = 0, clickX = 0, clickY = 0) {
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

    this._forwardEventForId(markerId, "markerdetected", downEvent);
    this._forwardEventForId(markerId, "markerundetected", upEvent);
  }

  /**
   * Quick converter between marker presence and keyboard input. When a marker is detected, fires the `keydown` event. Whe the marker is undetected, fires the `keyup` event.
   * @param {number} [markerId=0] - The id of the marker to check.
   * @param {number} [pKeyCode=32] - The number with the keyboard code (from `event.key`).
   * @memberof P5Beholder
   */
  markerPresenceToKey(markerId = 0, pKeyCode = "Space") {
    const downEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: pKeyCode,
      which: pKeyCode,
    });

    const upEvent = new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      keyCode: pKeyCode,
      which: pKeyCode,
    });

    this._forwardEventForId(markerId, "markerdetected", downEvent);
    this._forwardEventForId(markerId, "markerundetected", upEvent);
  }

  /**
   * Changes the timeout value for all markers.
   * @param {number} [timeout=50] - New time in milliseconds.
   * @memberof P5Beholder
   */
  setMarkersTimeout(timeout = 50) {
    for (let i = 0; i < this._bh.getAllMarkers().length; i++) {
      const item = this._bh.getMarker(i);
      item.timeout = timeout;
    }
  }

  /**
   * Debug functionality for drawing a marker on the canvas.
   * @param {number} [markerId=0] - The id of the marker to draw.
   * @memberof P5Beholder
   */
  debugDrawMarker(markerId = 0) {
    let marker = this._bh.getMarker(markerId);
    if (marker.present == false) return;
    push();
    fill(255, 0, 0);
    stroke(0, 0, 0);
    beginShape();
    vertex(
      this.cameraToCanvasVector(marker.corners[0]).x,
      this.cameraToCanvasVector(marker.corners[0]).y
    );
    vertex(
      this.cameraToCanvasVector(marker.corners[1]).x,
      this.cameraToCanvasVector(marker.corners[1]).y
    );
    vertex(
      this.cameraToCanvasVector(marker.corners[2]).x,
      this.cameraToCanvasVector(marker.corners[2]).y
    );
    vertex(
      this.cameraToCanvasVector(marker.corners[3]).x,
      this.cameraToCanvasVector(marker.corners[3]).y
    );
    endShape(CLOSE);
    fill(0, 255, 0);
    let center = this.cameraToCanvasXY(marker.center.x, marker.center.y);
    ellipse(center.x, center.y, 10, 10);
    textSize(12);
    text(marker.rotation, center.x, center.y + 30, 80, 40);
    pop();
  }

  /**
   * Converts X position from camera to canvas.
   * @param {number} x - Camera X position.
   * @return {number} - Canvas X position.
   * @memberof P5Beholder
   */
  cameraToCanvasX(x) {
    return map(x, 0, this.cameraWidth, 0, width);
  }

  /**
   * Converts Y position from camera to canvas.
   * @param {number} y - Camera Y position.
   * @return {number} - Canvas Y position.
   * @memberof P5Beholder
   */
  cameraToCanvasY(y) {
    return map(y, 0, this.cameraHeight, 0, height);
  }

  /**
   * Converts a position from camera to canvas using a p5.Vector.
   * @param {p5.Vector} coord - p5.Vector with camera position.
   * @return {p5.Vector} - p5.Vector with canvas position.
   * @memberof P5Beholder
   */
  cameraToCanvasVector(coord) {
    return createVector(
      this.cameraToCanvasX(coord.x),
      this.cameraToCanvasY(coord.y)
    );
  }

  /**
   * Converts a position from camera to canvas positions using 2 numbers.
   * @param {number} pX - Camera-relative X value.
   * @param {number} pY - Camera-relative Y value.
   * @return {p5.Vector} - p5.Vector with canvas position.
   * @memberof P5Beholder
   */
  cameraToCanvasXY(pX, pY) {
    return createVector(this.cameraToCanvasX(pX), this.cameraToCanvasY(pY));
  }

  /**
   * Checks if a marker's rotation is within a specified range from a target angle. Useful for detecting things like a crank or spinner with a marker at its center.
   * All angles are in radians.
   * @param {number} markerId - The id of the marker to be checked.
   * @param {number} detectionTargetAngle - The target angle.
   * @param {number} angleRange - The range centers around the target angle. Should be less than PI.
   * @return {true|false}
   * @memberof P5Beholder
   */
  markerRotationInRange(markerId, detectionTargetAngle, angleRange) {
    const m = this._bh.getMarker(markerId);
    const currentAngle = m.present ? m.rotation : 0;
    return this.angleInRange(currentAngle, detectionTargetAngle, angleRange);
  }

  /**
   * Checks if the current angle is within a defined range from a target angle. All angles are in radians.
   * @param {number} currentAngle - Value to be checked.
   * @param {number} detectionTargetAngle - The target angle.
   * @param {number} angleRange - The range centers around the target angle. Should be less than PI.
   * @return {true|false}
   * @memberof P5Beholder
   */
  angleInRange(currentAngle, detectionTargetAngle, angleRange) {
    const av = p5.Vector.fromAngle(currentAngle, 1);
    const dv = p5.Vector.fromAngle(detectionTargetAngle, 1);
    const da = dv.angleBetween(av);
    return abs(da) <= angleRange / 2;
  }

  /// Wrappers to Beholder API

  getMarker(markerId) {
    return this._bh.getMarker(markerId);
  }

  /// PRIVATE METHODS AND PROPERTIES

  /**
   * An object holding camera, detection, feed and overlay default options for the Beholder detection system.
   * @static
   * @memberof P5Beholder
   * @example
   * // Structure of the default configuration object
{
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
}
   */
  static _defaultConfig = {
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

  _forwardEventForId(markerId, eventName, destEvt) {
    window.addEventListener(eventName, (srcEvt) => {
      if (srcEvt.detail.id == markerId) {
        window.dispatchEvent(destEvt);
      }
    });
  }
}

/**
 * Global instance of the P5Beholder class.
 * @global
 */
global.p5beholder = new P5Beholder();

// Register preupdate on p5 flow. Thsi needs to be outside the class because of p5 way of dealing with registering methods (i.e. it loses the `this` binding). So, the preUpdate changes things on the global instance just created. Not very nice, but works.
global.p5.prototype.registerMethod("pre", _beholderPreUpdate);

function _beholderPreUpdate() {
  const p5b = global.p5beholder;
  p5b.cameraWidth = p5b._bh.getVideo().width;
  p5b.cameraHeight = p5b._bh.getVideo().height;

  let prevPresence = p5b._bh.getAllMarkers().map((m) => m.present);

  p5b._bh.update();

  let currPresence = p5b._bh.getAllMarkers().map((m) => m.present);

  if (frameCount == 1) {
    prevPresence = [false];
    currPresence = [false];
  }

  prevPresence.forEach((prevState, index) => {
    const currState = currPresence[index];

    if (prevState == false && currState == true) {
      let evDetected = new CustomEvent("markerdetected", {
        detail: { id: index, marker: p5b._bh.getMarker(index) },
      });
      window.dispatchEvent(evDetected);
      return;
    }
    if (prevState == true && currState == false) {
      let evUndetected = new CustomEvent("markerundetected", {
        detail: { id: index, marker: p5b._bh.getMarker(index) },
      });
      window.dispatchEvent(evUndetected);
      return;
    }
  });
}
