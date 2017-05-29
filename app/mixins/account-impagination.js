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
    }
});
