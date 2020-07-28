$(function () {
  $(".modal").modal();
  $(".dropdown-trigger").dropdown({
    coverTrigger: false,
    constrainWidth: false,
    autoTrigger: true,
  });

  $("#copy-btn").click(function () {
    var copyText = document.getElementById("project-credential");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    showMessage("Code copied to clipboard");
  });

  function showMessage(message) {
    M.toast({ html: message, classes: "rounded brown" });
  }
});
