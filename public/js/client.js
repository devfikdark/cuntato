$(function() {
  $("main").hide();
  getDataFromAPI();
  submitData();
});

function getDataFromAPI() {
  let apiUrl = "https://magic-node.herokuapp.com/api/formtotable";
  $.get(apiUrl, function() {})
    .done((res) => {
      makeTable(res);
      showToast("Data load ...", "green darken-3");
      $('.mainLoader').hide();
      $("main").show();
    })
    .fail((err) => {
      console.log(err)
      showToast("Somthing Wrong here!!!", "red darken-3")
    });
}

function submitData() {
  $("#myBtn").click(function() {
    let formData = {
      name: $("#myName").val(),
      email: $("#myEmail").val(),
      message: $("#myMessage").val()
    }    

    $("#myName").val("");
    $("#myEmail").val("");
    $("#myMessage").val("");

    let apiUrl = "https://magic-node.herokuapp.com/api/formtotable";
    $.post(apiUrl, formData, function() {})
      .done((res) => {
        makeTable(res);
        showToast("Successfully Create Data", "green darken-3");
      })
      .fail(() => {
        showToast("Somthing Wrong here!!!", "red darken-3")
      });
  });
}

function makeTable(res) {
  let str = "<table class='highlight'><tr><th>Name</th><th>Email</th>"
    str += "<th>Message</th></tr><tbody>";
  for (let i = res.length - 1; i >= 0; i--) {
    str += "<tr><td>"+ res[i].name +"</td>"
    str += "<td>"+ res[i].email +"</td>"
    str += "<td>"+ res[i].message +"</td></tr>"
  }
  str += "</tbody></table>"
  $("#tableID").html(str);
}

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}