$(function() {
  let projectToken = $("span").attr("id");
  getProjectData(projectToken);
});

function getProjectData(projectToken) {
  let url = "https://cuntato.herokuapp.com/api/project-data?project=";
    url += projectToken;
  $.get(url, function() {})
    .done((res) => {
      generateTable(res.getData);
      console.log(res);
      showToast("Data load success...", "green darken-3");
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
      str += "<td>"+ dataArray[i].data.message +"</td></tr>";
    }
    str += " </tbody></table>";
  $("#proTableID").html(str);  
}

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}