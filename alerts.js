function subscribe_clicked (event) {
    event.preventDefault();
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
                // BUG WHERE I WAS PUSHING HTML OBJECT
                // ORIGINAL CAPUTRED SEPARATELY
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
    // I TRIED TO USE THIS IN CLEAR CART TO UPDATE DISPLAY BUT LEN WAS ISSUE
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
        return;
    }
    alert("Cart is empty!");
}

function submitForm() {
    const fname = document.getElementById("firstname").value;
    const lname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("number").value;
    const message = document.getElementById("message").value;
    const customOrder = document.getElementById("custom-order").checked;

    const messageInfo = { fname, lname, email, phone, message, customOrder };
    const keyValue = fname + lname;

    localStorage.setItem(keyValue, JSON.stringify(messageInfo));
}
