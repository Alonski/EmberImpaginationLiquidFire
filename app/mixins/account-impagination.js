import Ember from "ember";
import { task, timeout } from "ember-concurrency";

const DEBUG = false;

const { get, set } = Ember;

export default Ember.Mixin.create({
    pageSize: 15,

    columns: [100],

    "on-observe": function(dataset) {
        if (DEBUG) {
            console.log("dataset =", dataset);
        }
    },

    "timeout-ms": 5,
    model(/*params, transition*/) {
        var hash = {
            pageSize: get(this, "pageSize"),
            columns: get(this, "columns")
        };
        return Ember.RSVP.hash(hash);
    },
    activate() {
        this.send("setTitle", get(this, "title"));
    },
    // resetController(controller, isExiting, transition) {
    //     // console.log("controller ", controller);
    //     // console.log("isExiting ", isExiting);
    //     // console.log("transition ", transition);
    //     // this._resetDataset();
    //     get(this, "resetDatasetTask").perform();
    //     //empty by default
    //     //fires when route changes or model is refreshed
    //     // isExiting property true when exiting (obviously)
    // },
    actions: {
        initializeReadOffset(dataset) {
            // console.log("initializeReadOffset!");
            get(this, "setReadOffset").perform(dataset, 0);
        },

        onObjectAt(dataset, index) {
            // console.log("onObjectAt!");
            get(this, "setReadOffset").perform(dataset, index);
        },

        logDatasetState(dataset) {
            // console.log("logDatasetState!");
            set(this, "dataset", dataset);
            if (DEBUG) {
                console.log("dataset =", dataset);
            }
        },

        resetDataset() {
            this._resetDataset();
        }
    },
    setReadOffset: task(function*(dataset, offset) {
        yield timeout(get(this, "timeout-ms"));
        dataset.setReadOffset(offset);
    }).restartable(),
    resetDatasetTask: task(function*() {
        yield timeout(get(this, "timeout-ms"));
        get(this, "dataset").reset(0);
    }).drop(),
    _resetDataset() {
        get(this, "dataset").reset(0);
    },
    _getFetchParams(pageOffset, pageSize) {
        let sortBy = "updated";
        let sortDirection = false;
        let searchTerm = "";
        let shouldSearchByForeignId = get(this.controller, "searchByForeignId");
        let filterPackage = get(this.controller, "filterPackage");
        let filterBIY = "";
        //filter=&iLimitFrom=0&iLimitTo=15&sortDirection=false&sortType=updated
        let params = {
            filterBIY: filterBIY,
            filterPackage: filterPackage,
            iLimitFrom: pageOffset * pageSize,
            iLimitTo: pageSize,
            sortDirection: sortDirection,
            sortType: sortBy
        };

        if (shouldSearchByForeignId) {
            params["foreignId"] = searchTerm;
        } else {
            params["filter"] = searchTerm;
        }
        return params;
    }
});
