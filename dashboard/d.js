const desc = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const type = document.querySelector("#type");

const addBtn = document.querySelector("#addBtn");
const tbody = document.querySelector("#tbody");
window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }