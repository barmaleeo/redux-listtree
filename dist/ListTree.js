"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeActive = removeActive;
exports.getLevel = getLevel;
exports.setOpen = setOpen;
exports.setActive = setActive;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./listTreeStyle.scss");

var _Name = _interopRequireDefault(require("./Name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListTree =
/*#__PURE__*/
function (_Component) {
  _inherits(ListTree, _Component);

  function ListTree() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListTree);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListTree)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClickOpen", function (ids, id, e) {
      //console.log(ids);
      e.stopPropagation();

      _this.props.actions.toggleList(_this.props.name, ids, id);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickActive", function (ids, id, e) {
      //console.log(ids);
      e.stopPropagation();

      _this.props.actions.checkList(_this.props.name, ids, id);
    });

    _defineProperty(_assertThisInitialized(_this), "onSave", function (id, name, value) {
      console.log(_this.props.name, id, name, value);

      _this.props.editActions.edit(_this.props.name, id, name, value);
    });

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (ids, item, e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(item);
    });

    return _this;
  }

  _createClass(ListTree, [{
    key: "renderLevel",
    value: function renderLevel(items, ids) {
      var _this2 = this;

      var p = this.props;
      return _react.default.createElement("ul", null, items.map(function (l, k) {
        return typeof p.renderItem === 'function' ? p.renderItem(_this2, l, k, ids) : _this2.renderItem(l, k, ids);
      }));
    }
  }, {
    key: "renderItem",
    value: function renderItem(l, k, ids) {
      var newIds = ids.slice();
      newIds.push(l.id);
      var open;

      if (this.props.filterValue) {
        if (!l.filtered) {
          return null;
        } else {
          open = true;
        }
      } else {
        open = l.open;
      }

      return _react.default.createElement("li", {
        key: k,
        className: l.active ? 'active' : '',
        onContextMenu: this.onContextMenu.bind(this, newIds, l)
      }, l.items && l.items.length > 0 && _react.default.createElement("div", {
        className: 'drop' + (open ? ' open' : ''),
        onClick: this.onClickOpen.bind(this, newIds, l.id)
      }, open ? '-' : '+'), _react.default.createElement(_Name.default, {
        item: l,
        onClick: this.onClickActive.bind(this, newIds, l.id),
        editName: this.props.editName,
        entity: this,
        onSave: this.onSave.bind(this, l.id)
      }), open && l.items && l.items.length > 0 && this.renderLevel(l.items, newIds));
    }
  }, {
    key: "render",
    value: function render() {
      var p = this.props; //const s = this.state;

      var l = p.list;
      return _react.default.createElement("div", {
        className: "list-tree-outher"
      }, this.renderLevel([l], []));
    }
  }]);

  return ListTree;
}(_react.Component);

exports.default = ListTree;

function removeActive(state) {
  state.active = false;

  if (state.items) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = state.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var t = _step.value;
        removeActive(t);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

function getLevel(list, id, callback) {
  if (parseInt(list.id) === parseInt(id)) {
    callback(list);
    return true;
  }

  for (var n in list.items) {
    if (parseInt(list.items[n].id) === parseInt(id)) {
      list.items = list.items.slice();

      if (callback(list.items[n]) === 'remove') {
        list.items.splice(n, 1);
      }

      return true;
    } else if (getLevel(list.items[n], id, callback)) {
      return true;
    }
  }

  return false;
}

function setOpen(list, ids, level) {
  if (level === undefined) {
    level = 1;
  }

  if (ids.length <= level) {
    list.open = !list.open;
    return;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var i = _step2.value;

      if (parseInt(i.id) === parseInt(ids[level])) {
        setOpen(i, ids, level + 1);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function setActive(list, ids, level) {
  if (level === undefined) {
    level = 1;
  }

  if (ids.length <= level) {
    list.active = true;
    return;
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = list.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var i = _step3.value;

      if (parseInt(i.id) === parseInt(ids[level])) {
        setActive(i, ids, level + 1);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}