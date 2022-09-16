# p5.b5

This is a library for the `p5` library. It integrates the [Beholder detection](https://github.com/project-beholder/beholder-detection) system. Its purpose is to let users create sketches that can detect Aruco markers using a webcam. You can find more info about [Aruco markers here](https://docs.opencv.org/3.2.0/d5/dae/tutorial_aruco_detection.html).

You can use [this website](https://chev.me/arucogen/) to generate and print Aruco markers (select the "Original Aruco" option on the dropdown).

## Installation

### Template project

There is a template ZIP file with an example project in the root folder of this repository, called [`b5-template.zip`](#). You can download it, extract and use it right away.

### Detailed setup

1. Include the `beholder-detection` (version 1.3.1) script in your HTML.
   - You can include it directly from UNPKG:
   ```html
   <script src="https://unpkg.com/beholder-detection@1.3.1/dist/beholder-detection.js"></script>
   ```
   - OR you can download the file from [here](https://unpkg.com/beholder-detection@1.3.1/dist/beholder-detection.js) and add it to your project.
2. Include the `b5` script in your HTML.
   - You can include it directly from UNPKG:
   ```html
   <script src="https://unpkg.com/p5.b5@0.01/dist/p5.b5.min.js"></script>
   ```
   - OR download the file from [here](https://unpkg.com/p5.b5@0.01/dist/p5.b5.min.js) and add it to your project.

After these two steps, the `b5` object should be ready to use from within your sketch.

## Use

1. **Make sure you are serving your sketch from a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).** This necessary for security reasons. Browsers only allow access to cameras from sites in secure contexts, such as served via `https://` or in a `localhost`.
2. **Add the `b5.prepareBeholder()` call in the `setup` function of your sketch.** This initializes Beholder with a default configuration. You can pass in a configuration object ([more info here](https://github.com/project-beholder/beholder-detection#custom-config)) and a query selector to an HTML element to be Beholder's root.
3. **Use the methods in the `b5` from within your sketch.**

### Quick sample

```js
function setup() {
  createCanvas(640, 480)
  b5.prepareBeholder()
}

function draw() {
  // Shows a black background if marker 0 is present
  if (b5.getMarker(0).present) {
    background(0)
  } else {
    // Shows a white background if marker 0 is NOT present
    background(255)
  }
  // Shows information about marker with ID 0
  b5.drawDebugMarker(0)
}
```

## Features

With this library, you can use the functions of the Beholder library through the `b5` object. It takes care of initializing and updating in the correct moments.

### Utilities

Some useful functions that map coordinates from the camera range to the sketch's canvas range.

- `b5.cameraHeight` : returns camera height in pixels.
- `b5.cameraWidth` : returns camera width in pixels.
- `b5.cameraToCanvasX(x)` : returns a number for X axis.
- `b5.cameraToCanvasY(y)` : returns a number for Y axis.
- `b5.cameraToCanvasXY(x, y)` : returns an object with `x` and `y` values.
- `b5.cameraToCanvasCoord({ x, y})` : : returns an object with `x` and `y` values.
