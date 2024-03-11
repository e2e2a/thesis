var multer = require('multer');
// Exporting the methods related to file handling
module.exports.files = {
    // Method for configuring where and how the uploaded files should be stored
    storage: function () {
        // Configuring the storage settings for the uploaded files
        var storage = multer.diskStorage({
            // Setting the destination (path) where the uploaded files will be saved
            destination: function (req, file, cb) {
                // Files will be saved in the 'public/files/' directory
                cb(null, `public/upload/vehicles/`);
            },
            // Setting the name that the uploaded file will have once saved
            filename: function (req, file, cb) {
                // Using the original name of the uploaded file as its name when saved
                cb(null, file.originalname);
            }
        });
        // Returning the configured storage settings
        return storage;
    },
    // Method to check if the uploaded file type is allowed or not
    allowedFile: function (req, file, cb) {
        // Checking the file's original name to see if its extension matches any of the allowed file types
        if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            // If the file type isn't allowed, set an error message on the request object
            req.fileValidationError = 'Only specific files are allowed!';

            // Call the callback function with an error and a value of 'false' 
            // indicating that the file isn't allowed
            return cb(new Error('Only specific files are allowed!'), false);
        }
        // If the file type is allowed, call the callback function with a value of 'true'
        cb(null, true);
    }
}