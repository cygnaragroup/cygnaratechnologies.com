(function ($) {
  "use strict";

  var $window = $(window);

  // Helper to open user's email client using a mailto link
  function sendEmailWithMailto(recipient, subject, body) {
    var mailtoLink =
      "mailto:" +
      encodeURIComponent(recipient) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.open(mailtoLink, "_blank");
  }

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

      // Build a simple email subject and body (plain text; mailto will encode)
      var subject = "New Cygnara website notification request";
      var body =
        "A new visitor has requested to be notified when the site launches.\n\n" +
        "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n\n" +
        "You can reply directly to this email address.";

      // Open the user's email client with a pre-filled message
      // TODO: replace with your preferred recipient address
      sendEmailWithMailto("epsooraj4@gmail.com", subject, body);

      $message
        .addClass("success show")
        .text("Your email client should open in a moment.");
    });
  });
})(jQuery);