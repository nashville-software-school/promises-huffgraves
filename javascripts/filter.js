define(function(require) {
  var _ = require("lodash");
  var q = require("q");

  return {

    byGenre : function() {

      var selected = $("#genres").val();

      if (selected === "All") {
        $("#bookList > div").show();
      } else {
      $("#bookList > div").hide();
      $("#bookList > div." + selected + "").show();
      }

    }//end genre


  }//end return
});//end require