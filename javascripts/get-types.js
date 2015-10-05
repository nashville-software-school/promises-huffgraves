


define(function(require) {
	var Q = require("q");
	var _= require("lodash");
  

  return {

        getBookTypes: function() {
            var deferred = Q.defer();

            $.ajax({url: "https://nss-book-store.firebaseio.com/booktypes.json"})
            // XHR was successful
            .done(function(firebaseTypes) {
                // Now we can resolve the promise and send the data
                // firebaseTypes = Object.keys(firebaseTypes).map(key => firebaseTypes[key]);
                deferred.resolve(firebaseTypes);        
            })

            // XHR failed for some reason
          .fail(function(xhr, status, error) {
            // Since the call failed, we have to reject the promise
            deferred.reject(error);
          })

          return deferred.promise;
        }
    }
})




