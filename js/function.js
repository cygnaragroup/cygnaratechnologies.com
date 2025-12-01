(function ($) {
  "use strict";

  var $window = $(window);

  // TODO: Set your EmailJS service and template IDs here
  // Replace with your actual IDs from the EmailJS dashboard.
  var EMAILJS_SERVICE_ID = "service_gmail_ep";
  var EMAILJS_TEMPLATE_ID = "template_bnh9fu4";

  // Simple email validation helper
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Notify form handler
  $(function () {
    var $form = $("#notify-form");
    var $message = $("#notify-message");

    if (!$form.length) {
      return;
    }

    $form.on("submit", function (e) {
      e.preventDefault();

      var $nameInput = $form.find('input[name="name"]');
      var $emailInput = $form.find('input[name="email"]');
      var name = $.trim($nameInput.val());
      var email = $.trim($emailInput.val());
      var $button = $form.find(".new-btn");
      var originalHtml = $button.html();

      // clear previous state
      $message.removeClass("error success show").text("");

      if (!name) {
        $message
          .addClass("error show")
          .text("Please enter your name.");
        $nameInput.focus();
        return;
      }

      if (!email || !isValidEmail(email)) {
        $message
          .addClass("error show")
          .text("Please enter a valid email address.");
        $emailInput.focus();
        return;
      }

      // show loading state
      $button.prop("disabled", true).addClass("loading").html("Sending...");

      // Use EmailJS to send the notification email
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name: name,
          email: email,
        })
        .then(
          function () {
            $button
              .prop("disabled", false)
              .removeClass("loading")
              .html(originalHtml);
            $message
              .addClass("success show")
              .text("Thanks! We’ll notify you as soon as we launch.");
            $form[0].reset();
          },
          function () {
            $button
              .prop("disabled", false)
              .removeClass("loading")
              .html(originalHtml);
            $message
              .addClass("error show")
              .text(
                "Sorry, something went wrong. Please try again in a moment."
              );
          }
        );
    });
  });
})(jQuery);