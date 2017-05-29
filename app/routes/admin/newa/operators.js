import Ember from "ember";
import AccountImpagination from "pagination-test/mixins/account-impagination";

export default Ember.Route.extend(AccountImpagination, {
    tabName: "operators",
    title: "operators",
    templateName: "admin/newa/my-customers",
    actions: {
        fetch: function(pageOffset, pageSize, stats) {
            console.log("Fetching! operators");
            let params = {};

            return this.store.query("account", params).then(data => {
                stats.totalPages = data.get("meta.total") / pageSize;
                return data.toArray();
            });
        }
    }
});
