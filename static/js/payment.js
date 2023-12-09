// payment.js

document.addEventListener("DOMContentLoaded", function () {
  var paymentForm = document.getElementById("paymentForm");
  var nameInput = document.getElementById("name");
  var phoneInput = document.getElementById("phone");
  var submitButton = document.getElementById("submitButton");
  var paymentMessage = document.getElementById("paymentMessage");
  var countdownTimer = document.getElementById("timer");

  function checkInputs() {
    var nameValue = nameInput.value.trim();
    var phoneValue = phoneInput.value.trim();

    if (nameValue !== "" && phoneValue.match(/^0[0-9]{9}$/)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function updateTimer(seconds) {
    countdownTimer.textContent = seconds;
  }

  nameInput.addEventListener("input", checkInputs);
  phoneInput.addEventListener("input", checkInputs);

  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameValue = nameInput.value.trim();
    var phoneValue = phoneInput.value.trim();

    if (nameValue === "" || !phoneValue.match(/^0[0-9]{9}$/)) {
      alert("Please fill in all fields correctly.");
    } else {
      initiatePayment(nameValue);
    }
  });
});

// Replace with your Paystack public key
const paystackPublicKey = "pk_live_25696ca3cb90de5a5a7d000f5979a104972180ed";

// Function to initiate the payment
// payment.js

// ...

function initiatePayment(nameValue) {
  const phoneInput = document.getElementById("phone");
  const phoneValue = phoneInput.value.trim();

  if (!phoneValue.match(/^0[0-9]{9}$/)) {
    alert("Please enter a valid phone number.");
    return;
  }

  fetch("/api/initiate-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue,
      phone: phoneValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const transactionId = data.transaction_id;

      var handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: "desmondantwi07@gmail.com",
        amount: 5000,
        currency: "GHS",
        ref: `payment_${transactionId}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: phoneValue,
            },
          ],
        },
        callback: function (response) {
          if (response.status === "success") {
            fetch(`/api/success?transaction_id=${transactionId}`)
              .then((response) => response.json())
              .then((data) => {
                const name = data.name;
                const profile = data.profile;
                alert(
                  `Payment successful! Name: ${name}, Profile: ${profile.name}, Passcode: ${profile.passcode}`
                );
              })
              .catch((error) => {
                console.error("Error fetching success data:", error);
              });
          } else {
            alert("Payment failed. Please try again.");
          }
        },
      });

      handler.openIframe();
    })
    .catch((error) => {
      console.error("Error initiating payment:", error);
    });
}

// ...
