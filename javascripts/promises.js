

    /* Here's some pseudo-code for how it should look once you
       start using promises

    getBookTypes()
      .then(function(types) {
        getBooks(types);
      })
      .then(function(books) {
        // add the type key to each book that is currently
        // being performed in the get-books file

        // then bind the template to the data 
        // (p.s. make the handlebar template a module dependency)
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ books:bookArray }));
        });

      })
     */

  // ====================

  requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "q", "hbs", "bootstrap", "get-books", "get-types"], 
  function($, q, Handlebars, bootstrap, getBooks, getBookTypes) {

    // books.getBooks(function(bookArray) {
    //   require(['hbs!../templates/books'], function(bookTpl) {
    //     $("#bookList").html(bookTpl({ books:bookArray }));
    //   });
    // }); 
    var firebaseTypes;


    getBookTypes.getBookTypes()
      .then(function(types){
        firebaseTypes = types;
        console.log(types);
        console.log(firebaseTypes);
        // console.log("getBooks", getBooks);
        return getBooks.getBooks(types);

      })
      .then(function(books) {
        types = firebaseTypes;
        //below is working -object of books
        console.log(books);


        types = Object.keys( firebaseTypes ).map(key=> types[ key ]);
        books = Object.keys( books ).map(key => books [ key ]);
        // console.log("test");

        var books = books.map(book=> {
          book.type=_.find(types, { id:book.booktype}).label;
          return book;
        })
        // still working
        // console.log("books", books);
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").append(bookTpl({ books: books }));
        });

    });

//      
}) 
  // =======================================
// example 
// /*
//   Now we use those Promises to describe the order of execution, 
//   and how data flows between each one.
//  */
// firstXHR()
//   .then(function(data1) {
//     return secondXHR(data1);
//   })
//   .then(function(data2) {
//     return thirdXHR(data2);
//   })
//   .done();
