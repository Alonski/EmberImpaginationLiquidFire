import Ember from "ember";
import AccountImpagination from "pagination-test/mixins/account-impagination";

export default Ember.Route.extend(AccountImpagination, {
    tabName: "operators",
    title: "operators",
    modelName: "account",
    modelType: "employees",
    templateName: "admin/newa/my-customers",
    actions: {
        fetch: function(pageOffset, pageSize, stats) {
            console.log("Fetching! operators");
            let params = this._getFetchParams(pageOffset, pageSize);
            params["type"] = "employees";

            return this.store.query("account", params).then(data => {
                // console.log(data);
                // console.log(data.get("meta.total"));
                stats.totalPages = data.get("meta.total") / pageSize;
                return data.toArray();
            });
        }
    }
});
