import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    email_or_name: function() {
        if (this.get("email")) {
            return this.get("email");
        }
        return this.get("name");
    }.property("email", "name"),
    password: DS.attr(),
    foreignId: DS.attr()
});
