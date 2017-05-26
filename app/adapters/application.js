import Ember from "ember";
import DS from "ember-data";

var get = Ember.get;
var forEach = Ember.ArrayPolyfills.forEach;

export default DS.RESTAdapter.extend({
    defaultSerializer: "DS/WebAPI", //Ember.Data 1.0 beta 1 way
    namespace: "api",
    createRecord: function(store, type, snapshot) {
        var data = {};
        data = store.serializerFor(type.modelName).serialize(snapshot /*._createSnapshot()*/, { includeId: false });

        var primaryKey = store.serializerFor(type.modelName).primaryKey;
        if (primaryKey) {
            delete data[primaryKey];
        }

        return this.ajax(this.buildURL(type.modelName, null, snapshot), "POST", { data: data });
    },

    updateRecord: function(store, type, snapshot) {
        var data = {};
        data = store.serializerFor(type.modelName).serialize(snapshot /*._createSnapshot()*/, { includeId: true });

        var id = get(snapshot, "id");

        return this.ajax(this.buildURL(type.modelName, id, snapshot), "PUT", { data: data }, snapshot);
    },

    ajax: function(url, type, hash, snapshot) {
        // if antiForgeryTokenSelector attribute exists, pass it in the header
        var antiForgeryTokenElemSelector = get(this, "antiForgeryTokenSelector");
        if (antiForgeryTokenElemSelector) {
            var antiForgeryToken = $(antiForgeryTokenElemSelector).val();
            if (antiForgeryToken) {
                this.headers = {
                    RequestVerificationToken: antiForgeryToken
                };
            }
        }

        var adapter = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            hash = hash || {};
            hash.url = url;
            hash.type = type;
            // don't let jquery try to parse returned value
            // (because delete doen't return anything)
            if (type !== "DELETE") {
                hash.dataType = "json";
            }
            hash.context = adapter;

            if (hash.data && type !== "GET") {
                hash.contentType = "application/json; charset=utf-8";
                hash.data = JSON.stringify(hash.data);
            }

            if (adapter.headers !== undefined) {
                var headers = adapter.headers;
                hash.beforeSend = function(xhr) {
                    forEach.call(Ember.keys(headers), function(key) {
                        xhr.setRequestHeader(key, headers[key]);
                    });
                };
            }

            hash.success = function(json) {
                if (json === undefined && type === "PUT") {
                    // if PUT and returns no data, treat specially, don't let resolve to override our data
                    // Bug here: due to ember-data limitness, we cannot just resolve empty returns.  We simply do a commit and forget about the
                    // calling then.  Should be fixed by ember-data.js.
                    snapshot.send("didCommit");
                } else {
                    Ember.run(null, resolve, json);
                }
            };

            hash.error = function(jqXHR, textStatus, errorThrown) {
                if (jqXHR) {
                    jqXHR.then = null;
                }

                Ember.run(null, reject, jqXHR);
            };

            Ember.$.ajax(hash);
        });
    },
    shouldReloadAll: function() {
        return true;
    },
    shouldBackgroundReloadRecord: function() {
        return false;
    }

    //
    //    pathForType: function (type) {
    //        // override the default action of camelize and pluralize
    //        return type;
    //    },
});
