import Ember from "ember";
import AccountImpagination from "pagination-test/mixins/account-impagination";

export default Ember.Route.extend(AccountImpagination, {
    tabName: "customers",
    title: "customers",
    modelName: "account",
    modelType: "customers",
    templateName: "admin/newa/my-customers",
    actions: {
        fetch: function(pageOffset, pageSize, stats) {
            console.log("Fetching! customers");
            let params = this._getFetchParams(pageOffset, pageSize);
            params["type"] = "customers";

            return this.store.query("account", params).then(data => {
                // console.log(data);
                // console.log(data.get("meta.total"));
                stats.totalPages = data.get("meta.total") / pageSize;
                return data.toArray();
            });
        }
    }
});
