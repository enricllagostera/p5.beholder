# p5.b5

This is a library for the [`p5`](http://p5js.org) creative coding tool. It facilitates using the [Beholder](https://github.com/project-beholder/beholder-detection) system (not created by me) with p5.

## Introduction

### What is Beholder?

[Beholder](https://github.com/project-beholder/beholder-detection) is a great tool that lets users create JavaScript apps that can detect Aruco markers using a webcam. This becomes the basis to creating tangible systems like alternative game controllers without having to use a lot of electronics. You can print the markers and stick them to objects, and these can be tracked with the camera. Beholder is the basis for a variety of cool applications, and you can read more about them and the system in the papers below:

> Gyory, P. (2022). Creating Platforms to Support Craft and Creativity in Game Controller Design. Creativity and Cognition, 708–710. https://doi.org/10.1145/3527927.3533733

> Gyory, P., Owens, P., Bethancourt, M., Banic, A., Zheng, C., & Do, E. Y.-L. (2022). Build Your Own Arcade Machine with Tinycade. Creativity and Cognition, 312–322. https://doi.org/10.1145/3527927.3533023

> Zheng, C., Gyory, P., & Do, E. Y.-L. (2020). Tangible Interfaces with Printed Paper Markers. Proceedings of the 2020 ACM on Designing Interactive Systems Conference, 909–923. https://doi.org/10.1145/3357236.3395578

You can also find more info about [Aruco markers here](https://docs.opencv.org/3.2.0/d5/dae/tutorial_aruco_detection.html).

### A quick example

An example of the **Beholder** system in use is the game [DE VOLTA](https://enric.llagostera.com.br/2022/07/04/de-volta/), created for the [Tinycade](https://tinycade.github.io/tinycade-homepage/) system.

![DE VOLTA being played on a Tinycade at alt.ctrl.GDC 2022](imgs/devolta.gif)

_DE VOLTA being played on a Tinycade at alt.ctrl.GDC 2022._

### Why p5.b5?

My goal in making **p5.b5** is to make experimentation with Beholder easier for p5 users. I like using p5 to try out ideas without having to worry much about setting up a lot of tools. I created p5.b5 to streamline the setup for my own prototyping needs, and it's basically a thin shell hooking into the amazing work of the Beholder creators!

## Installation

### Template project

There is a template ZIP file with an example project in the root folder of this repository, called [`p5-b5-template.zip`](https://github.com/enricllagostera/p5.b5/blob/main/p5-b5-template.zip). You can download it, extract and use it as a starting point for your project.

### Setup

For now, using p5.b5 is a two step process. In the future, the library will be a single file, which will be available on a CDN.

Include the `b5` script in your HTML.

You can include it directly from UNPKG:

```html
<script src="https://unpkg.com/p5.b5@0.0.4/dist/p5.b5.min.js"></script>
```

Or download the file from [here](https://raw.githubusercontent.com/enricllagostera/p5.b5/main/dist/p5.b5.min.js) and include it from your local project.

The `b5` object should be now ready to use from within your sketch.

## Use

1. **Make sure you are serving your sketch from a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).** This necessary for security reasons. Browsers only allow access to cameras from sites in secure contexts, such as served via `https://` or in a `localhost`.
2. **Add the `b5.prepareBeholder()` call in the `setup` function of your sketch.** This initializes Beholder with a default configuration. You can pass in a configuration object ([more info here](https://github.com/project-beholder/beholder-detection#custom-config)) and a query selector to an HTML element to be Beholder's root.
3. **Use the methods in the `b5` from within your sketch.**

You can use [this website](https://chev.me/arucogen/) to generate and print Aruco markers (select the "Original Aruco" option on the dropdown).

### Quick sample

```js
function setup() {
  createCanvas(640, 480);
  b5.prepareBeholder();
}

function draw() {
  // Shows a black background if marker 0 is present
  if (b5.getMarker(0).present) {
    background(0);
  } else {
    // Shows a white background if marker 0 is NOT present
    background(255);
  }
  // Shows information about marker with ID 0
  b5.drawDebugMarker(0);
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
