const Book = require('../models/Book');



const homePage = async (req, res) => {

    const books = await Book.find();

    const totalBooks = books.length;

    let totalQuantity = 0;

    books.forEach(book => {

        totalQuantity += book.quantity;
    });

    res.render('home', {

        books: books,

        totalBooks: totalBooks,

        totalQuantity: totalQuantity
    });
};


const viewBooks = async (req, res) => {

    const books = await Book.find();

    res.render('viewBooks', {

        books: books
    });
};



const addBookPage = (req, res) => {

    res.render('addBook');
};



const addBook = async (req, res) => {

    const newBook = new Book({

        title: req.body.title,

        author: req.body.author,

        category: req.body.category,

        price: req.body.price,

        quantity: req.body.quantity,

        description: req.body.description,

        image: req.file.filename
    });

    await newBook.save();

    res.redirect('/books');
};


const editBookPage = async (req, res) => {

    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    res.render('editBook', {

        book: book
    });
};


const updateBook = async (req, res) => {

    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    book.title = req.body.title;

    book.author = req.body.author;

    book.category = req.body.category;

    book.price = req.body.price;

    book.quantity = req.body.quantity;

    book.description = req.body.description;

    if (req.file) {

        book.image = req.file.filename;
    }

    await book.save();

    res.redirect('/books');
};



const deleteBook = async (req, res) => {

    const bookId = req.params.id;

    await Book.findByIdAndDelete(bookId);

    res.redirect('/books');
};


module.exports = {

    homePage,

    viewBooks,

    addBookPage,

    addBook,

    editBookPage,

    updateBook,

    deleteBook
};