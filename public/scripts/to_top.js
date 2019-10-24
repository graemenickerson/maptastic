// to_top.js
$(document).ready(function() {
  // Checks the scroll height of the window.
  $(document).scroll(function() {
    if ($(document).scrollTop() > 20) {
      $('#to-top').show();
    } else {
      $('#to-top').hide();
    }
  });
  // Scrolls the window to the top and toggles the new tweet form
  $("#to-top").click(function() {
    $("HTML, BODY").animate({ scrollTop: 0 }, 1000);
  });
});
