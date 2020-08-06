$(function () {
  $(".modal").modal();
  $(".collapsible").collapsible();
  $(".tabs").tabs();
  $(".dropdown-trigger").dropdown({
    coverTrigger: false,
    constrainWidth: false,
    autoTrigger: true,
  });

  $(window).on("load", function () {
    $(".progress").hide();
  });
});
