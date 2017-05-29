import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route("admin", function() {
        this.route("newa", function() {
            this.route("myCustomers");
            this.route("customers");
            this.route("operators");
        });
    });
});

export default Router;
