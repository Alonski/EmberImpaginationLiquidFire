import Ember from "ember";
import AccountImpagination from "pagination-test/mixins/account-impagination";

export default Ember.Route.extend(AccountImpagination, {
    tabName: "myCustomers",
    title: "my-customers",
    actions: {
        fetch: function(pageOffset, pageSize, stats) {
            console.log("Fetching! myCustomers");
            let params = {};

            return this.store.query("managedAccount", params).then(data => {
                console.log(data);
                // console.log(data.get("meta.total"));
                stats.totalPages = data.get("meta.total") / pageSize;
                return data.toArray();
            });
        }
    }
});
