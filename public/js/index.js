// Get references to page elements
// let $exampleText = $("#example-text");
let $littyName = $('#handle');
// let $exampleDescription = $("#example-description");
let $littyMessage = $('#message')
// let $submitBtn = $("#submit");
let $submitBtn = $('#sendIt');
let $exampleList = $("#example-list");



// The API object contains methods for each kind of request we'll make
let API = {
  // saveExample: function(example) {
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/examples",
  //     data: JSON.stringify(example)
  //   });
  // },
  saveExample: function(litty) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/littys",
      data: JSON.stringify(litty)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
let refreshExamples = function() {
  API.getExamples().then(function(data) {
    let $examples = data.map(function(example) {
      let $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      let $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      let $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
let handleFormSubmit = function(event) {
  event.preventDefault();

  let litty = {
    name: $littyName.html().trim(),
    message: $littyMessage.val().trim()
  };
  console.log('this is litty' + litty)

  if (!(litty.name && litty.message)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(litty).then(function() {
    console.log('submitted')
  });

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
let handleDeleteBtnClick = function() {
  let idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};
// $(document).on('ready', function(){ 
  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
// })
