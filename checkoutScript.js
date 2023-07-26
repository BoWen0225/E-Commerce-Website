
$(document).ready(function() {


const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
var cardNumber = $("#card-number").val();
    var cardholderName = $("#cardholder-name").val();
    var expirationDate = $("#expiration-date").val();
    var securityCode = $("#security-code").val();
    var billingAddress = $("#billing-address").val();

  $("#billing-info-btn").on("click", function(ev) {
    ev.preventDefault();
    var email = $("#email").val();
    var countryRegion = $("#country-region").val();
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var province = $("#province").val();
    var postalCode = $("#postal-code").val();
    var phone = $("#phone").val();


    var validationError = validateInputs(email, countryRegion, firstName, lastName, address, city, province, postalCode, phone);
    if (validationError) {
      displayErrorMessage(validationError);
    } else {

      console.log("Email: " + email);
      console.log("Country/Region: " + countryRegion);
      console.log("First Name: " + firstName);
      console.log("Last Name: " + lastName);
      console.log("Address: " + address);
      console.log("City: " + city);
      console.log("Province: " + province);
      console.log("Postal Code: " + postalCode);
      console.log("Phone: " + phone);


      clearErrorMessage();
    }
  });

  // Validation function for all inputs
function validateInputs(email, countryRegion, firstName, lastName, address, city, province, postalCode, phone) {
  var errorMessage = "";

  // Validate Email
  if (!email) {
    errorMessage = "Email is required.";
    $("#error-email").text(errorMessage);
    $("#error-email").show();
  } else if (!validateEmail(email)) {
    errorMessage = "Please enter a valid email address.";
    $("#error-email").text(errorMessage);
    $("#error-email").show();
  } else {
    $("#error-email").text("");
    $("#error-email").hide();
  }

  // Validate Country/Region
  if (!countryRegion) {
    errorMessage = "Country/Region is required.";
    $("#error-country-region").text(errorMessage);
    $("#error-country-region").show();
  } else {
    $("#error-country-region").text("");
    $("#error-country-region").hide();
  }

  // Validate First Name
  if (!firstName) {
    errorMessage = "First Name is required.";
    $("#error-first-name").text(errorMessage);
    $("#error-first-name").show();
  } else {
    $("#error-first-name").text("");
    $("#error-first-name").hide();
  }

  // Validate Last Name
  if (!lastName) {
    errorMessage = "Last Name is required.";
    $("#error-last-name").text(errorMessage);
    $("#error-last-name").show();
  } else {
    $("#error-last-name").text("");
    $("#error-last-name").hide();
  }

  // Validate Address
  if (!address) {
    errorMessage = "Address is required.";
    $("#error-address").text(errorMessage);
    $("#error-address").show();
  } else {
    $("#error-address").text("");
    $("#error-address").hide();
  }

  // Validate City
  if (!city) {
    errorMessage = "City is required.";
    $("#error-city").text(errorMessage);
    $("#error-city").show();
  } else {
    $("#error-city").text("");
    $("#error-city").hide();
  }

  // Validate Province
  if (!province) {
    errorMessage = "Province is required.";
    $("#error-province").text(errorMessage);
    $("#error-province").show();
  } else {
    $("#error-province").text("");
    $("#error-province").hide();
  }

  // Validate Postal Code
  if (!postalCode) {
    errorMessage = "Postal Code is required.";
    $("#error-postal-code").text(errorMessage);
    $("#error-postal-code").show();
  } else {
    $("#error-postal-code").text("");
    $("#error-postal-code").hide();
  }

  // Validate Phone
  if (!phone) {
    errorMessage = "Phone is required.";
    $("#error-phone").text(errorMessage);
    $("#error-phone").show();
  } else if (!validatePhone(phone)) {
    errorMessage = "Please enter a valid phone number.";
    $("#error-phone").text(errorMessage);
    $("#error-phone").show();
  } else {
    $("#error-phone").text("");
    $("#error-phone").hide();
  }

  return errorMessage;
}

function validateInputsBilling() {
  var errorMessageBilling = "";

  const cardNumber = $("#card-number").val();
  const cardholderName = $("#cardholder-name").val();
  const expirationDate = $("#expiration-date").val();
  const securityCode = $("#security-code").val();
  const billingAddress = $("#billing-address").val();

  // Validate Card Number
  if (!cardNumber) {
    errorMessageBilling = "Card number is required.";
    $("#error-card-number").text(errorMessageBilling);
    $("#error-card-number").show();
  } else {
    $("#error-card-number").text("");
    $("#error-card-number").hide();
  }

  // Validate Cardholder Name
  if (!cardholderName) {
    errorMessageBilling = "Cardholder name is required.";
    $("#error-cardholder-name").text(errorMessageBilling);
    $("#error-cardholder-name").show();
  } else {
    $("#error-cardholder-name").text("");
    $("#error-cardholder-name").hide();
  }

  // Validate Expiration Date
  if (!expirationDate) {
    errorMessageBilling = "Expiration date is required.";
    $("#error-expiration-date").text(errorMessageBilling);
    $("#error-expiration-date").show();
  } else {
    $("#error-expiration-date").text("");
    $("#error-expiration-date").hide();
  }

  // Validate Security Code
  if (!securityCode) {
    errorMessageBilling = "Security code is required.";
    $("#error-security-code").text(errorMessageBilling);
    $("#error-security-code").show();
  } else {
    $("#error-security-code").text("");
    $("#error-security-code").hide();
  }

  // Validate Billing Address
  if (!billingAddress) {
    errorMessageBilling = "Billing address is required.";
    $("#error-billing-address").text(errorMessageBilling);
    $("#error-billing-address").show();
  } else {
    $("#error-billing-address").text("");
    $("#error-billing-address").hide();
  }

  return errorMessageBilling;
}

 // Function to check if all inputs in shipping-address fieldset are valid and completed
  function isShippingAddressValid() {
    const email = $("#email").val();
    const countryRegion = $("#country-region").val();
    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    const address = $("#address").val();
    const city = $("#city").val();
    const province = $("#province").val();
    const postalCode = $("#postal-code").val();
    const phone = $("#phone").val();

    return !validateInputs(email, countryRegion, firstName, lastName, address, city, province, postalCode, phone);
  }

   // Function to check if all inputs in shipping-address fieldset are valid and completed
    function isBillingInfoValid() {
      const cardNumber = $("#card-number").val();
      const cardholderName= $("#cardholder-name").val();
      const expirationDate = $("#expiration-date").val();
      const securityCode = $("#security-code").val();
      const billingAddress = $("#billing-address").val();

      return !validateInputsBilling(cardNumber,cardholderName,expirationDate,securityCode,billingAddress);
    }

     // Function to handle clicking on the "Confirm Order" link
      $("#billing-info a").on("click", function(ev) {
         ev.preventDefault();

         // Check if billing information is valid
         const errorMessageBilling = validateInputsBilling();
         if (errorMessageBilling) {
           // Display error message for invalid billing information
           displayErrorMessageBilling(errorMessageBilling);
         } else {
           // Proceed to the orderConfirm.html page
           window.location.href = "orderConfirm.html";
         }
       });


  // Function to enable the billing-info fieldset and remove blur effect
  function enableBillingInfo() {
    const billingFieldset = $("#billing-info");
    billingFieldset.removeClass("blurred");
    billingFieldset.find("input").prop("disabled", false);
  }

  // Function to check and enable billing-info fieldset when the billing information button is clicked
  $("#billing-info-btn").on("click", function(ev) {
    ev.preventDefault();

    if (isShippingAddressValid()) {
      enableBillingInfo();
      $(this).hide(); // Hide the billing information button
    } else {
      displayErrorMessage( errorMessage);
    }
  });

  // Check for changes in the shipping-address inputs and update the blur effect accordingly
  $("#shipping-address input[required]").on("input", function() {
    toggleBillingBlur();
  });


  // Email validation function
  function validateEmail(email) {
    // Perform email validation logic
    // You can use regular expressions or any other method to validate the email
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  // Phone number validation function
  function validatePhone(phone) {
    // Perform phone number validation logic
    // You can use regular expressions or any other method to validate the phone number
    var phoneRegex = /^[0-9]{10}$/; // Assumes 10-digit phone numbers without spaces or dashes
    return phoneRegex.test(phone);
  }

  // Display error message
  function displayErrorMessage(message) {
    var errorMessageElement = $(".error-message");
    errorMessageElement.text(message);
    errorMessageElement.show();
  }

  // Display error message
    function displayErrorMessageBilling(message) {
      var errorMessageElement = $(".error-message-billing");
      errorMessageElement.text(message);
      errorMessageElement.show();
    }



  // Clear error message
  function clearErrorMessage() {
    var errorMessageElement = $(".error-message");
    errorMessageElement.text("");
    errorMessageElement.hide();
  }
    // Function to display cart items on the checkout page
     function displayCartItems() {
       const cartItemsDiv = $('#cart-items-checkout');
       cartItemsDiv.empty();
       let cartSubtotal = 0;

       for (const productId in storedCartItems) {
         const { name, price, quantity, image } = storedCartItems[productId];
         cartSubtotal += price * quantity;

         const itemHtml = `
           <div class="cart-item">
             <img src="${image}" alt="${name}" class="item-image">
             <span class="item-name">${name}</span>
             <span class="item-price">$${(price * quantity).toFixed(2)}</span>
             <span class="item-quantity">x${quantity}</span>
           </div>
         `;

         cartItemsDiv.append(itemHtml);
       }

       // Calculate HST (13% HST for Ontario)
       const hstAmount = cartSubtotal * 0.13;
       const cartTotal = cartSubtotal + hstAmount;

       // Update the subtotal, HST, and total displays
       $('#cart-subtotal-checkout').text(`Subtotal: $${cartSubtotal.toFixed(2)}`);
       $('#cart-hst-checkout').text(`HST: $${hstAmount.toFixed(2)}`);
       $('#cart-total-checkout').text(`Total: $${cartTotal.toFixed(2)}`);
     }

    // Display the cart items on page load
    displayCartItems();

 // Function to handle applying the coupon code
  $("#apply-coupon-btn").on("click", function(ev) {
    ev.preventDefault();
    var couponCode = $("#coupon-code").val();

    // Validate the coupon code (you can add custom validation logic here)
    if (couponCode === "SUMMER23") {
      applyCoupon(couponCode);
    } else {

      displayCouponResult("Invalid coupon code. Please try again.");
    }
  });

  // Function to apply the coupon and update the cart total
  function applyCoupon(couponCode) {

    const cartTotal = calculateCartTotal();
    const discountedTotal = cartTotal * 0.75; // 25% discount

    // Display the updated total after applying the coupon
    displayCouponResult(`25% Off Coupon applied.`);
    updateCartTotal(discountedTotal);
  }

  // Function to calculate the cart total
  function calculateCartTotal() {

    const cartTotalString = $('#cart-total-checkout').text().replace('Total: $', '');
    return parseFloat(cartTotalString);
  }

   function updateCartTotal(newTotal) {
      $('#cart-total-checkout').text(`Total: $${newTotal.toFixed(2)}`);
    }

  // Function to display the result of applying the coupon
  function displayCouponResult(message) {
    var couponResultElement = $("#coupon-result");
     couponResultElement.css("font-size", "12px"); // Change the font size to 16px (you can adjust the size as needed)
    couponResultElement.text(message);
    couponResultElement.show();
  }


});
