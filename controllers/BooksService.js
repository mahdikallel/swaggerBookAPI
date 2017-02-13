'use strict';
var crypto = require('crypto');


module.exports = function () {
    return {
        bookList: [],
        /*
         * Save the movie inside the "db".
         */
        saveBook(movie) {
            movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.bookList.push(movie);

            for (var i = 0; i < this.bookList.length; i++) {
                console.log(this.bookList[i].author);
            }
            return 1;
        },
        find(idBook){
            if(idBook) {
                return this.bookList.find(element => {
                        return element.id == idBook;
            });
            }else {
                return this.bookList;
            }
        },
        getBooksList(req, res, next){
            if (this.bookList.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(this.bookList));
            } else {
                res.end(JSON.stringify({List: "empty"}));
            }
        },
        updateBook(book,idBook){
            var bookIndex = this.bookList.findIndex(element => {
                    return element.id === idBook;
        });

            if(bookIndex !== -1){
                this.bookList[bookIndex].title = book.title;
                this.bookList[bookIndex].author = book.author;
                return 1;
            }
            else {
                return 0;
            }
        },
        delBook(idBook){
            var bookIndex = this.bookList.findIndex(element => {
                    return element.id === idBook;
        });
            if(bookIndex !== -1){
                this.bookList.splice(bookIndex,1);
                return 1;
            }
            else {
                return 0;
            }

        }
    }

};
