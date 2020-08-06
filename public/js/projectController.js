$(function() {
  let projectToken = $("span").attr("id");
  $("main").hide();
  getProjectDomain(projectToken);
  setProjectRelatedCode(projectToken);
  getProjectData(projectToken);
  updateDomainURL(projectToken);
});

function getProjectDomain(projectToken) {
  let url = "https://cuntato.herokuapp.com/api/get-project-domain?projectToken=";
    url += projectToken;
  $.get(url, function() {})
    .done((res) => {
      let str = res.data;
      $("#domain").val(str);
    })
    .fail(() => {
      showToast("Problem Load Domain URL!!!", "red darken-3");
    })
}

function setProjectRelatedCode(projectToken) {
  // HTML
  $("#codeHTML1").text("<input type='text' name='name' id='dataName'>");
  $("#codeHTML2").text("<input type='email' name='email' id='dataEmail'>");
  $("#codeHTML3").text("<input type='text' name='message' id='dataMessage'>");
  $("#codeHTML4").text("<input type='button' value='Send' id='btnSend'>");

  // jQuery
  let strjQuery = "$('#btnSend').click(function() {<br>";
    strjQuery += "let url = 'https://cuntato.herokuapp.com/api/project-data';<br>";
    strjQuery += "let data = {<br>";
    strjQuery += "'name': $('#dataName').val(),<br>";
    strjQuery += "'email': $('#dataEmail').val(),<br>";
    strjQuery += "'message': $('#dataMessage').val()<br>};<br>";
    strjQuery += "data = JSON.stringify(data);<br>";
    strjQuery += "let projectID = '"+ projectToken +"';<br>";
    strjQuery += "let currentURL = window.location.href;<br>";
    strjQuery += "$.post(url, { data , projectID: projectID, currentURL: currentURL }, function() {})<br>";
    strjQuery += ".done((res) => {<br>"
    strjQuery += "console.log('Send success ...');<br>"
    strjQuery += "})<br>.fail(() => {<br>"
    strjQuery += "console.log('Somthing wrong !!!')<br>"
    strjQuery += "})<br>});<br>"
  $("#codejQuery").html(strjQuery); 

  // copy code
  copyCode();
};

function copyCode() {
  $("#code-copy-btn").click(function () {
    let copyText = document.getElementById("codejQuery");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    showToast("Code copied to clipboard", "green darken-3");
  }); 
}

function getProjectData(projectToken) {
  let url = "https://cuntato.herokuapp.com/api/project-data?project=";
    url += projectToken;
  $.get(url, function() {})
    .done((res) => {
      if (res.getData === undefined || res.getData === null 
        || res.getData.length === 0) {
          let str = "<div class='center-align'> <img src='./img/svg/empty.svg'";
            str += "alt='empty' class='responsive-img no-msg-img' />";
            str += "<h3>No one has written yet!</h3></div>";
            $("#nothingData").html(str);
      } else {
        generateTable(res.getData);
        downloadData();
      }
      $(".circle-loader").hide();
      $("main").show();
    })
    .fail(() => {
      showToast("Problem Load messages!!!", "red darken-3");
    })
}

function generateTable(dataArray) {
  let str = "<table id='example' class='display'>";
    str += "<thead><tr><th>Name</th><th>Email</th>"
    str += "<th>Message</th><th>Send Date</th></tr></thead><tbody>";
    for (let i = dataArray.length - 1; i >= 0 ; i--) {
      str += "<tr><td>"+ dataArray[i].data.name +"</td>";
      str += "<td>"+ dataArray[i].data.email +"</td>";
      str += "<td>"+ dataArray[i].data.message +"</td>";
      str += "<td>"+ dataArray[i].data.createAt +"</td></tr>";
    }
    str += " </tbody></table>";
  $("#proTableID").html(str);  
}

function downloadData() {
  $('#example').DataTable({
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ]
  });
}

function updateDomainURL(projectToken) {
  $("#yesChange").click(function() {
    let newURL = $("#domain").val();
    let url = "https://cuntato.herokuapp.com/api/update-domain-url";
    $.post(url, 
      { projectToken: projectToken, newURL: newURL}, 
      function() {})
      .done((res) => {
        if (res.status === "ok") {
          showToast("Update your domain success ...", "green darken-3");
        } else {
          showToast("Somthing want wrong!!!", "red darken-3");
        }
      })
      .fail(() => {
        showToast("Somthing want wrong!!!", "red darken-3");
      })
    $('.modal').modal('close');  
    $("#domain").val("");
    getProjectDomain(projectToken);
  });

  $("#noChange").click(function() {
    $('.modal').modal('close');  
  });
}

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}
