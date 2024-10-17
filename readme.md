// // Check login status on page load
// window.onload = function() {
//     const username = localStorage.getItem('username');
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//     // Redirect to login if not logged in
//     if (!username) {
//         window.location.href = 'login.html'; // Redirect to a login page if not logged in
//     } else {
//         document.getElementById('welcomeDiv').style.display = 'block';
//         document.getElementById('userEmail').innerText = username;
//         loadCartItems(cartItems);
//     }
// };

// // Show hidden form and attach form submission handler
// document.getElementById("loginbtn").onclick = function() {
//     document.getElementById('hiddenform').style.display = 'block';
//     document.getElementById('welcomeDiv').style.display = 'none';

//     document.getElementById('hiddenform').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent form submission

//         // Get input values
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('pwd').value;
//         const username = document.getElementById('username').value;

//         // Validate inputs
//         if (email && password && username) {
//             // Save to Local Storage
//             localStorage.setItem('email', email);
//             localStorage.setItem('password', password); // Not recommended to store passwords in Local Storage
//             localStorage.setItem('username', username);

//             // Hide form, display welcome message
//             document.getElementById('hiddenform').style.display = 'none';
//             document.getElementById('welcomeDiv').style.display = 'block';
//             document.getElementById('userEmail').innerText = username;

//         } else {
//             alert('Please fill out all fields.');
//         }
//     });
// };

// // Logout functionality
// document.getElementById('logoutBtn').onclick = function() {
//     // Clear Local Storage and reset interface
//     localStorage.clear();
//     window.location.href = 'login.html'; // Redirect to login page
// };

// // Cancel button functionality
// document.getElementById('cancelbtn').onclick = function() {
//     document.getElementById('welcomeDiv').style.display = 'none';
//     document.getElementById('hiddenform').style.display = 'none';
// };

// // Handle welcome message display when clicking user icon
// document.getElementById("usericon").onclick = function() {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//         document.getElementById('welcomeDiv').style.display = 'block';
//         document.getElementById('hiddenform').style.display = 'none';
//         document.getElementById('userEmail').innerText = storedUsername;
//     } else {
//         alert('No user logged in.');
//     }
// };

// // Hide welcomeDiv and hiddenform when clicking outside
// document.addEventListener('click', function(event) {
//     const welcomeDiv = document.getElementById('welcomeDiv');
//     const hiddenform = document.getElementById('hiddenform');
//     const userIcon = document.getElementById('usericon');

//     if (!welcomeDiv.contains(event.target) && !hiddenform.contains(event.target) && event.target !== userIcon) {
//         welcomeDiv.style.display = 'none';
//         hiddenform.style.display = 'none';
//     }
// });

// // Cart functionality
// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close-cart");

// // Open cart
// cartIcon.onclick = () => {
//     cart.classList.add("active");
// };

// // Close cart
// closeCart.onclick = () => {
//     cart.classList.remove("active");
// };

// // Load cart items from Local Storage
// function loadCartItems(cartItems) {
//     cartItems.forEach(item => {
//         addProductToCart(item.title, item.price, item.productImg);
//     });
// }

// // Ready function
// if (document.readyState == "loading") {
//     document.addEventListener("DOMContentLoaded", ready);
// } else {
//     ready();
// }

// // Ready function
// function ready() {
//     // Remove product
//     var removeItems = document.getElementsByClassName("cart-remove");
//     console.log(removeItems);
//     for (var i = 0; i < removeItems.length; i++) {
//         var button = removeItems[i];
//         button.addEventListener("click", removeCartItem);
//     }

//     // Quantity changes
//     var quantityInputs = document.getElementsByClassName("cart-quantity");
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i];
//         input.addEventListener("change", QuantityChanged);
//     }

//     // Add to cart
//     var addCart = document.getElementsByClassName("add-cart");
//     for (var i = 0; i < addCart.length; i++) {
//         var button = addCart[i];
//         button.addEventListener("click", addCartClicked);
//     }

//     // Buy button
//     document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
// }

// /// Buy button clicked function
// function buyButtonClicked() {
//     alert("Your order is placed");
//     localStorage.removeItem('cart'); // Clear cart from Local Storage
//     const cartContent = document.getElementsByClassName("cart-content")[0];

//     while (cartContent.firstChild) {
//         cartContent.removeChild(cartContent.firstChild);
//     }

//     updateTotal();
// }

// /// Remove cart item function
// function removeCartItem(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.remove();
//     updateTotal();
//     saveCartToLocalStorage();
// }

