(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["asyncComponents/list-list"],{

/***/ "./frontend/features/list/list.jsx":
/*!*****************************************!*\
  !*** ./frontend/features/list/list.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _list = __webpack_require__(/*! ./list.scss */ \"./frontend/features/list/list.scss\");\n\nvar _list2 = _interopRequireDefault(_list);\n\nvar _listItemLink = __webpack_require__(/*! ./listItemLink */ \"./frontend/features/list/listItemLink.jsx\");\n\nvar _listItemLink2 = _interopRequireDefault(_listItemLink);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar WeatherModule = function (_React$Component) {\n    _inherits(WeatherModule, _React$Component);\n\n    function WeatherModule(props) {\n        _classCallCheck(this, WeatherModule);\n\n        var _this = _possibleConstructorReturn(this, (WeatherModule.__proto__ || Object.getPrototypeOf(WeatherModule)).call(this, props));\n\n        _this.state = {\n            index: 0,\n            itemsPerPage: 10\n        };\n        _this.section = _react2.default.createRef();\n        _this.handleScroll = _this.handleScroll.bind(_this);\n        console.log(\"construct list\", _this.props);\n\n        return _this;\n    }\n\n    _createClass(WeatherModule, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            //during testing jest apperently does not handle refs well\n            if (this.section.current) {\n                this.section.current.scrollTop = this.section.current.scrollHeight / 2;\n            }\n        }\n    }, {\n        key: 'maxIndex',\n        value: function maxIndex() {\n            return parseInt(this.props.locations.length - this.state.itemsPerPage);\n        }\n    }, {\n        key: 'shouldComponentUpdate',\n        value: function shouldComponentUpdate(nextProps, nextState) {\n            if (Object.keys(nextProps.locations).length !== Object.keys(this.props.locations).length) {\n                this.section.current.scrollTop = this.section.current.cleintHeight;\n                this.setState({ index: 0 });\n            }\n            return true;\n        }\n    }, {\n        key: 'handleScroll',\n        value: function handleScroll(e) {\n            if (Boolean(this.section && this.section.current)) {\n                var current = this.section.current;\n                var getTotalHeight = function getTotalHeight() {\n                    return current.scrollHeight - current.clientHeight;\n                };\n                var percentage = this.section.current.scrollTop / getTotalHeight();\n                if (percentage >= .7) {\n                    var index = void 0;\n                    if (this.state.index >= this.maxIndex()) {\n                        index = index;\n                    } else {\n                        index = this.state.index + 1;\n                        this.section.current.scrollTop = getTotalHeight() / 1.5;\n                        this.setState({ index: index });\n                    }\n                }\n                if (percentage <= .3) {\n                    var _index = void 0;\n                    if (this.state.index === 0) {\n                        _index = this.state.index;\n                    } else {\n                        _index = this.state.index - 1;\n                        this.section.current.scrollTop = getTotalHeight() / 3;\n                        this.setState({ index: _index });\n                    }\n                }\n            }\n        }\n    }, {\n        key: 'checkItemsPerPage',\n        value: function checkItemsPerPage() {\n            if (this.section.current) {\n                if (this.section.current.scrollHeight < this.section.current.clientHeight * 1.5 && this.props.locations.length > this.state.itemsPerPage) {\n                    this.setState({\n                        itemsPerPage: this.state.itemsPerPage + 10\n                    });\n                }\n            }\n        }\n    }, {\n        key: 'onClick',\n        value: function onClick(location) {\n            var handler = function handler(e) {\n                if (this.props.clickSelected && location.Id === this.props.clickSelected.Id) {\n                    this.props.unClickSelect();\n                } else {\n                    this.props.clickSelect(location);\n                }\n            };\n            return handler.bind(this);\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            var index = this.state.index;\n            var itemsPerPage = this.state.itemsPerPage;\n            var that = this;\n            console.log(\"render list\", this.props);\n            this.checkItemsPerPage();\n            return _react2.default.createElement(\n                'section',\n                { className: 'locationList greyBackground ' },\n                _react2.default.createElement(\n                    'ul',\n                    { ref: this.section, onWheel: this.handleScroll, onScroll: this.handleScroll, className: 'leftMenuHeight scrollable' },\n                    this.props.locations.slice(index, index + itemsPerPage).map(function (location, i) {\n                        return _react2.default.createElement(_listItemLink2.default, { key: location.Name + i, clickSelected: _this2.props.clickSelected ? _this2.props.clickSelected.Id === location.Id : false, onClick: _this2.onClick.bind(_this2), location: location });\n                    })\n                )\n            );\n        }\n    }]);\n\n    return WeatherModule;\n}(_react2.default.Component);\n\nexports.default = WeatherModule;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC9mZWF0dXJlcy9saXN0L2xpc3QuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2ZlYXR1cmVzL2xpc3QvbGlzdC5qc3g/OTMwZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9saXN0LnNjc3MnXG5cbmltcG9ydCBMaXN0TGluayBmcm9tICcuL2xpc3RJdGVtTGluaydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXRoZXJNb2R1bGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpbmRleDowLFxuICAgICAgICAgICAgaXRlbXNQZXJQYWdlOjEwLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VjdGlvbiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbD10aGlzLmhhbmRsZVNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdCBsaXN0XCIsdGhpcy5wcm9wcylcblxuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICAvL2R1cmluZyB0ZXN0aW5nIGplc3QgYXBwZXJlbnRseSBkb2VzIG5vdCBoYW5kbGUgcmVmcyB3ZWxsXG4gICAgICAgIGlmICh0aGlzLnNlY3Rpb24uY3VycmVudCl7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb24uY3VycmVudC5zY3JvbGxUb3AgPSAgdGhpcy5zZWN0aW9uLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0LzJcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXhJbmRleCgpe1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5wcm9wcy5sb2NhdGlvbnMubGVuZ3RoLXRoaXMuc3RhdGUuaXRlbXNQZXJQYWdlKTtcbiAgICB9XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyxuZXh0U3RhdGUpe1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV4dFByb3BzLmxvY2F0aW9ucykubGVuZ3RoICE9PSBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmxvY2F0aW9ucykubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbi5jdXJyZW50LnNjcm9sbFRvcCA9IHRoaXMuc2VjdGlvbi5jdXJyZW50LmNsZWludEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4OjB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaGFuZGxlU2Nyb2xsKGUsLi4uYXJncyl7XG4gICAgICAgIGlmKEJvb2xlYW4odGhpcy5zZWN0aW9uICYmIHRoaXMuc2VjdGlvbi5jdXJyZW50KSl7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5zZWN0aW9uLmN1cnJlbnQ7XG4gICAgICAgICAgICBjb25zdCBnZXRUb3RhbEhlaWdodCA9ICgpPT4oY3VycmVudC5zY3JvbGxIZWlnaHQgLSBjdXJyZW50LmNsaWVudEhlaWdodClcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0aGlzLnNlY3Rpb24uY3VycmVudC5zY3JvbGxUb3AvZ2V0VG90YWxIZWlnaHQoKTtcbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlID49IC43KXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5pbmRleCA+PSB0aGlzLm1heEluZGV4KCkpe1xuICAgICAgICAgICAgICAgICAgICBpbmRleD1pbmRleDtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLnN0YXRlLmluZGV4KzE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbi5jdXJyZW50LnNjcm9sbFRvcCA9IGdldFRvdGFsSGVpZ2h0KCkvMS41XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4fSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSA8PSAuMyl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUuaW5kZXggPT09IDApe1xuICAgICAgICAgICAgICAgICAgICBpbmRleD10aGlzLnN0YXRlLmluZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9dGhpcy5zdGF0ZS5pbmRleC0xO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY3Rpb24uY3VycmVudC5zY3JvbGxUb3AgPSBnZXRUb3RhbEhlaWdodCgpLzNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXh9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0l0ZW1zUGVyUGFnZSgpe1xuICAgICAgICBpZiAodGhpcy5zZWN0aW9uLmN1cnJlbnQpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VjdGlvbi5jdXJyZW50LnNjcm9sbEhlaWdodCA8IHRoaXMuc2VjdGlvbi5jdXJyZW50LmNsaWVudEhlaWdodCoxLjUgJiYgdGhpcy5wcm9wcy5sb2NhdGlvbnMubGVuZ3RoPnRoaXMuc3RhdGUuaXRlbXNQZXJQYWdlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNQZXJQYWdlOnRoaXMuc3RhdGUuaXRlbXNQZXJQYWdlKzEwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uQ2xpY2sobG9jYXRpb24pe1xuICAgICAgICBjb25zdCBoYW5kbGVyPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKCB0aGlzLnByb3BzLmNsaWNrU2VsZWN0ZWQgJiYgbG9jYXRpb24uSWQgPT09IHRoaXMucHJvcHMuY2xpY2tTZWxlY3RlZC5JZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy51bkNsaWNrU2VsZWN0KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNsaWNrU2VsZWN0KGxvY2F0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN0YXRlLmluZGV4XG4gICAgICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9IHRoaXMuc3RhdGUuaXRlbXNQZXJQYWdlO1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXIgbGlzdFwiLHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuY2hlY2tJdGVtc1BlclBhZ2UoKTtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibG9jYXRpb25MaXN0IGdyZXlCYWNrZ3JvdW5kIFwiPlxuICAgICAgICAgICAgICAgIDx1bCByZWY9e3RoaXMuc2VjdGlvbn0gb25XaGVlbD17dGhpcy5oYW5kbGVTY3JvbGx9IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZVNjcm9sbH0gY2xhc3NOYW1lPVwibGVmdE1lbnVIZWlnaHQgc2Nyb2xsYWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxvY2F0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCxpbmRleCtpdGVtc1BlclBhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgobG9jYXRpb24saSk9PiA8TGlzdExpbmsga2V5PXtsb2NhdGlvbi5OYW1lICsgaX0gIGNsaWNrU2VsZWN0ZWQ9e3RoaXMucHJvcHMuY2xpY2tTZWxlY3RlZD8gIHRoaXMucHJvcHMuY2xpY2tTZWxlY3RlZC5JZCA9PT0gbG9jYXRpb24uSWQgOiBmYWxzZX0gb25DbGljaz17dGhpcy5vbkNsaWNrLmJpbmQodGhpcykgfSBsb2NhdGlvbj17bG9jYXRpb259Lz4gKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICB7Lyo8YnV0dG9uIGNsYXNzTmFtZT1cInNjaGVkdWxlQnV0dG9uXCIgb25DbGljaz17KCk9PnRoYXQucHJvcHMuc2V0TW9kYWxDb21wb25lbnQoPFBvc3RlciBsb2NhdGlvbnM9e3RoYXQucHJvcHMubG9jYXRpb25zfS8+KX0+K1NjaGVkdWxlPC9idXR0b24+Ki99XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIClcblxuICAgIH1cbn1cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQUE7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFVQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFKQTtBQURBO0FBWUE7Ozs7QUE5RkE7QUFDQTtBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/features/list/list.jsx\n");

/***/ }),

