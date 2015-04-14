var React = require('react/addons');
var Cx = React.addons.classSet;
var ComboBoxValue = require('./ComboBoxValue.jsx');

var DEFAULT_VALUE = 'Select a value';
var DEFAULT_CLASS = 'combo-box';
var EXPANDED_CLASS = 'expanded';
var COLLAPSED_CLASS = 'collapsed';

var ComboBox = React.createClass({displayName: "ComboBox",

  getInitialState: function() {
    return {
      expanded: false,
      content: this.props.emptyText
    };
  },

  getDefaultProps: function() {
    return {
      onChange: function() {},
      emptyText: DEFAULT_VALUE,
      className: null
    };
  },

  componentWillMount: function() {
    document.addEventListener('click', this.onClickDocument, false);
  },

  componentWillUnmount: function() {
    document.removeEventListener('click', this.onClickDocument, false);
  },

  render: function() {
    var classList = {};
    classList[DEFAULT_CLASS] = true;
    classList[EXPANDED_CLASS] = this.state.expanded;
    classList[COLLAPSED_CLASS] = !this.state.expanded;

    if (this.props.className) {
      classList[this.props.className] = true;
    }

    return (
      React.createElement("div", {className: Cx(classList)}, 
        React.createElement("div", {onClick: this.onToggleComponent}, 
          this.state.content
        ), 
        React.createElement("ul", null, 
          React.Children.map(this.props.children, function(child) {
            if (child.type === ComboBoxValue.type) {
              return React.addons.cloneWithProps(child, {
                onValueSelected: this.onValueSelected
              });
            } else {
              return child;
            }
          }.bind(this))
        )
      )
    );
  },

  onClickDocument: function(ev) {
    if (!this.getDOMNode().contains(ev.target) && this.state.expanded) {
      this.setState({
        expanded: false
      });
    }
  },

  onToggleComponent: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  onValueSelected: function(value, content, supressCallback) {
    this.setState({
      content: content,
      expanded: false
    });

    if (!supressCallback) {
      this.props.onChange(value);
    }
  }
});

module.exports = ComboBox;
