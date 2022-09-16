/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/b5.js":
/*!*******************!*\
  !*** ./src/b5.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// import BeholderLib from 'beholder-detection/dist/beholder-detection.js';\r\nconst b5 = window[\"beholder-detection\"].default;\r\n\r\nb5.isReady = false;\r\nb5.b5DefaultConfig = {\r\n  camera_params: {\r\n    videoSize: 0, // The video size values map to the following [320 x 240, 640 x 480, 1280 x 720, 1920 x 1080]\r\n    rearCamera: false, // Boolean value for defaulting to the rear facing camera. Only works on mobile\r\n    torch: false, // Boolean value for if torch/flashlight is on. Only works for rear facing mobile cameras. Can only be set from init\r\n  },\r\n  detection_params: {\r\n    minMarkerDistance: 10,\r\n    minMarkerPerimeter: 0.2,\r\n    maxMarkerPerimeter: 0.8,\r\n    sizeAfterPerspectiveRemoval: 49,\r\n  },\r\n  feed_params: {\r\n    contrast: 0,\r\n    brightness: 0,\r\n    grayscale: 0,\r\n    flip: false,\r\n  },\r\n  overlay_params: {\r\n    present: true, // Determines if the Beholder overlay will display or be invisible entirely via display: none\r\n    hide: true, // Determines if the overlay should be hidden on the left of the screen or visible\r\n  },\r\n};\r\n\r\nb5.prepareBeholder = (\r\n  config = b5.b5DefaultConfig,\r\n  querySelector = \"#beholder_root\"\r\n) => {\r\n  if (querySelector == null || querySelector == \"#beholder_root\") {\r\n    let newDiv = document.createElement(\"div\");\r\n    newDiv.setAttribute(\"id\", \"beholder_root\");\r\n    document.querySelector(\"body\").appendChild(newDiv);\r\n  }\r\n  b5.init(querySelector, config);\r\n};\r\n\r\nb5.preUpdate = () => {\r\n  b5.cameraWidth = b5.getVideo().width;\r\n  b5.cameraHeight = b5.getVideo().height;\r\n  b5.update();\r\n};\r\n\r\nif (p5) {\r\n  p5.prototype.registerMethod(\"pre\", b5.preUpdate);\r\n\r\n  b5.drawDebugMarker = (markerId = 0) => {\r\n    let marker = b5.getMarker(markerId);\r\n    if (marker.present == false) return;\r\n    push();\r\n    fill(255, 0, 0);\r\n    stroke(0, 0, 0);\r\n    beginShape();\r\n    vertex(\r\n      b5.cameraToCanvasCoord(marker.corners[0]).x,\r\n      b5.cameraToCanvasCoord(marker.corners[0]).y\r\n    );\r\n    vertex(\r\n      b5.cameraToCanvasCoord(marker.corners[1]).x,\r\n      b5.cameraToCanvasCoord(marker.corners[1]).y\r\n    );\r\n    vertex(\r\n      b5.cameraToCanvasCoord(marker.corners[2]).x,\r\n      b5.cameraToCanvasCoord(marker.corners[2]).y\r\n    );\r\n    vertex(\r\n      b5.cameraToCanvasCoord(marker.corners[3]).x,\r\n      b5.cameraToCanvasCoord(marker.corners[3]).y\r\n    );\r\n    endShape(CLOSE);\r\n    fill(0, 255, 0);\r\n    let center = b5.cameraToCanvasXY(marker.center.x, marker.center.y);\r\n    ellipse(center.x, center.y, 10, 10);\r\n    textSize(12);\r\n    text(marker.rotation, center.x, center.y + 30, 80, 40);\r\n    pop();\r\n  };\r\n\r\n  b5.cameraToCanvasX = (x) => {\r\n    return map(x, 0, b5.cameraWidth, 0, width);\r\n  };\r\n\r\n  b5.cameraToCanvasY = (y) => {\r\n    return map(y, 0, b5.cameraHeight, 0, height);\r\n  };\r\n\r\n  b5.cameraToCanvasCoord = (coord) => {\r\n    return {\r\n      x: b5.cameraToCanvasX(coord.x),\r\n      y: b5.cameraToCanvasY(coord.y),\r\n    };\r\n  };\r\n\r\n  b5.cameraToCanvasXY = (pX, pY) => {\r\n    return {\r\n      x: b5.cameraToCanvasX(pX),\r\n      y: b5.cameraToCanvasY(pY),\r\n    };\r\n  };\r\n\r\n  __webpack_require__.g.b5 = b5;\r\n}\r\n\n\n//# sourceURL=webpack://p5.b5/./src/b5.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/b5.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;