// /// Add product to cart function
// function addProductToCart(title, price, productImg) {
//     var cartShopbox = document.createElement("div");
//     cartShopbox.classList.add("cart-box");

//     // Create cart item content
//     var cartBoxContent = `
//         <img src="${productImg}" alt="" class="cart-img">
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" value="1" class="cart-quantity">
//         </div>  
//         <i class="fa-solid fa-trash cart-remove"></i>
//     `;

//     cartShopbox.innerHTML = cartBoxContent;
//     var cartItems = document.getElementsByClassName("cart-content")[0];
//     cartItems.append(cartShopbox);

//     // Add event listeners for the new cart item
//     cartShopbox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
//     cartShopbox.getElementsByClassName("cart-quantity")[0].addEventListener("change", QuantityChanged);

//     updateTotal(); // Update total whenever a new item is added
//     saveCartToLocalStorage(); // Save cart to Local Storage
// }

// // Add to cart clicked function
// function addCartClicked(event) {
//     var button = event.target;
//     var shopProducts = button.parentElement;
//     var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//     var price = shopProducts.getElementsByClassName("price")[0].innerText;
//     var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//     addProductToCart(title, price, productImg);
// }

// // Save cart items to Local Storage
// function saveCartToLocalStorage() {
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     var cartBoxes = cartContent.getElementsByClassName("cart-box");
//     var cartItems = [];

//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
//         var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
//         var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

//         cartItems.push({ title: title, price: price, productImg: productImg });
//     }

//     localStorage.setItem('cart', JSON.stringify(cartItems)); // Save cart items to Local Storage
// }

// // Update total function
// function updateTotal() {
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     var cartBoxes = cartContent.getElementsByClassName("cart-box");
//     var total = 0;

//     // Loop through each cart box
//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

//         // Ensure priceElement and quantityElement are valid before proceeding
//         if (priceElement && quantityElement) {
//             var price = parseFloat(priceElement.innerText.replace("$", ""));
//             var quantity = quantityElement.value;

//             // Update total
//             total += (price * quantity);
//         }
//     }

//     // Round total to two decimal places
//     total = Math.round(total * 100) / 100;

//     // Update total price in the DOM
//     document.getElementsByClassName("total-price")[0].innerText = total + "$";
// }

// // Quantity changed function
// function QuantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1; // Set to 1 if the input is invalid
//     }
//     updateTotal(); // Update total when quantity changes
// }


// Check login status on page load
// window.onload = function() {
//     const username = localStorage.getItem('username');
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

//     // Redirect to login if not logged in
//     if (!username) {
//         window.location.href = 'login.html'; // Redirect to a login page if not logged in
//     } else {
//         document.getElementById('welcomeDiv').style.display = 'block';
//         document.getElementById('userEmail').innerText = username;
//         loadCartItems(cartItems);
//     }
// };











// // Show hidden form and attach form submission handler
// document.getElementById("loginbtn").onclick = function() {
//     document.getElementById('hiddenform').style.display = 'block';
//     document.getElementById('welcomeDiv').style.display = 'none';

//     document.getElementById('hiddenform').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent form submission

//         // Get input values
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('pwd').value;
//         const username = document.getElementById('username').value;

//         // Validate inputs
//         if (email && password && username) {
//             // Save to Local Storage (consider hashing password for security)
//             localStorage.setItem('email', email);
//             localStorage.setItem('username', username);
//             // It's generally not recommended to store passwords in Local Storage
//             // Consider using session management on the server side
//             localStorage.setItem('password', password); 

//             // Hide form, display welcome message
//             document.getElementById('hiddenform').style.display = 'none';
//             document.getElementById('welcomeDiv').style.display = 'block';
//             document.getElementById('userEmail').innerText = username;

//         } else {
//             alert('Please fill out all fields.');
//         }
//     });
// };

// // Logout functionality
// document.getElementById('logoutBtn').onclick = function() {
//     // Clear Local Storage and reset interface
//     localStorage.clear();
//     window.location.href = 'login.html'; // Redirect to login page
// };

// // Cancel button functionality
// document.getElementById('cancelbtn').onclick = function() {
//     document.getElementById('welcomeDiv').style.display = 'none';
//     document.getElementById('hiddenform').style.display = 'none';
// };

// // Handle welcome message display when clicking user icon
// document.getElementById("usericon").onclick = function() {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//         document.getElementById('welcomeDiv').style.display = 'block';
//         document.getElementById('hiddenform').style.display = 'none';
//         document.getElementById('userEmail').innerText = storedUsername;
//     } else {
//         alert('No user logged in.');
//     }
// };

