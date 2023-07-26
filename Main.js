
const cartItems = {};


$(document).ready(function() {
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000);
}

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  if (query) {

      $('#search-input').val(query).trigger('submit');
    }


  $('#search-form').on('submit', function(e) {
    e.preventDefault();

    var query = $('#search-input').val().toLowerCase();

    $('.product').hide();

    $('.product').each(function() {
      var title = $(this).find('h2').text().toLowerCase();

      if (title.includes(query)) {
        $(this).show();
      }
    });

    updateProductCounter();
     history.pushState({ query }, '', `?q=${encodeURIComponent(query)}`);
  });


  $('.filter-menu input[type="radio"]').on('change', function() {
    var selectedCategory = $('input[name="category"]:checked').val();
    var selectedGender = $('input[name="gender"]:checked').val();

    $('.product').hide();

    if (selectedCategory === "all" && selectedGender === "all") {
      $('.product').show();
    } else {
      $('.product').each(function() {
        var productCategory = $(this).data('tags');
        var productGender = $(this).data('gender');

        if ((selectedCategory === "all" || productCategory === selectedCategory) &&
            (selectedGender === "all" || productGender === selectedGender)) {
          $(this).show();
        }
      });
    }

    updateProductCounter();
  });


  $(function() {
    var products = $('.product');
    var minPrice = Infinity;
    var maxPrice = -Infinity;

    products.each(function() {
      var price = parseInt($(this).find('p').text().substring(1));
      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    });

    $('#min-price').text('$' + minPrice);
    $('#max-price').text('$' + maxPrice);

    $("#slider-range").slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [minPrice, maxPrice],
      slide: function(event, ui) {
        $('#min-price').text('$' + ui.values[0]);
        $('#max-price').text('$' + ui.values[1]);
        filterProducts(ui.values[0], ui.values[1]);
        updateProductCounter();
      }
    });

    function filterProducts(min, max) {
      var selectedCategory = $('input[name="category"]:checked').val();
      var selectedGender = $('input[name="gender"]:checked').val();

      products.each(function() {
        var price = parseInt($(this).find('p').text().substring(1));
        var productCategory = $(this).data('tags');
        var productGender = $(this).data('gender');

        if (price >= min && price <= max &&
            (selectedCategory === "all" || productCategory === selectedCategory) &&
            (selectedGender === "all" || productGender === selectedGender)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }


    updateProductCounter();
  });

 function updateProductCounter() {
   var selectedCategory = $('input[name="category"]:checked').val();
   var selectedGender = $('input[name="gender"]:checked').val();
   var visibleProducts = $('.product:visible').not('.cart-item');

   var count = visibleProducts.filter(function() {
     var productCategory = $(this).data('tags');
     var productGender = $(this).data('gender');

     return (
       (selectedCategory === "all" || productCategory === selectedCategory) &&
       (selectedGender === "all" || productGender === selectedGender)
     );
   }).length;

   $('#counter').text(count + " Products");
 }
const navBar = document.querySelector("nav");
const menuBtns = document.querySelectorAll(".menu-icon");
const overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});


  let cartTotal = 0;
   let cartItemCount = 0;


  function updateCartCount() {
    const cartCount = Object.keys(cartItems).length;
    $('.cart-count').text(cartCount);
    $('.quantity').text(cartItemCount);
  }


   function calculateTotalItemsInCart() {
     cartItemCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
     $('.quantity').text(cartItemCount);
   }


  function updateCartTotal() {
    cartTotal = Object.values(cartItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
    $('#cart-total').text(`Subtotal: $${cartTotal.toFixed(2)}`);
  }
function showPopupNotification(itemName) {
      const popupNotification = $('#popup-notification');
      const popupText = $('#popup-text');
      popupText.text(`You bought "${itemName}"!`);
      popupNotification.removeClass('hidden');
      setTimeout(() => {
        popupNotification.addClass('hidden');
      }, 3000);
    }


  $('.add-to-cart-btn').on('click', function() {
    const productDiv = $(this).closest('.product');
    const productId = productDiv.data('product-id');
    const productName = productDiv.find('h2').text();
    const productImage = productDiv.find('img').attr('src');


    const productPrice = parseFloat(productDiv.find('p').text().substring(1));
    const quantity = parseInt($(this).data('quantity'));

    addToCart(productId, productName, productImage, productPrice, quantity);
     showPopupNotification(productName);
  });



 function addToCart(productId, productName, productImage, productPrice, quantity) {
   if (cartItems[productId]) {
     cartItems[productId].quantity += quantity;
     if (cartItems[productId].quantity <= 0) {
       delete cartItems[productId];
     }
   } else {
     cartItems[productId] = {
       name: productName,
       price: productPrice,
       quantity: quantity,
       image: productImage,
     };
   }
   updateCartCount();
   calculateTotalItemsInCart();
   updateCartTotal();
   updateCartItemsDisplay();

   localStorage.setItem('cartItems', JSON.stringify(cartItems));
 }


    function updateCartItemsDisplay() {
      const cartItemsDiv = $('#cart-items');
      cartItemsDiv.empty();

      for (const productId in cartItems) {
        const { name, price, quantity, image } = cartItems[productId];

        const itemHtml = `
          <div class="cart-item">
            <img src="${image}" alt="${name}" class="item-image">
            <span class="item-name">${name}</span>
            <span class="item-price">$${(price * quantity).toFixed(2)}</span>

          </div>
           <div class="item-quantity">
                        <button class="decrease-quantity" data-product-id="${productId}">-</button>
                        <span class="quantity-value">${quantity}</span>
                        <button class="increase-quantity" data-product-id="${productId}">+</button>
                      </div>
        `;

        cartItemsDiv.append(itemHtml);
      }


      $('.decrease-quantity').off().on('click', function() {
        const productId = $(this).data('product-id');
        const product = cartItems[productId];
        if (product) {
          addToCart(productId, product.name, product.image, product.price, -1);
        }
        calculateTotalItemsInCart();
      });

      $('.increase-quantity').off().on('click', function() {
        const productId = $(this).data('product-id');
        const product = cartItems[productId];
        if (product) {
          addToCart(productId, product.name, product.image, product.price, 1);
        }
      });
        calculateTotalItemsInCart();
      }


  if (localStorage.getItem('cartItems')) {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    for (const productId in storedCartItems) {
      const { name, price, quantity, image } = storedCartItems[productId];
      cartItems[productId] = { name, price, quantity, image };
    }


    updateCartCount();
     calculateTotalItemsInCart();
    updateCartTotal();
    updateCartItemsDisplay();

    }

});
function handlePopState() {

  $('#search-input').val('');


  $('.product').show();


  updateProductCounter();
  updateCartItemsDisplay();
}


window.addEventListener('popstate', handlePopState);