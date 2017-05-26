import { moduleForModel, test } from 'ember-qunit';

moduleForModel('managed-account', 'Unit | Serializer | managed account', {
  // Specify the other units that are required for this test.
  needs: ['serializer:managed-account']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