// // Hide welcomeDiv and hiddenform when clicking outside
// document.addEventListener('click', function(event) {
//     const welcomeDiv = document.getElementById('welcomeDiv');
//     const hiddenform = document.getElementById('hiddenform');
//     const userIcon = document.getElementById('usericon');

//     if (!welcomeDiv.contains(event.target) && !hiddenform.contains(event.target) && event.target !== userIcon) {
//         welcomeDiv.style.display = 'none';
//         hiddenform.style.display = 'none';
//     }
// });

// // Cart functionality
// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close-cart");

// // Open cart
// cartIcon.onclick = () => {
//     cart.classList.add("active");
// };

// // Close cart
// closeCart.onclick = () => {
//     cart.classList.remove("active");
// };

// // Load cart items from Local Storage
// function loadCartItems(cartItems) {
//     cartItems.forEach(item => {
//         addProductToCart(item.title, item.price, item.productImg);
//     });
// }

// // Ready function
// document.addEventListener("DOMContentLoaded", ready);

// // Ready function
// function ready() {
//     // Remove product
//     var removeItems = document.getElementsByClassName("cart-remove");
//     for (var i = 0; i < removeItems.length; i++) {
//         var button = removeItems[i];
//         button.addEventListener("click", removeCartItem);
//     }

//     // Quantity changes
//     var quantityInputs = document.getElementsByClassName("cart-quantity");
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i];
//         input.addEventListener("change", QuantityChanged);
//     }

//     // Add to cart
//     var addCart = document.getElementsByClassName("add-cart");
//     for (var i = 0; i < addCart.length; i++) {
//         var button = addCart[i];
//         button.addEventListener("click", addCartClicked);
//     }

//     // Buy button
//     document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
// }

// /// Buy button clicked function
// function buyButtonClicked() {
//     alert("Your order is placed");
//     localStorage.removeItem('cart'); // Clear cart from Local Storage
//     const cartContent = document.getElementsByClassName("cart-content")[0];

//     while (cartContent.firstChild) {
//         cartContent.removeChild(cartContent.firstChild);
//     }

//     updateTotal();
// }

// /// Remove cart item function
// function removeCartItem(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.remove();
//     updateTotal();
//     saveCartToLocalStorage();
// }

// /// Add product to cart function
// function addProductToCart(title, price, productImg) {
//     var cartShopbox = document.createElement("div");
//     cartShopbox.classList.add("cart-box");

//     // Create cart item content
//     var cartBoxContent = `
//         <img src="${productImg}" alt="" class="cart-img">
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" value="1" class="cart-quantity" min="1">
//         </div>  
//         <i class="fa-solid fa-trash cart-remove"></i>
//     `;

//     cartShopbox.innerHTML = cartBoxContent;
//     var cartItems = document.getElementsByClassName("cart-content")[0];
//     cartItems.append(cartShopbox);

//     // Add event listeners for the new cart item
//     cartShopbox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
//     cartShopbox.getElementsByClassName("cart-quantity")[0].addEventListener("change", QuantityChanged);

//     updateTotal(); // Update total whenever a new item is added
//     saveCartToLocalStorage(); // Save cart to Local Storage
// }

// // Add to cart clicked function
// function addCartClicked(event) {
//     var button = event.target;
//     var shopProducts = button.parentElement;
//     var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//     var price = shopProducts.getElementsByClassName("price")[0].innerText;
//     var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//     addProductToCart(title, price, productImg);
// }

// // Save cart items to Local Storage
// function saveCartToLocalStorage() {
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     var cartBoxes = cartContent.getElementsByClassName("cart-box");
//     var cartItems = [];

//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
//         var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
//         var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

//         cartItems.push({ title: title, price: price, productImg: productImg });
//     }

//     localStorage.setItem('cart', JSON.stringify(cartItems)); // Save cart items to Local Storage
// }

// // Update total function
// function updateTotal() {
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     var cartBoxes = cartContent.getElementsByClassName("cart-box");
//     var total = 0;

//     // Loop through each cart box
//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

//         // Ensure priceElement and quantityElement are valid before proceeding
//         if (priceElement && quantityElement) {
//             var price = parseFloat(priceElement.innerText.replace("$", ""));
//             var quantity = quantityElement.value;

//             // Update total
//             total += (price * quantity);
//         }
//     }

//     // Round total to two decimal places
//     total = Math.round(total * 100) / 100;

//     // Update total price in the DOM
//     document.getElementsByClassName("total-price")[0].innerText = total + "$";
// }

// // Quantity changed function
// function QuantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1; // Set to 1 if the input is invalid
//     }
//     updateTotal(); // Update total when quantity changes
// }