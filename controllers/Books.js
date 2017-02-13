'use strict';

var url = require('url');

var BooksService = require('./BooksService')();
module.exports = {saveBook, getBookById, getBooksList, updateBook, patchBook,delBook};

/*module.exports.getBookById = function getBookById (req, res, next) {
 console.log("getBookById   req.swagger.params ---------" + req.swagger.params);
 Books.getBookById(req.swagger.params, res, next);
 };

 module.exports.getBooksList = function getBooksList (req, res, next) {
 console.log("getBooksList  req.swagger.params ---------" + req.swagger.params);
 Books.getBooksList(req.swagger.params, res, next);
 };

 };*/


/*
 function getBookById(req, res, next) {
 Books.getBookById(req.swagger.params, res, next);
 }*/

function getBooksList(req, res, next) {
    BooksService.getBooksList(req.swagger.params, res, next);
}

function saveBook(req, res, next) {

    console.log("req.body ---------" + req.body.id);
    console.log("req.body ---------" + req.body.title);
    console.log("req.body ---------" + req.body.author);
    res.end(JSON.stringify({success: BooksService.saveBook(req.body), description: "Books added"}));
    //res.status(200).send();
}


function updateBook(req, res, next) {

    console.log("req.body ---------" + req.body.id);
    console.log("req.body ---------" + req.body.title);
    console.log("req.body ---------" + req.body.author);
    var id = req.swagger.params.id.value;
    if (BooksService.find(id)) {
        res.end(JSON.stringify({success: BooksService.updateBook(req.body, id), description: "Books updated"}));
    } else {
        res.end(JSON.stringify({message: "Book undefined "}));
    }
}


function getBookById(req, res, next) {
    console.log("swagger id --" + req.swagger.params.id.value);
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var book = BooksService.find(id);
    if (book) {
        res.end(JSON.stringify(book));
    } else {
        res.end(JSON.stringify({book: "not found"}));
    }
}


function patchBook(req, res, next) {

    console.log("----------------Attribute to patch-------------------");
    console.log("req.body.id ---------" + req.body.id);
    console.log("req.body.title ---------" + req.body.title);
    console.log("req.body.author ---------" + req.body.author);

    console.log("----------------Old book-------------------");
    var id = req.swagger.params.id.value;
    var book = BooksService.find(id);

    console.log("book ---------" + book.id);
    console.log("book ---------" + book.title);
    console.log("book ---------" + book.author);
    if (BooksService.updateBook(req.body, id) === 1) {
     res.end(JSON.stringify({success: BooksService.updateBook(req.body, id), description: "Book patched"}));
     } else {
     res.end(JSON.stringify({  message: "Book undefined "}));
     }
}



function delBook(req, res, next) {
    var id = req.swagger.params.id.value;
   /* var book = BooksService.find(id);

   console.log("req.swagger.params.id.value ---------" + req.swagger.params.id.value);
    console.log("book ---------" + book.title);
    console.log("book ---------" + book.author);*/
    if (BooksService.find(id)) {
        res.end(JSON.stringify({success: BooksService.delBook(id), description: "Book deleted"}));
    } else {
        res.end(JSON.stringify({  message: "Book undefined "}));
    }
}


