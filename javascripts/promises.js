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
  function($, q, Handlebars, bootstrap, books, types) {

    /*books.getBooks(function(bookArray) {
      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books:bookArray }));
      });
    }); */
    var allBooks;

    books.getBooks()
      .then(function(firebaseBooks) {
        firebaseBooks = Object.keys( firebaseBooks ).map(key => firebaseBooks[ key ]);
        console.log('firebaseBooks', firebaseBooks);
        allBooks = firebaseBooks;
        return types.getTypes();
       })
      .then(function(firebaseTypes) {
        firebaseTypes = Object.keys( firebaseTypes ).map(key => firebaseTypes[ key ]);
        

        var bookArray = allBooks.map(book => {
          book.type = _.find(firebaseTypes, { id:book.booktype }).label;
        })
        
        //console.log('book', book);
        
        return book;
        });

        console.log('firebaseTypes', firebaseTypes);
        console.log('firebaseBooks', firebaseBooks);
      
      })

    
      
      
}) 

  
  

        
