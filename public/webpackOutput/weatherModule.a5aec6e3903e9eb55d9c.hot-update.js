webpackHotUpdate("weatherModule",{

/***/ "./frontend/weatherModule.jsx":
/*!************************************!*\
  !*** ./frontend/weatherModule.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n\nvar _LoginPageContainer = __webpack_require__(/*! ./components/session/LoginPageContainer */ \"./frontend/components/session/LoginPageContainer.js\");\n\nvar _LoginPageContainer2 = _interopRequireDefault(_LoginPageContainer);\n\nvar _reactLoadable = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n\nvar _reactLoadable2 = _interopRequireDefault(_reactLoadable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar WeatherModule = function (_React$Component) {\n    _inherits(WeatherModule, _React$Component);\n\n    function WeatherModule(props) {\n        _classCallCheck(this, WeatherModule);\n\n        return _possibleConstructorReturn(this, (WeatherModule.__proto__ || Object.getPrototypeOf(WeatherModule)).call(this, props));\n    }\n\n    _createClass(WeatherModule, [{\n        key: 'render',\n        value: function render() {\n            console.log(\"render\", Date.now(), this.props, this.props.loggedIn ? true : false, { LoginPage: _LoginPageContainer2.default });\n            if (!this.props.loggedIn) {\n                return _react2.default.createElement(\n                    'main',\n                    { className: 'main' },\n                    _react2.default.createElement(_LoginPageContainer2.default, null)\n                );\n            } else {\n                var LoadableComponent = (0, _reactLoadable2.default)({\n                    loader: function loader() {\n                        return Promise.resolve().then(function webpackMissingModule() { var e = new Error(\"Cannot find module './webpackOutput/mainApp.bundle.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; });\n                    },\n                    loading: function loading() {\n                        return _react2.default.createElement(\n                            'h1',\n                            null,\n                            '\"wadup yo\"'\n                        );\n                    }\n                });\n\n                return _react2.default.createElement(\n                    'main',\n                    { className: 'main' },\n                    _react2.default.createElement(LoadableComponent, null)\n                );\n            }\n        }\n    }]);\n\n    return WeatherModule;\n}(_react2.default.Component);\n\nexports.default = (0, _reactHotLoader.hot)(module)(WeatherModule);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC93ZWF0aGVyTW9kdWxlLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mcm9udGVuZC93ZWF0aGVyTW9kdWxlLmpzeD82YjY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3REb20gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGhvdCB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXInO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICcuL2NvbXBvbmVudHMvc2Vzc2lvbi9Mb2dpblBhZ2VDb250YWluZXInO1xuaW1wb3J0IExvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcblxuY2xhc3MgV2VhdGhlck1vZHVsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyXCIsIERhdGUubm93KCksIHRoaXMucHJvcHMsIHRoaXMucHJvcHMubG9nZ2VkSW4gPyB0cnVlIDogZmFsc2UsIHsgTG9naW5QYWdlfSk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5sb2dnZWRJbil7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT0nbWFpbic+XG4gICAgICAgICAgICAgICAgICAgIDxMb2dpblBhZ2UgLz5cbiAgICAgICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgICApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc3QgTG9hZGFibGVDb21wb25lbnQgPSBMb2FkYWJsZSh7XG4gICAgICAgICAgICAgICAgbG9hZGVyOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJtYWluQXBwXCIgKi8gJy4vd2VicGFja091dHB1dC9tYWluQXBwLmJ1bmRsZS5qcycpLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ICgpPT48aDE+XCJ3YWR1cCB5b1wiPC9oMT4sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9J21haW4nPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGFibGVDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgIGhvdChtb2R1bGUpKFdlYXRoZXJNb2R1bGUpO1xuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7OztBQXpCQTtBQUNBO0FBNkJBO0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/weatherModule.jsx\n");

/***/ })

})