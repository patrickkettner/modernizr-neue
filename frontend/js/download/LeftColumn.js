'use strict';
var React = require('react/dist/react.min');
var Option = React.createFactory(require('./Option'));
var util = require('./util');

var pluralize = util.pluralize;
var DOM = React.DOM, div = DOM.div, button = DOM.button, label = DOM.label, input = DOM.input;

var LeftColumn = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    var state = this.state || {};
    var props = this.props;
    var allDetects = props.allDetects;
    var detects = props.detects;
    var options = props.options;
    var select = this.select;

    var total = detects.length + ' available';
    var totalSelected = allDetects.filter(function(detect) {return detect.selected;}).length;
    var selected = totalSelected + ' selected';
    var toggled = detects.length === totalSelected;
    var toggle = (toggled ? 'REMOVE' : 'ADD') + ' ALL';
    var className = (toggled ? 'toggled ' : '') + 'leftColumn column';
    var inputClass = 'classPrefix' + (state.classNameAdded ? ' classNameAdded' : '');
    var results = detects.length === allDetects.length ? ' ' :
      detects.length + pluralize(' result', detects);

    options = _.map(options, function(option) {
      return Option({
        className: 'option',
        data: option,
        select: select,
        key: option.property,
        name: 'options'
      });
    });

    return (
      div({className: className, onClick: this.props.onClick},
        div({className: 'box leftColum-stats'},
          div({className: 'leftColumn-total'}, total),
          div({className: 'leftColumn-selected'}, selected),
          div({className: 'leftColumn-results'}, results),
          button({type: 'button', className: 'leftColumn-toggle', onClick: this.props.toggle}, toggle)
        ),
        div({className: 'box heading-small' + (state.optionsToggled ? ' active' : ''), onClick: this.toggleOptions}, 'Options'),
        div({className: 'leftColumn-options'},
          options,
          label({className: 'hidden', htmlFor: 'classPrefix'}, 'className prefix'),
          input({className: inputClass, name: 'classPrefix', id: 'classPrefix', placeholder:'className prefix', onKeyUp: this.classNameAdded})
        )
      )
    );
  },

  toggleOptions: function() {
    this.setState({optionsToggled: !this.state.optionsToggled});
  },

  select: function(data) {
    data.selected = !data.selected;
    this.setState();
  },

  classNameAdded: function(e) {
    var prefix = e.target.value;
    this.setState({classNameAdded: prefix.length});
    this.props.updatePrefix(prefix);
  }

});

module.exports = LeftColumn;