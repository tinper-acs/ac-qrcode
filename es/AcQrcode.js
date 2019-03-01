

'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');

var QRCodeImpl = require('qr.js/lib/QRCode');
var ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel');

function convertStr(str) {
  var out = '';
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x0080) {
      out += String.fromCharCode(charcode);
    } else if (charcode < 0x0800) {
      out += String.fromCharCode(0xc0 | charcode >> 6);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      out += String.fromCharCode(0xe0 | charcode >> 12);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else {
      i++;
      charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
      out += String.fromCharCode(0xf0 | charcode >> 18);
      out += String.fromCharCode(0x80 | charcode >> 12 & 0x3f);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    }
  }
  return out;
}

var DEFAULT_PROPS = {
  size: 128,
  level: 'L',
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  includeMargin: false
};

var PROP_TYPES = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  includeMargin: PropTypes.bool
};

var MARGIN_SIZE = 4;

function generatePath(modules) {
  var margin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var ops = [];
  modules.forEach(function (row, y) {
    var start = null;
    row.forEach(function (cell, x) {
      if (!cell && start !== null) {
        ops.push('M' + (start + margin) + ' ' + (y + margin) + 'h' + (x - start) + 'v1H' + (start + margin) + 'z');
        start = null;
        return;
      }

      if (x === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start === null) {
          ops.push('M' + (x + margin) + ',' + (y + margin) + ' h1v1H' + (x + margin) + 'z');
        } else {
          ops.push('M' + (start + margin) + ',' + (y + margin) + ' h' + (x + 1 - start) + 'v1H' + (start + margin) + 'z');
        }
        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join('');
}

var SUPPORTS_PATH2D = function () {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e) {
    return false;
  }
  return true;
}();

var QRCodeCanvas = (_temp = _class = function (_React$PureComponent) {
  _inherits(QRCodeCanvas, _React$PureComponent);

  function QRCodeCanvas() {
    _classCallCheck(this, QRCodeCanvas);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  QRCodeCanvas.prototype.componentDidMount = function componentDidMount() {
    this.update();
  };

  QRCodeCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
    this.update();
  };

  QRCodeCanvas.prototype.update = function update() {
    var _props = this.props,
        value = _props.value,
        size = _props.size,
        level = _props.level,
        bgColor = _props.bgColor,
        fgColor = _props.fgColor,
        includeMargin = _props.includeMargin;

    var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
    qrcode.addData(convertStr(value));
    qrcode.make();

    if (this._canvas != null) {
      var canvas = this._canvas;

      var ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      var cells = qrcode.modules;
      if (cells === null) {
        return;
      }

      var margin = includeMargin ? MARGIN_SIZE : 0;

      var numCells = cells.length + margin * 2;

      var pixelRatio = window.devicePixelRatio || 1;
      canvas.height = canvas.width = size * pixelRatio;
      var scale = size / numCells * pixelRatio;
      ctx.scale(scale, scale);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, numCells, numCells);

      ctx.fillStyle = fgColor;
      if (SUPPORTS_PATH2D) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
      } else {
        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
    }
  };

  QRCodeCanvas.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        value = _props2.value,
        size = _props2.size,
        level = _props2.level,
        bgColor = _props2.bgColor,
        fgColor = _props2.fgColor,
        style = _props2.style,
        includeMargin = _props2.includeMargin,
        otherProps = _objectWithoutProperties(_props2, ['value', 'size', 'level', 'bgColor', 'fgColor', 'style', 'includeMargin']);

    var canvasStyle = _extends({ height: size, width: size }, style);
    return React.createElement('canvas', _extends({
      style: canvasStyle,
      height: size,
      width: size,
      ref: function ref(_ref) {
        return _this2._canvas = _ref;
      }
    }, otherProps));
  };

  return QRCodeCanvas;
}(React.PureComponent), _class.defaultProps = DEFAULT_PROPS, _class.propTypes = PROP_TYPES, _temp);
var QRCodeSVG = (_temp2 = _class2 = function (_React$PureComponent2) {
  _inherits(QRCodeSVG, _React$PureComponent2);

  function QRCodeSVG() {
    _classCallCheck(this, QRCodeSVG);

    return _possibleConstructorReturn(this, _React$PureComponent2.apply(this, arguments));
  }

  QRCodeSVG.prototype.render = function render() {
    var _props3 = this.props,
        value = _props3.value,
        size = _props3.size,
        level = _props3.level,
        bgColor = _props3.bgColor,
        fgColor = _props3.fgColor,
        includeMargin = _props3.includeMargin,
        otherProps = _objectWithoutProperties(_props3, ['value', 'size', 'level', 'bgColor', 'fgColor', 'includeMargin']);

    var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
    qrcode.addData(convertStr(value));
    qrcode.make();

    var cells = qrcode.modules;
    if (cells === null) {
      return null;
    }

    var margin = includeMargin ? MARGIN_SIZE : 0;

    var fgPath = generatePath(cells, margin);

    var numCells = cells.length + margin * 2;

    return React.createElement(
      'svg',
      _extends({
        shapeRendering: 'crispEdges',
        height: size,
        width: size,
        viewBox: '0 0 ' + numCells + ' ' + numCells
      }, otherProps),
      React.createElement('path', { fill: bgColor, d: 'M0,0 h' + numCells + 'v' + numCells + 'H0z' }),
      React.createElement('path', { fill: fgColor, d: fgPath })
    );
  };

  return QRCodeSVG;
}(React.PureComponent), _class2.defaultProps = DEFAULT_PROPS, _class2.propTypes = PROP_TYPES, _temp2);

var QRCode = function QRCode(props) {
  var renderAs = props.renderAs,
      otherProps = _objectWithoutProperties(props, ['renderAs']);

  var Component = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;
  return React.createElement(Component, otherProps);
};

QRCode.defaultProps = _extends({ renderAs: 'canvas' }, DEFAULT_PROPS);

module.exports = QRCode;