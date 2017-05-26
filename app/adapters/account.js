import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({
    buildURL: function(/*type, id, record*/) {
        return "https://jsonblob.com/api/jsonblob/fa9dcf0b-41ed-11e7-ae4c-a700830fa2ac";
    }
});
