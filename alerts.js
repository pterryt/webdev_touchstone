function subscribe_clicked (event) {
    event.preventDefault();
    alert("Thanks for subscribing!");
}

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".add-to-cart");

    console.log(buttons.length);
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            alert("Item added to cart.")
        })
    })
})