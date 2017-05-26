import Ember from "ember";

export default Ember.Route.extend({
    redirect() {
        this.transitionTo("admin.newa.myCustomers");
    },
    actions: {
        setTitle(title) {
            this.get("controller").set("title", title);
        }
    }
});
