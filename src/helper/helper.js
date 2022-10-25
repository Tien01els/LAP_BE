module.exports = {
    errorResp: (errorStatusCode, errorMsg) => {
        if (errorStatusCode == 400 && !errorMsg) {
            return {
                statusCode: errorStatusCode,
                data: { error: 'Bad request' },
            };
        }
        return { statusCode: errorStatusCode, data: errorMsg };
    },

    respMapper: (statusCode, data) => {
        return { statusCode: statusCode, data: data };
    },
};
