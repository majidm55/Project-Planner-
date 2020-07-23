(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/App/Component.js":
/*!******************************!*\
  !*** ./src/App/Component.js ***!
  \******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nclass Component {\n  // export default class {\n  constructor(hostElementId, insertBefore = false) {\n    if (hostElementId) {\n      this.hostElement = document.getElementById(hostElementId);\n    } else {\n      this.hostElement = document.body;\n    }\n    this.insertBefore = insertBefore;\n  }\n\n  remove() {\n    if (this.element) {\n      this.element.remove();\n      // this.element.parentElement.removeChild(this.element); \"older syntax\" \n    }\n\n  }\n\n  show() {\n    this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/App/Component.js?");

/***/ }),

/***/ "./src/App/ToolTip.js":
/*!****************************!*\
  !*** ./src/App/ToolTip.js ***!
  \****************************/
/*! exports provided: ToolTip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ToolTip\", function() { return ToolTip; });\n/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component.js */ \"./src/App/Component.js\");\n\n\nclass ToolTip extends _Component_js__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  constructor(closeNotifierFunc, text, hostElementId) {\n    super(hostElementId);\n    this.closeNotifier = closeNotifierFunc;\n    this.text = text;\n    this.closeToolTip = () => {\n      this.remove();\n      this.closeNotifier();\n      };\n    this.render();\n  }\n\n  render() {\n    const toolTipEl = document.createElement('div');\n    toolTipEl.className = 'card';\n    const toolTipTemplate = document.getElementById('tooltip');\n    const toolTipBody = document.importNode(toolTipTemplate.content, true);\n    toolTipBody.querySelector('p').textContent = this.text;\n    toolTipEl.append(toolTipBody);\n\n    const hostElPosLeft = this.hostElement.offsetLeft;\n    const hostElPosTop = this.hostElement.offsetTop;\n    const hostElHeight = this.hostElement.clientHeight;\n    const parentElScroll = this.hostElement.parentElement.scrollTop;\n\n    const x = hostElPosLeft + 20;\n    const y = hostElPosTop + hostElHeight - parentElScroll - 10;\n    toolTipEl.style.position = 'absolute';\n    toolTipEl.style.left = x + 'px';\n    toolTipEl.style.top = y + 'px';\n\n    console.log(this.hostElement.getBoundingClientRect());\n    toolTipEl.addEventListener('click', this.closeToolTip);\n    this.element = toolTipEl;\n  }\n\n\n}\n\n//# sourceURL=webpack:///./src/App/ToolTip.js?");

/***/ })

}]);