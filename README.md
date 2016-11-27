# actions-creator-factory
[![Build Status](https://travis-ci.org/mattiaocchiuto/actions-creator-factory.svg?branch=master)](https://travis-ci.org/mattiaocchiuto/actions-creator-factory)

This is a very tiny script that prevent you from writing all the boilerplate related to the actions creator functions.

Generally in a redux application (or more generally in an MVI) we have a (or more) file containing the actions type constants and in another different file the actions creator function.

Every time we would add a new action we should add the new constant and the new action-creator-function, and usually (at least in my experience) this is a copy and paste task.

This script provide a factory function whose goal is to automatically generate the actions-creator-functions just receiving as input a cofiguration array containing the actions-constants.

## Installation
From npm
```
npm i actions-creator-factory
```
```javascript
import actionsCreatorFactory from 'actions-creator-factory';
```

## Examples of use:
```javascript
const actions = [
    'TEST_NO_PAYLOAD',
    'TEST_PAYLOAD_ALL',
    {
        type: 'TEST_PAYLOAD_FUNCTION',
        payload: (data) => data + ' test',
    },
];

const actionCreators = actionsCreatorFactory(actions);
```

##Development
Fetch the dependencies by
```
npm install
```
then
### Building
```
npm run build
```

### Running test
```
npm run test
```
  
## License
This project is licensed under the terms of MIT License. See the LICENSE file for more info.
