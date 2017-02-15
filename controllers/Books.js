'use strict';

var url = require('url');

var BooksService = require('./BooksService')();
module.exports = {saveBook, getBookById, getBooksList, updateBook, patchBook, delBook};


function getBooksList(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    BooksService.getBooksList(req.swagger.params, res, next);
}

function saveBook(req, res, next) {


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    console.log("request.method ------" + req.method);
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({success: BooksService.saveBook(req.body), description: "Books added"}));

    //req.post('/user').set('Content-Type', 'application/json').send('{"name":"tj","pet":"tobi"}').end();
    //res.end();
}


function updateBook(req, res, next) {

    var id = req.swagger.params.id.value;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (BooksService.find(id)) {
        res.end(JSON.stringify({success: BooksService.updateBook(req.body, id), description: "Books updated"}));
    } else {
        res.end(JSON.stringify({message: "Book undefined "}));
    }
}


function getBookById(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var book = BooksService.find(id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (book) {
        res.end(JSON.stringify(book));
    } else {
        res.end(JSON.stringify({book: "not found"}));
    }
}


function patchBook(req, res, next) {

    var id = req.swagger.params.id.value;
    var book = BooksService.find(id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (BooksService.updateBook(req.body, id) === 1) {
        res.end(JSON.stringify({success: BooksService.updateBook(req.body, id), description: "Book patched"}));
    } else {
        res.end(JSON.stringify({message: "Book undefined "}));
    }
}


function delBook(req, res, next) {

    var id = req.swagger.params.id.value;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    if (BooksService.find(id)) {
        res.end(JSON.stringify({success: BooksService.delBook(id), description: "Book deleted"}));
    } else {
        res.end(JSON.stringify({message: "Book undefined "}));
    }
}


/* var book = BooksService.find(id);

 console.log("req.swagger.params.id.value ---------" + req.swagger.params.id.value);
 console.log("book ---------" + book.title);
 console.log("book ---------" + book.author);*/


/* console.log("----------------Attribute to patch-------------------");
 console.log("req.body.id ---------" + req.body.id);
 console.log("req.body.title ---------" + req.body.title);
 console.log("req.body.author ---------" + req.body.author);

 console.log("----------------Old book-------------------");

 console.log("book ---------" + book.id);
 console.log("book ---------" + book.title);
 console.log("book ---------" + book.author);*/
//console.log("swagger id --" + req.swagger.params.id.value);