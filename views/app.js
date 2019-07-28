// // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });

// Activated at click to leave note:
$('.note-starter').on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "GET",
      url: "/api/articles/" + thisId
  }).then(function(data){
      console.log(data.note);
      if(data.note){
          console.log(data.note)
          $('.existing-note').removeClass('hide');
          $('.noted').append(`<h4>${data.note.title}</h4>`)
          $('.noted').append(`<p>${data.note.body}</p>`)
      }
  }) 
  // When you click the savenote button
  $('.post-notes').on("click", function() {
      Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
         method: "POST",
          url: "/api/articles/" + thisId,
          data: {
             title: $(`#title-${thisId}`).val(),
              // Value taken from note textarea
             body: $(`#body-${thisId}`).val(),
          }
      })
      // With that done
      .then(function(data) {
          Log the response
         console.log(data);
      });
   })
})