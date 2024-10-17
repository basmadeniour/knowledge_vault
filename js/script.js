window.onload = function() {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
        document.getElementById('rigsterform').style.display = 'block';
    }
    document.getElementById('rigsterform').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('rigsterform').style.display = 'none';
        // Get input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;
        const username = document.getElementById('username').value;

        document.getElementById('hiddenform').style.display = 'none';
    
    })};



// Show hidden form and attach form submission handler
document.getElementById("loginbtn").onclick = function() {
    document.getElementById('hiddenform').style.display = 'block';
    document.getElementById('welcomeDiv').style.display = 'none';

    document.getElementById('hiddenform').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;
        const username = document.getElementById('username').value;

        // Validate inputs
        if (email && password && username) {
            // Save to Local Storage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password); // Not recommended to store passwords in Local Storage
            localStorage.setItem('username', username);

            // Hide form, display welcome message
            document.getElementById('hiddenform').style.display = 'none';
            document.getElementById('welcomeDiv').style.display = 'block';
            document.getElementById('userEmail').innerText = username;

        } else {
            alert('Please fill out all fields.');
        }
    });
};

// Logout functionality
document.getElementById('logoutBtn').onclick = function() {
    // Clear Local Storage and reset interface
    localStorage.clear();
    document.getElementById('welcomeDiv').style.display = 'none';
    document.getElementById('hiddenform').style.display = 'block';

    // Clear form inputs
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pwd').value = '';
};
document.getElementById('cancelbtn').onclick = function() {
       // reset interface
    document.getElementById('welcomeDiv').style.display = 'none';
    document.getElementById('hiddenform').style.display = 'none';

};

// Handle welcome message display when clicking user icon
document.getElementById("usericon").onclick = function() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('welcomeDiv').style.display = 'block';
        document.getElementById('hiddenform').style.display = 'none';
        document.getElementById('userEmail').innerText = storedUsername;
    } else {
        alert('No user logged in.');
    }
};


// Ensure DOM is fully loaded before executing
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Ready function
function ready() {
    // Selecting elements after DOM has loaded
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");

    // Open cart when clicking cart icon
    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    // Close cart when clicking close button
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    // Load cart from Local Storage
    loadCartFromLocalStorage();

    // Remove product
    var removeItems = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeItems.length; i++) {
        var button = removeItems[i];
        button.addEventListener("click", removeCartItem);
    }

    // Quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", QuantityChanged);
    }

    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy button
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buybuttonclicked);
}


// Buy button clicked function
function buybuttonclicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];

    // Remove all items from cart
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }

    updateTotal();
    localStorage.removeItem("cart"); // Clear Local Storage after purchase
}

// Save cart data to Local Storage
function saveCartToLocalStorage() {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartItems.getElementsByClassName("cart-box");
    let cart = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
        var quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

        cart.push({ title, price, quantity, productImg });
    }

    // Save cart as JSON string in Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart data from Local Storage
function loadCartFromLocalStorage() {
    var storedCart = localStorage.getItem("cart");

    if (storedCart) {
        var cart = JSON.parse(storedCart);
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            addProductToCart(item.title, item.price, item.productImg, item.quantity);
        }
    }

    updateTotal(); // Update total after loading cart
}

// Remove cart item function
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartToLocalStorage(); // Update Local Storage after item removal
}

// Add product to cart function
function addProductToCart(title, price, productImg, quantity = 1) {
    var cartShopbox = document.createElement("div");
    cartShopbox.classList.add("cart-box");

    // Check if the product is already in the cart
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart.");
            return; // Stop if the item is already in the cart
        }
    }

    // Create cart item content
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="${quantity}" class="cart-quantity">
        </div>  
        <i class="fa-solid fa-trash cart-remove"></i>
    `;

    cartShopbox.innerHTML = cartBoxContent;
    cartItems.append(cartShopbox);

    // Add event listeners for the new cart item
    cartShopbox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopbox.getElementsByClassName("cart-quantity")[0].addEventListener("change", QuantityChanged);

    updateTotal(); // Update total whenever a new item is added
    saveCartToLocalStorage(); // Save updated cart to Local Storage
}

// Add to cart clicked function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
}

// Update total function
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    // Loop through each cart box
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        // Ensure priceElement and quantityElement are valid before proceeding
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;

            // Update total
            total += (price * quantity);
        }
    }

    // Round total to two decimal places
    total = Math.round(total * 100) / 100;

    // Update total price in the DOM
    document.getElementsByClassName("total-price")[0].innerText = total + "$";
}

// Quantity changed function
function QuantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1; // Set to 1 if the input is invalid
    }
    updateTotal(); // Update total when quantity changes
    saveCartToLocalStorage(); // Save updated cart to Local Storage after quantity change
}






