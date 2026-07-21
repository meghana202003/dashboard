// ======================================
// ShopEase E-Commerce
// Part 1
// ======================================

// Cart Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartCount = document.getElementById("cartCount");
const themeBtn = document.getElementById("themeBtn");

// -------------------------------
// Update Cart Counter
// -------------------------------

function updateCartCount() {

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}

updateCartCount();

// -------------------------------
// Toast Notification
// -------------------------------

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}

// -------------------------------
// Add Product To Cart
// -------------------------------

const addButtons = document.querySelectorAll(".addCart");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = {

            id: Date.now(),

            name: button.dataset.name,

            price: Number(button.dataset.price),

            quantity: 1

        };

        cart.push(product);

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

        updateCartCount();

        showToast(product.name + " added to cart.");

    });

});

// -------------------------------
// Dark Mode
// -------------------------------

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}