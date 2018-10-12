webpackHotUpdate("weatherModule",{

/***/ "./frontend/weatherModule.jsx":
/*!************************************!*\
  !*** ./frontend/weatherModule.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n\nvar _LoginPageContainer = __webpack_require__(/*! ./components/session/LoginPageContainer */ \"./frontend/components/session/LoginPageContainer.js\");\n\nvar _LoginPageContainer2 = _interopRequireDefault(_LoginPageContainer);\n\nvar _reactLoadable = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n\nvar _reactLoadable2 = _interopRequireDefault(_reactLoadable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// import MainApp from './mainApp'\nvar WeatherModule = function (_React$Component) {\n    _inherits(WeatherModule, _React$Component);\n\n    function WeatherModule(props) {\n        _classCallCheck(this, WeatherModule);\n\n        return _possibleConstructorReturn(this, (WeatherModule.__proto__ || Object.getPrototypeOf(WeatherModule)).call(this, props));\n    }\n\n    _createClass(WeatherModule, [{\n        key: 'render',\n        value: function render() {\n            console.log(\"render\", Date.now(), this.props, this.props.loggedIn ? true : false, { LoginPage: _LoginPageContainer2.default });\n            if (!this.props.loggedIn) {\n                return _react2.default.createElement(\n                    'main',\n                    { className: 'main' },\n                    _react2.default.createElement(_LoginPageContainer2.default, null)\n                );\n            } else {\n                var LoadableComponent = (0, _reactLoadable2.default)({\n                    loader: function loader() {\n                        return Promise.all(/*! import() | mainApp */[__webpack_require__.e(1), __webpack_require__.e(0)]).then(__webpack_require__.t.bind(null, /*! ./mainApp */ \"./frontend/mainApp.jsx\", 7));\n                    },\n                    loading: function loading() {\n                        return _react2.default.createElement(\n                            'h1',\n                            null,\n                            '\"wadup yo\"'\n                        );\n                    }\n                });\n                return _react2.default.createElement(\n                    'main',\n                    { className: 'main' },\n                    _react2.default.createElement(LoadableComponent, null)\n                );\n            }\n        }\n    }]);\n\n    return WeatherModule;\n}(_react2.default.Component);\n\nexports.default = WeatherModule;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC93ZWF0aGVyTW9kdWxlLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mcm9udGVuZC93ZWF0aGVyTW9kdWxlLmpzeD82YjY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3REb20gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGhvdCB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXInO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICcuL2NvbXBvbmVudHMvc2Vzc2lvbi9Mb2dpblBhZ2VDb250YWluZXInO1xuaW1wb3J0IExvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcbi8vIGltcG9ydCBNYWluQXBwIGZyb20gJy4vbWFpbkFwcCdcbmNsYXNzIFdlYXRoZXJNb2R1bGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlclwiLCBEYXRlLm5vdygpLCB0aGlzLnByb3BzLCB0aGlzLnByb3BzLmxvZ2dlZEluID8gdHJ1ZSA6IGZhbHNlLCB7IExvZ2luUGFnZX0pO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMubG9nZ2VkSW4pe1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9J21haW4nPlxuICAgICAgICAgICAgICAgICAgICA8TG9naW5QYWdlIC8+XG4gICAgICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICAgICAgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnN0IExvYWRhYmxlQ29tcG9uZW50ID0gTG9hZGFibGUoe1xuICAgICAgICAgICAgICAgIGxvYWRlcjogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwibWFpbkFwcFwiICovICcuL21haW5BcHAnKSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiAoKT0+PGgxPlwid2FkdXAgeW9cIjwvaDE+LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT0nbWFpbic+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkYWJsZUNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCAgKFdlYXRoZXJNb2R1bGUpO1xuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7OztBQXhCQTtBQUNBO0FBNEJBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/weatherModule.jsx\n");

/***/ })

})