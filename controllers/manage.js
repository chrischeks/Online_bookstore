'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/CategoryModel');

module.exports = function(router){
    router.get('/', function(req, res){
        res.render('manage/index');
    });

    router.get('/books', function(req, res){

        Book.find({}, function(err, books){
            if(err){
                console.log(err);
            }

            var model = {
                books: books
            };
            res.render('manage/books/index', model);
        });
    });

    router.get('/books/add', function(req, res){
        Category.find({}, function(err, categories){
            if(err){
                console.log(err);
            }
            var model = {
                categories: categories
            };
            res.render('manage/books/add', model);
        });
    });

    router.post('/books', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if(title == '' || price == ''){
            req.flash('error', 'Title and price are needed');
            res.location('/manage/books/add');
            return res.redirect('/manage/books/add');
        }

        if(isNaN(price)){
            req.flash('error', 'Title and price are needed');
            res.location('/manage/books/add');
            return res.redirect('/manage/books/add');
        }

        var newBook = new Book({
            title: title,
            category: category,
            price: price,
            author: author,
            publisher: publisher,
            cover: cover,
            description: description
        });

        newBook.save(function(err){
            if (err) {
                console.log('Save error', err);
            }

            req.flash('Success', 'Book Added');
            res.location('/manage/books');
            return res.redirect('/manage/books');

        });
    });


    router.get('/books/edit/:id', function(req, res){
        Category.find({}, function(err, categories){
            Book.findOne({_id: req.params.id}, function(err, book){
                if(err){
                    console.log(err);
                }
                var model = {
                    book: book,
                    categories: categories
                };
                res.render('manage/books/edit', model);
            });
        });
    });

    router.post('/books/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if(title == '' || price == ''){
            req.flash('error', 'Title and price are needed');

        }

        if(isNaN(price)){
            req.flash('error', 'Title and price are needed');

        }

        Book.update({_id: req.params.id}, {
            title: title,
            category: category,
            price: price,
            author: author,
            publisher: publisher,
            cover: cover,
            description: description
        }, function(err){
            if (err) {
                console.log('Update error', err);
            }

            req.flash('Success', 'Book Updated');
            res.location('/manage/books');
            return res.redirect('/manage/books');

        });
    });

    router.post('/books/delete/:id', function(req, res){
        Book.deleteOne({_id: req.params.id}, function(err){
            if (err) {
                console.log('Delete error', err);
            }

            req.flash('Success', 'Book Deleted');
            res.location('/manage/books');
            return res.redirect('/manage/books');
        });

    });

    router.get('/categories', function(req, res){
        Category.find({}, function(err, categories){
            if (err){
                console.log(err);
            }

            var model = {
                categories: categories
            };
            res.render('manage/categories/index', model);
        });

    });

    router.get('/categories/add', function(req, res){
        res.render('manage/categories/add');
    });

    router.post('/categories/add', function(req, res){
        var name = req.body.name && req.body.name.trim();

        if(name == '' ){
            req.flash('error', 'Name is required');
            res.location('/manage/categories/add');
            return res.redirect('/manage/categories/add');
        }

        var newCategory = new Category({
            name: name
        });

        newCategory.save(function(err){
            if(err){
                console.log('Category not saved', err);
            }

            req.flash('Success', 'Category added successfully');
            res.location('/manage/categories');
            return res.redirect('/manage/categories');
        });
    });

    router.get('/categories/edit/:id', function(req, res){
        Category.findOne({_id: req.params.id}, function(err, category){
            if(err){
                console.log(err);
            }
            var model = {
                category: category
            };
            res.render('manage/categories/edit', model);
        });
    });

    router.post('/categories/edit/:id', function(req, res){
        var name = req.body.name && req.body.name.trim();

        if(name == '' ){
            req.flash('error', 'Name is required');
            //res.location('/manage/categories/add');
            return res.redirect('/manage/categories');
        }
        Category.update({_id: req.params.id}, {
            name: name
        }, function(err){
            if(err){
                console.log(err);
            }

            req.flash('Success', 'Category was updated successfully');
            res.location('/manage/categories');
            return res.redirect('/manage/categories');
        });
    });


    router.post('/categories/delete/:id', function(req, res){
        Category.deleteOne({_id: req.params.id}, function(err){
            if (err) {
                console.log('Delete error', err);
            }

            req.flash('Success', 'Category Deleted');
            res.location('/manage/categories');
            return res.redirect('/manage/categories');
        });

    });
};
