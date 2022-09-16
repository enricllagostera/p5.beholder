let config = {
  camera_params: {
    videoSize: 1, // The video size values map to the following [320 x 240, 640 x 480, 1280 x 720, 1920 x 1080]
    rearCamera: false, // Boolean value for defaulting to the rear facing camera. Only works on mobile
    torch: false, // Boolean value for if torch/flashlight is on. Only works for rear facing mobile cameras. Can only be set from init
  },
  detection_params: {
    minMarkerDistance: 5,
    minMarkerPerimeter: 0.2,
    maxMarkerPerimeter: 0.8,
    sizeAfterPerspectiveRemoval: 49,
  },
  feed_params: {
    contrast: 0,
    brightness: 0,
    grayscale: 0,
    flip: true,
  },
  overlay_params: {
    present: true, // Determines if the Beholder overlay will display or be invisible entirely via display: none
    hide: true, // Determines if the overlay should be hidden on the left of the screen or visible
  },
};

function setup() {
  b5.prepareBeholder(config);
  createCanvas(640, 480);
}

function draw() {
  if (b5.getMarker(0).present) {
    background(200);
  } else {
    background(100);
  }
  b5.drawDebugMarker(0);
}
