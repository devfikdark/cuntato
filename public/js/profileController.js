$(function() {
  let userID = $("span").attr("id");
  getProjectCount(userID);
});

function getProjectCount(userID) {
  let url = "https://cuntato.herokuapp.com/api/get-project-count?userID=";
    url += userID;
  $.get(url, function() {})
    .done((res) => {
      let str = res.data;
      $("#projectCount").html(str);
    })
}