'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withKateForm = function withKateForm(FormComponent, kateFormPath) {
  var subElementsPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'elements';
  var kateFormStorePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'kate-form';

  var withKateFormComponent = function (_Component) {
    _inherits(withKateFormComponent, _Component);

    function withKateFormComponent(props) {
      _classCallCheck(this, withKateFormComponent);

      var _this = _possibleConstructorReturn(this, (withKateFormComponent.__proto__ || Object.getPrototypeOf(withKateFormComponent)).call(this, props));

      _this.getData = function () {
        return _this.props.data;
      };

      _this.getValues = function () {
        return (0, _index.getValues)(_this.props.data, subElementsPath);
      };

      _this.setValues = function (values) {
        return (0, _index.setValues)(values, _this.props.data, _this.props.setData, subElementsPath);
      };

      _this.init = function (elements) {
        return _this.props.setData('', elements);
      };

      var setData = props.setData;

      _this.content = (0, _index.createContent)(_this.getData, setData, subElementsPath);
      return _this;
    }

    _createClass(withKateFormComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(FormComponent, _extends({}, this.props, {
          kateFormContent: this.content,
          kateFormInit: this.init,
          getValues: this.getValues,
          setValues: this.setValues
        }));
      }
    }]);

    return withKateFormComponent;
  }(_react.Component);

  var mapStateToProps = function mapStateToProps(state) {
    return {
      data: state[kateFormStorePath][kateFormPath]
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, {
    setData: (0, _index.getSetData)(kateFormPath)
  })(withKateFormComponent);
};

exports.default = withKateForm;