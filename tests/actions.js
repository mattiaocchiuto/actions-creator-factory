const actionFactory = require('./actionsFactory.js');

const actions = [
    {
        type: 'TEST_PAYLOAD_FUNCTION',
        payload: (data) => data + ' mattia',
    },
    'TEST_PAYLOAD_ALL',
    'TEST_NO_PAYLOAD',
];

module.exports = actionFactory(actions);