/***/ "./frontend/features/list/list.scss":
/*!******************************************!*\
  !*** ./frontend/features/list/list.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./list.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./frontend/features/list/list.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC9mZWF0dXJlcy9saXN0L2xpc3Quc2Nzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2ZlYXR1cmVzL2xpc3QvbGlzdC5zY3NzPzc5NmMiXSwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbGlzdC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xpc3Quc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbGlzdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/features/list/list.scss\n");

/***/ }),

/***/ "./frontend/features/list/listItemLink.jsx":
/*!*************************************************!*\
  !*** ./frontend/features/list/listItemLink.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (props) {\n    var location = props.location;\n\n    return _react2.default.createElement(\n        'button',\n        { onClick: props.onClick(location), className: 'greyBackground card border-bottom-light ' + (props.clickSelected ? \"activeLocation\" : \"\") },\n        _react2.default.createElement(\n            'span',\n            null,\n            _react2.default.createElement(\n                'h2',\n                { className: 'blueLink text-big bold' },\n                location.name\n            ),\n            _react2.default.createElement(\n                'i',\n                { className: \"small text-lightGrey text-normal\" },\n                getAddress(location)\n            )\n        )\n    );\n};\n\nfunction getAddress(location) {\n    return location.Address1 + ', ' + location.City + ', ' + location.State + ', ' + location.Zip;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9mcm9udGVuZC9mZWF0dXJlcy9saXN0L2xpc3RJdGVtTGluay5qc3guanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZnJvbnRlbmQvZmVhdHVyZXMvbGlzdC9saXN0SXRlbUxpbmsuanN4PzFmZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERvbSBmcm9tICdyZWFjdC1kb20nXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpPT57XG4gICAgY29uc3QgbG9jYXRpb24gPSBwcm9wcy5sb2NhdGlvblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrKGxvY2F0aW9uKX0gY2xhc3NOYW1lPXtgZ3JleUJhY2tncm91bmQgY2FyZCBib3JkZXItYm90dG9tLWxpZ2h0ICR7cHJvcHMuY2xpY2tTZWxlY3RlZD8gXCJhY3RpdmVMb2NhdGlvblwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgIDxzcGFuID5cbiAgICAgICAgICAgICAgICA8aDIgIGNsYXNzTmFtZT1cImJsdWVMaW5rIHRleHQtYmlnIGJvbGRcIiA+e2xvY2F0aW9uLm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e1wic21hbGwgdGV4dC1saWdodEdyZXkgdGV4dC1ub3JtYWxcIn0+e2dldEFkZHJlc3MobG9jYXRpb24pfTwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgKVxufVxuZnVuY3Rpb24gZ2V0QWRkcmVzcyhsb2NhdGlvbil7XG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLkFkZHJlc3MxfSwgJHtsb2NhdGlvbi5DaXR5fSwgJHtsb2NhdGlvbi5TdGF0ZX0sICR7bG9jYXRpb24uWmlwfWBcbn0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQURBO0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/features/list/listItemLink.jsx\n");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./frontend/features/list/list.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./frontend/features/list/list.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".locationList {\\n  width: 100%; }\\n\\n.locationList {\\n  border-top: 1px solid #ddd !important; }\\n\\n.locationList .scheduleButton {\\n  position: relative;\\n  bottom: 50px;\\n  left: 67%; }\\n\\n.locationList > ul {\\n  background-color: #f9f9f9; }\\n\\n.scrollFix {\\n  line-height: 1.35;\\n  overflow: hidden; }\\n\\n.workOrderBorder {\\n  border-top: 1px solid #ddd;\\n  border-radius: 4px;\\n  width: 310px; }\\n\\ndiv.ui.bottom.attached.segment {\\n  margin: 0;\\n  padding: 0;\\n  border: 0; }\\n\", \"\"]);\n\n// exports\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZnJvbnRlbmQvZmVhdHVyZXMvbGlzdC9saXN0LnNjc3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9mZWF0dXJlcy9saXN0L2xpc3Quc2Nzcz83N2NkIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmxvY2F0aW9uTGlzdCB7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5sb2NhdGlvbkxpc3Qge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQgIWltcG9ydGFudDsgfVxcblxcbi5sb2NhdGlvbkxpc3QgLnNjaGVkdWxlQnV0dG9uIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvdHRvbTogNTBweDtcXG4gIGxlZnQ6IDY3JTsgfVxcblxcbi5sb2NhdGlvbkxpc3QgPiB1bCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyB9XFxuXFxuLnNjcm9sbEZpeCB7XFxuICBsaW5lLWhlaWdodDogMS4zNTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4ud29ya09yZGVyQm9yZGVyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgd2lkdGg6IDMxMHB4OyB9XFxuXFxuZGl2LnVpLmJvdHRvbS5hdHRhY2hlZC5zZWdtZW50IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./frontend/features/list/list.scss\n");

/***/ })

}]);