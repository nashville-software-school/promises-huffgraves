define(function(require) {
  var _ = require("lodash");
  var Q = require("q");


  return {

    getBooks: function() {
      var deferred = Q.defer();

      $.ajax({url: "https://nss-book-store.firebaseio.com/books.json"})
        // XHR was successful
        .done(function(firebaseBooks) {
          // Now we can resolve the promise and send the data
          firebaseBooks = Object.keys(firebaseBooks).map(key => firebaseBooks[key]);
          deferred.resolve(firebaseBooks);
        })
        
        .fail(function(xhr, status, error) {
          // Since the call failed, we have to reject the promise
          deferred.reject(error);
        })
      
        return deferred.promise;  
        
      }

    }        
      
})

