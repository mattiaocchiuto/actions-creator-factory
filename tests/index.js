'use strict';

import { expect } from 'chai';
import actionsCreatorFactory from '../src';

describe('Comprehension Test', function () {
    const actions = [
        'TEST_NO_PAYLOAD',
        'TEST_PAYLOAD_ALL',
        {
            type: 'TEST_PAYLOAD_FUNCTION',
            payload: (data) => data + ' test',
        },
    ];

    const functionsCreated = actionsCreatorFactory(actions);

    it('Generate a function for each configured actions', function () {
        expect(functionsCreated['testPayloadFunction']).to.be.a('function');
        expect(functionsCreated['testPayloadAll']).to.be.a('function');
        expect(functionsCreated['testNoPayload']).to.be.a('function');
    });

    it('No payloaded action should contain only a type prop', function () {
        const noPayloadAction = functionsCreated['testNoPayload']();

        expect(noPayloadAction.type).to.equal('TEST_NO_PAYLOAD');
        expect(noPayloadAction.payload).to.be.undefined;
    });

    it('Payloaded action should contain only a type prop', function () {
        const noPayloadAction = functionsCreated['testPayloadAll']('test');

        expect(noPayloadAction.type).to.equal('TEST_PAYLOAD_ALL');
        expect(noPayloadAction.payload).to.equal('test');
    });

    it('If the configured payload is a function this should be applied', function () {
        const noPayloadAction = functionsCreated['testPayloadFunction']('test');

        expect(noPayloadAction.type).to.equal('TEST_PAYLOAD_FUNCTION');
        expect(noPayloadAction.payload).to.equal('test test');
    });
});