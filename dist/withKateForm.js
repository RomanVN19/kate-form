'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const withKateForm = (FormComponent, kateFormPath, subElementsPath = 'elements', kateFormStorePath = 'kate-form') => {
  class withKateFormComponent extends _react.Component {
    constructor(props) {
      super(props);

      this.getData = () => this.props.data;

      this.init = elements => this.props.setData('', elements);

      const { setData } = props;
      this.content = (0, _index.createContent)(this.getData, setData, subElementsPath);
    }


    render() {
      return _react2.default.createElement(FormComponent, _extends({}, this.props, {
        kateFormContent: this.content,
        kateFormInit: this.init
      }));
    }
  }
  const mapStateToProps = state => ({
    data: state[kateFormStorePath][kateFormPath]
  });

  return (0, _reactRedux.connect)(mapStateToProps, {
    setData: (0, _index.getSetData)(kateFormPath)
  })(withKateFormComponent);
};

exports.default = withKateForm;