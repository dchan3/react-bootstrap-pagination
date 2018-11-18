(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.pagination = mod.exports;
  }
})(this, function (_exports, _react, _propTypes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  var GridPaging =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GridPaging, _React$Component);

    function GridPaging(props) {
      var _this;

      _classCallCheck(this, GridPaging);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GridPaging).call(this, props));
      _this.state = {
        displayedPages: []
      };
      _this.setDisplayedPages = _this.setDisplayedPages.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleClickPage = _this.handleClickPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleClickShowPrevious = _this.handleClickShowPrevious.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleClickShowNext = _this.handleClickShowNext.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderPage = _this.renderPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(GridPaging, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.setDisplayedPages(this.props);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setDisplayedPages(nextProps);
      }
    }, {
      key: "getIntArray",
      value: function getIntArray(min, max) {
        var result = [];

        for (; min < max; ++min) {
          result.push(min);
        }

        return result;
      }
    }, {
      key: "setDisplayedPages",
      value: function setDisplayedPages(props) {
        if (!props.pagination && props.pagination.ready()) return null;
        var pageCount = props.pagination.totalPages();
        var current = props.pagination.currentPage();
        var min = 0;
        var displayedPages = this.state.displayedPages;

        if (pageCount > props.limit) {
          if (current > props.limit / 2) {
            if (current > pageCount - props.limit / 2) {
              min = pageCount - props.limit;
            } else {
              min = Math.floor(current - props.limit / 2);
            }
          }

          displayedPages = this.getIntArray(min + 1, min + 1 + props.limit);
        } else {
          displayedPages = this.getIntArray(1, pageCount + 1);
        }

        if (displayedPages !== this.state.displayedPages) {
          this.setState({
            displayedPages: displayedPages
          });
        }

        return false;
      }
    }, {
      key: "handleClickPage",
      value: function handleClickPage(page, event) {
        var pagination = this.props.pagination;
        if (!pagination || !pagination.totalPages) return null;

        if (page > 0 && page <= pagination.totalPages()) {
          pagination.currentPage(page);
        }

        event.preventDefault();
        return false;
      }
    }, {
      key: "handleClickShowPrevious",
      value: function handleClickShowPrevious(event) {
        var min = Math.max(1, this.state.displayedPages[0] - this.props.limit);
        var displayedPages = this.getIntArray(min, min + this.props.limit);

        if (displayedPages !== this.state.displayedPages) {
          this.setState({
            displayedPages: displayedPages
          });
        }

        event.preventDefault();
      }
    }, {
      key: "handleClickShowNext",
      value: function handleClickShowNext(event) {
        var pagination = this.props.pagination;
        if (!pagination || !pagination.totalPages) return null;
        var pageCount = pagination.totalPages();
        var min = 1 + Math.min(pageCount - this.props.limit, this.state.displayedPages[this.state.displayedPages.length - 1]);
        var displayedPages = this.getIntArray(min, min + this.props.limit);

        if (displayedPages !== this.state.displayedPages) {
          this.setState({
            displayedPages: displayedPages
          });
        }

        event.preventDefault();
        return false;
      }
    }, {
      key: "renderPage",
      value: function renderPage(page) {
        var pagination = this.props.pagination;
        if (!pagination || !pagination.currentPage) return null;
        var liClass = 'page-item' + (pagination.currentPage() === page ? ' active' : '');
        return _react.default.createElement("li", {
          key: "page ".concat(page),
          className: liClass
        }, _react.default.createElement("a", {
          href: "#",
          className: "page-link",
          title: "Go to page ".concat(page),
          onClick: this.handleClickPage.bind(this, page)
        }, page));
      }
    }, {
      key: "renderFirstPage",
      value: function renderFirstPage() {
        if (this.state.displayedPages.length && this.state.displayedPages[0] > 1) {
          return this.renderPage(1);
        }

        return null;
      }
    }, {
      key: "renderPreviousPages",
      value: function renderPreviousPages() {
        if (this.state.displayedPages.length && this.state.displayedPages[0] > 2) {
          return _react.default.createElement("li", {
            className: "page-item"
          }, _react.default.createElement("a", {
            href: "#",
            className: "page-link show-prev",
            title: "Show previous pages",
            onClick: this.handleClickShowPrevious
          }, "..."));
        }

        return null;
      }
    }, {
      key: "renderNextPages",
      value: function renderNextPages() {
        var pagination = this.props.pagination;
        if (!pagination || !pagination.totalPages) return null;

        if (this.state.displayedPages.length && this.state.displayedPages[this.state.displayedPages.length - 1] < pagination.totalPages() - 1) {
          return _react.default.createElement("li", {
            className: "page-item"
          }, _react.default.createElement("a", {
            href: "#",
            className: "page-link show-prev",
            title: "Show next pages",
            onClick: this.handleClickShowNext
          }, "..."));
        }

        return null;
      }
    }, {
      key: "renderLastPage",
      value: function renderLastPage() {
        var pagination = this.props.pagination;
        if (!pagination || !pagination.totalPages) return null;

        if (this.state.displayedPages.length && this.state.displayedPages[this.state.displayedPages.length - 1] < pagination.totalPages()) {
          return this.renderPage(pagination.totalPages());
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var pagination = this.props.pagination;
        var containerClass = 'pagination-container';

        if (this.props.containerClass.length) {
          containerClass += ' ' + this.props.containerClass;
        }

        if (!pagination || !pagination.ready() || pagination.totalPages() <= 1 || !this.props.limit) {
          return _react.default.createElement("div", {
            className: containerClass
          });
        }

        return _react.default.createElement("div", {
          className: containerClass
        }, _react.default.createElement("ul", {
          className: "pagination"
        }, _react.default.createElement("li", {
          className: "page-item ".concat(pagination.currentPage() === 1 ? 'disabled' : '')
        }, _react.default.createElement("a", {
          href: "#",
          className: "page-link previous-page",
          title: "Previous page",
          onClick: this.handleClickPage.bind(this, pagination.currentPage() - 1)
        }, " < ")), this.renderFirstPage(), this.renderPreviousPages(), this.state.displayedPages.map(this.renderPage), this.renderNextPages(), this.renderLastPage(), _react.default.createElement("li", {
          className: "page-item ".concat(pagination.currentPage() === pagination.totalPages() ? 'disabled' : '')
        }, _react.default.createElement("a", {
          href: "#",
          className: "page-link next-page",
          title: "Next page",
          onClick: this.handleClickPage.bind(this, pagination.currentPage() + 1)
        }, " > "))));
      }
    }]);

    return GridPaging;
  }(_react.default.Component);

  _exports.default = GridPaging;
  GridPaging.propTypes = {
    error: _propTypes.default.any,
    pagination: _propTypes.default.object,
    pageCount: _propTypes.default.number,
    limit: _propTypes.default.number,
    page: _propTypes.default.number,
    containerClass: _propTypes.default.string
  };
  GridPaging.defaultProps = {
    containerClass: '',
    limit: 10,
    pagination: null
  };
});