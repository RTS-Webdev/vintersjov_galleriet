function toggleMenu() {
    const button = document.getElementById("dropdown");
    button.classList.toggle("active");
}

const menu = document.getElementById("dropdown");
menu.addEventListener("click", toggleMenu);