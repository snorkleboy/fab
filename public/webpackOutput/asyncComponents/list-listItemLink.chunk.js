(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["asyncComponents/list-listItemLink"],{

/***/ "./frontend/features/list/listItemLink.jsx":
/*!*************************************************!*\
  !*** ./frontend/features/list/listItemLink.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (props) {\n    var location = props.location;\n\n    return _react2.default.createElement(\n        'button',\n        { onClick: props.onClick(location), className: 'greyBackground card border-bottom-light ' + (props.clickSelected ? \"activeLocation\" : \"\") },\n        _react2.default.createElement(\n            'span',\n            null,\n            _react2.default.createElement(\n                'h2',\n                { className: 'blueLink text-big bold' },\n                location.name\n            ),\n            _react2.default.createElement(\n                'i',\n                { className: \"small text-lightGrey text-normal\" },\n                getAddress(location)\n            )\n        )\n    );\n};\n\nfunction getAddress(location) {\n    return location.Address1 + ', ' + location.City + ', ' + location.State + ', ' + location.Zip;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC9mZWF0dXJlcy9saXN0L2xpc3RJdGVtTGluay5qc3guanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZnJvbnRlbmQvZmVhdHVyZXMvbGlzdC9saXN0SXRlbUxpbmsuanN4PzFmZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERvbSBmcm9tICdyZWFjdC1kb20nXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpPT57XG4gICAgY29uc3QgbG9jYXRpb24gPSBwcm9wcy5sb2NhdGlvblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrKGxvY2F0aW9uKX0gY2xhc3NOYW1lPXtgZ3JleUJhY2tncm91bmQgY2FyZCBib3JkZXItYm90dG9tLWxpZ2h0ICR7cHJvcHMuY2xpY2tTZWxlY3RlZD8gXCJhY3RpdmVMb2NhdGlvblwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgIDxzcGFuID5cbiAgICAgICAgICAgICAgICA8aDIgIGNsYXNzTmFtZT1cImJsdWVMaW5rIHRleHQtYmlnIGJvbGRcIiA+e2xvY2F0aW9uLm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e1wic21hbGwgdGV4dC1saWdodEdyZXkgdGV4dC1ub3JtYWxcIn0+e2dldEFkZHJlc3MobG9jYXRpb24pfTwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgKVxufVxuZnVuY3Rpb24gZ2V0QWRkcmVzcyhsb2NhdGlvbil7XG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLkFkZHJlc3MxfSwgJHtsb2NhdGlvbi5DaXR5fSwgJHtsb2NhdGlvbi5TdGF0ZX0sICR7bG9jYXRpb24uWmlwfWBcbn0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQURBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/features/list/listItemLink.jsx\n");

/***/ })

}]);