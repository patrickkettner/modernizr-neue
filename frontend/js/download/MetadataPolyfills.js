'use strict';
var React = require('react');
var util = require('./util');
var listify = util.listify;
var DOM = React.DOM, div = DOM.div, ul = DOM.ul, li = DOM.li, a = DOM.a;

var MetadataPolyfills = React.createClass({
  render: function() {
    var polyfills = this.props.polyfills || [];

    polyfills = _.map(polyfills, function(polyfill) {
      var authors = 'By: ' + listify(polyfill.authors);

      return (
        li({key: polyfill.name},
          a({href: polyfill.href}, polyfill.name),
          div({className:'small'}, authors)
        )
      );
    });

    return (
      div({className: 'box'},
        div({className:'heading-small'}, 'Polyfills'),
        ul(null, polyfills)
      )
    );
  }
});

module.exports = MetadataPolyfills;
