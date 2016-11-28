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

export function noop(args) {
    return args;
}

export function actionsCreatorFactory(actionsConfig) {
    const funcToExport = {};

    Object.keys(actionsConfig).map((configKey) => {
        const type = configKey;
        const payload = actionsConfig[configKey];

        const functionName = formatFunctionName(type);

        const customFunction = generalFactory(type, payload);
        const customStringFunction = customFunction;

        funcToExport[functionName] = customStringFunction;

        return true;
    });

    return funcToExport;
}
