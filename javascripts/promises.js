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
  ["jquery", "hbs", "bootstrap", "lodash", "q", "get-books", "get-types", "filter"],
  function($, Handlebars, bootstrap, _, q, books, types, filter) {

  var bookTypes;

  types.getTypes()
    .then(function(types){
      console.log('types', types);
      bookTypes = types;
      console.log('bookTypes', bookTypes);
      return books.getBooks();
    })
    .then(function(books){

      types = bookTypes;

      //console.log(types);
      //console.log(books);

      types = Object.keys(bookTypes).map(key => types[key]);
      books = Object.keys(books).map(key => books[key]);


      var bookArray = books.map(function(book) {
        console.log('book', book);
        book.type = _.find(types, {id:book.booktype}).label;
        // console.log('bookArray', bookArray);
        console.log('book', book);
        return book;
      })

      require(['hbs!../templates/genres'], function(genreTpl) {
        $("#bookList").prepend(genreTpl({types: types}));
      });

      require(['hbs!../templates/books'], function(bookTpl) {
        console.log('bookArray',bookArray);
        $("#bookList").append(bookTpl({books: bookArray}));
      });

    });



    $(document).on("change", "#genres", function(){

      filter.byGenre();

    })

  // firstXHR()
  // .then(function(data1) {
  //   return secondXHR(data1);
  // })
  // .then(function(data2) {
  //   return thirdXHR(data2);
  // })


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

  }
);
















/*requirejs.config({
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
  function($, q, Handlebars, bootstrap, books, types) {

    /*books.getBooks(function(bookArray) {
      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books:bookArray }));
      });
    }); 
    var allBooks;

    books.getBooks()
      .then(function(books) {
        books = Object.keys( books ).map(key => books[ key ]);
        console.log('books', books);
        allBooks = books;
        console.log('allBooks', allBooks);
        return types.getTypes();
      }).then(function(types) {
        types = Object.keys( types ).map(key => types[ key ]);
        console.log('types', types);
        // console.log('bookArray', bookArray);
        var bookArray = allBooks.map(book => {
          book.type = _.find(types, { id:book.booktype }).label;
        });
        
        console.log('book', book);
        return bookArray;
      });

        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ books: bookArray }));
         });
      
}) */