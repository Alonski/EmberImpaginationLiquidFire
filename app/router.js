import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', function() {
    this.route('newa', function() {
      this.route('myCustomers');
      this.route('operators');
      this.route('customers');
    });
  });
});

export default Router;
