import Ember from 'ember';
import AccountImpaginationMixin from '../../../mixins/account-impagination';
import { module, test } from 'qunit';

module('Unit | Mixin | account impagination');

// Replace this with your real tests.
test('it works', function(assert) {
  let AccountImpaginationObject = Ember.Object.extend(AccountImpaginationMixin);
  let subject = AccountImpaginationObject.create();
  assert.ok(subject);
});
