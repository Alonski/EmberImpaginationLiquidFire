import DS from "ember-data";

export default DS.RESTSerializer.extend({
    isNewSerializerAPI: true,
    normalizeArrayResponse: function(store, primaryType, payload, recordId, requestType) {
        var primaryTypeName = primaryType.modelName;
        var typeName = primaryTypeName;
        var data = {};
        data[typeName] = payload;
        payload = data;
        return this._super.call(this, store, primaryType, payload, recordId, requestType);
    },

    normalizeSingleResponse: function(store, primaryType, payload, recordId, requestType) {
        var primaryTypeName = primaryType.modelName;
        var typeName = primaryTypeName;
        var data = {};
        data[typeName] = payload;

        payload = data;
        return this._super.call(this, store, primaryType, payload, recordId, requestType);
    }
});
