// TODO
// 1) Metti a posto i nomi di funzioni e variabili

function createDynamicFunction(customAction) {
    return Function('action', 'return function (){ return action.apply(this, [...arguments]) };')(customAction);
}

function formatFunctionName(type) {
    let formattedName = '';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    type.split('_').map((val, i) => {
        if (i === 0) {
            formattedName += val.toLowerCase();
        } else {
            formattedName += capitalizeFirstLetter(val.toLowerCase());
        }
    });

    return formattedName;
}

const funcToExport = {};

function generalFactory(type, payloadTranslator) {
    return function nomeDaSostituire(data) {
        let action = {
            type,
        };

        if (data) {
            switch (typeof payloadTranslator) {
                case 'function':
                    action.payload = payloadTranslator(data);
                    break;
                default:
                    action.payload = data;
                    break;
            }
        }

        return action;
    }
}

module.exports = function actionFactory(actionsConfig) {
    actionsConfig.map(config => {
        let type = null;
        let payload = null;

        if (typeof config === 'string') {
            type = config;
        } else {
            type = config.type;
            payload = config.payload;
        }

        const functionName = formatFunctionName(type);

        let customFunction = generalFactory(type, payload);
        let customStringFunction = createDynamicFunction(customFunction);

        funcToExport[functionName] = customStringFunction;
    });

    return funcToExport;
} 
