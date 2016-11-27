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

        return true;
    });

    return formattedName;
}

function generalFactory(type, payloadTranslator) {
    return function nomeDaSostituire(data) {
        const action = {
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
    };
}

module.exports = function actionsCreatorFactory(actionsConfig) {
    const funcToExport = {};

    actionsConfig.map((config) => {
        let type = null;
        let payload = null;

        if (typeof config === 'string') {
            type = config;
        } else {
            type = config.type;
            payload = config.payload;
        }

        const functionName = formatFunctionName(type);

        const customFunction = generalFactory(type, payload);
        const customStringFunction = customFunction;

        funcToExport[functionName] = customStringFunction;

        return true;
    });

    return funcToExport;
};
