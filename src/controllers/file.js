// const { uploadFileService } = require('../services/index');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const url = require('url');
const appRoot = require('app-root-path');

module.exports = {
    uploadImage: async (req, res) => {
        const upload = multer().single('image');
        upload(req, res, (err) => {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            } else if (!req.file) {
                return res.status(400).send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.status(400).send(err);
            } else if (err && err.storageErrors && err.storageErrors.length > 0) {
                return res.status(400).send(err);
            }
            return res
                .status(201)
                .send(process.env.API_SERVER + 'api/file/image/' + req.file.filename);
        });
    },
    getImage: async (req, res) => {
        // Parsing the URL
        var request = url.parse(req.url, true);
        // Extracting the path of file
        var action = request.pathname;
        // Path Refinements
        // var filePath = path.join(appRoot.path, '\\src\\public\\', action).split('%20').join(' ');
        var filePath = path.join(__dirname, '../public', action).split('%20').join(' ');
        // console.log(filePath);
        // Checking if the path exists
        fs.exists(filePath, function (exists) {
            if (!exists) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });
                res.end('404 Not Found');
                return;
            }
            // Extracting file extension
            var ext = path.extname(action);
            // Setting default Content-Type
            var contentType = 'text/plain';
            // Checking if the extension of
            // image is '.png'
            if (ext === '.png') {
                contentType = 'image/png';
            }
            // Setting the headers
            res.writeHead(200, {
                'Content-Type': contentType,
            });
            // Reading the file
            fs.readFile(filePath, function (err, content) {
                // Serving the image
                res.end(content);
            });
        });
    },
};
