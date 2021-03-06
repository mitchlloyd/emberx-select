/*global expect */
/* jshint expr:true */

import Ember from 'ember';
import startApp from '../helpers/start-app';
import { it } from 'ember-mocha';
import { beforeEach, afterEach, describe } from '../test-helper';

var App;

describe('XSelect', function() {
  var select, controller;
  beforeEach(function() {
    App = startApp();
    visit("/");
  });
  beforeEach(function() {
    var el = Ember.$('select');
    select = Ember.View.views[el.attr('id')];
    this.$ = function() {
      return select.$.apply(select, arguments);
    };
    controller = App.__container__.lookup('controller:application');
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it("does not fire any actions on didInsertElement", function() {
    expect(controller.get('tagged')).not.to.be.ok();
  });

  it('is enabled by default', function() {
    expect(this.$()).not.to.be.disabled;
  });

  it('renders an option for each view', function() {
    expect(this.$('option').length).to.equal(3);
    expect(this.$('option:first')).to.have.text('Charles');
    expect(this.$('option:last')).to.have.text('Stanley');
  });

  it('marks the selected value', function() {
    expect(this.$('option:eq(1)')).to.be.selected;
  });

  describe('choosing the last option', function() {
    beforeEach(function() {
      this.$().prop('selectedIndex', 2).trigger('change');
    });

    it('invokes action', function() {
      expect(controller.get('tagged')).to.equal(controller.get('stanley'));
    });
  });

  describe('manually setting the selected binding', function() {
    beforeEach(function() {
      controller.set('it', controller.get('charles'));
    });
    it('updates the selected option', function() {
      expect(this.$('option:first')).to.be.selected;
    });
  });

  describe('disabling', function() {
    beforeEach(function() {
      controller.set('isDisabled', true);
    });
    it('disables the select box', function() {
      expect(this.$()).not.to.be.enabled;
    });
  });
});
