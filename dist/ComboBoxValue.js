var React = require('react');

var ComboBoxValue = React.createClass({displayName: "ComboBoxValue",

  componentDidMount: function() {
    if (this.props.selected) {
      this.props.onValueSelected(this.props.value, this.props.children, true);
    }
  },

  render: function() {
    return (
      React.createElement("li", {onClick: this.onValueSelected.bind(this, this.props.value, this.props.children)}, this.props.children)
    );
  },

  onValueSelected: function(value, content) {
    this.props.onValueSelected(value, content, false);
  }
});

module.exports = ComboBoxValue;
