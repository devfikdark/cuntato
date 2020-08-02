$(function() {
  let projectToken = $("span").attr("id");
  getProjectDomain(projectToken);
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
          showToast("Nothing here ...", "cyan darken-3");
      } else {
        generateTable(res.getData);
        downloadData();
        showToast("Data load success...", "green darken-3");
      }
    })
    .fail(() => {
      showToast("Problem Load projects!!!", "red darken-3");
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
