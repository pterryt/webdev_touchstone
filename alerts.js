function subscribe_clicked (event) {
    const emailInput = document.getElementById("sub-email")
    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email")
        return;
    }
    alert("Thanks for subscribing!");
}

var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".products-cell");
    console.log(cells.length);

    cells.forEach(cell => {
        const product_name = cell.querySelector(".product-name").textContent.trim();
        const product_button = cell.querySelector(".add-to-cart");
        if (product_name && product_button) {
            product_button.addEventListener("click", function () {
                alert("Item added to cart: " + product_name);
                cartItems.push(product_name);
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                console.log(product_name);
            })
        }
    })
})

let cartModal = document.getElementById("cart-modal");
let viewCartButton = document.getElementById("view-cart-button");
let closeCartButton = document.getElementById("close-modal");
let clearCartButton = document.getElementById("clear-cart-button");
let processButton = document.getElementById("process-order-button");

function openCartModal(){
    cartModal.style.display = "block";
}

function closeCartModal(){
    cartModal.style.display = "none";
}

viewCartButton.addEventListener("click", function(){
    openCartModal();
    updateCart();
});

closeCartButton.addEventListener("click", function(){
    closeCartModal();
})

clearCartButton.addEventListener("click", function(){
    clearCart();
    updateCart();
})

processButton.addEventListener("click", function(){
    processOrder();
    updateCart();
})




function updateCart(){
    var cart_list = document.getElementById("cart-items");
    cart_list.innerHTML = "";
    if (cartItems && !cartItems.length > 0) {
        const list_item = document.createElement("li");
        list_item.textContent = "Cart is Empty";
        cart_list.appendChild(list_item);
        return
    }
    if (cartItems) {
        cartItems.forEach(item => {
            const list_item = document.createElement("li");
            list_item.textContent = item;
            cart_list.appendChild(list_item);
        })
    }
}

function clearCart(){
    if (cartItems && cartItems.length > 0) {
        cartItems = []
        alert("Cart cleared!");
        return;
    }
    alert("No items to clear!");
}

function processOrder(){
    if (cartItems && cartItems.length > 0) {
        alert("Thank you for your order!");
        cartItems = []
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        return;
    }
    alert("Cart is empty!");
}


function submitForm() {

    if (!checkValiditiy()){
        return;
    }
    const fname = document.getElementById("firstname").value;
    const lname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("number").value;
    const message = document.getElementById("message").value;
    const customOrder = document.getElementById("ordercheckbox").checked;


    const messageInfo = { fname, lname, email, phone, message, customOrder };
    const keyValue = fname + lname;

    localStorage.setItem(keyValue, JSON.stringify(messageInfo));

    if (customOrder) {
        alert("Thanks for your order! We'll get right on it");
    }
    else {
        alert("Your feedback is greatly appreciated! Thank you!");
    }
}

function checkValiditiy() {
    const fname = document.getElementById("firstname").value;
    if (fname === "") {
        alert("Please enter your name.")
        return false;
    }
    const email = document.getElementById("email").checkValidity();
    if (!email) {
        alert("Please enter a valid email!");
        return false;

    }
    const phone = document.getElementById("number").checkValidity();
    if (!phone) {
        alert("Please enter a valid phone number!");
        return false;
    }
    return true;
}
