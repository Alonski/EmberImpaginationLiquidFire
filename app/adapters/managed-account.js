import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({
    buildURL: function(/*type, id, record*/) {
        return "https://jsonblob.com/api/jsonblob/eed24de9-41e7-11e7-ae4c-3b997c8ee721";
    }
    // buildURL: function(type, id, record) {
    //     var namespace = this.get("namespace");
    //     var url = this._super(type, id, record);
    //     if (id) {
    //         url = url.replace("managedAccount", "account");
    //     } else {
    //         url = url.replace(namespace, namespace + "/accounts/" + 1);
    //     }
    //     return url;
    // }
});
