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

    imageFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
};
