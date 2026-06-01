const express = require('express');

const router = express.Router();

const multer = require('multer');

const bookController = require('../controllers/bookController');


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {

        cb(

            null,

            Date.now() + '-' + file.originalname
        );
    }
});

const upload = multer({

    storage: storage
});


router.get(

    '/',

    bookController.homePage
);


router.get(

    '/books',

    bookController.viewBooks
);


router.get(

    '/add-book',

    bookController.addBookPage
);


router.post(

    '/add-book',

    upload.single('image'),

    bookController.addBook
);


router.get(

    '/edit-book/:id',

    bookController.editBookPage
);


router.post(

    '/update-book/:id',

    upload.single('image'),

    bookController.updateBook
);


router.get(

    '/delete-book/:id',

    bookController.deleteBook
);


module.exports = router;