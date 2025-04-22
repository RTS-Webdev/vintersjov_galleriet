function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.add("active");

    const menuImg = document.getElementById("menu-img");
    menuImg.style.display = "none";

    const dropdownContent = document.querySelectorAll(".dropdown-content");
    dropdownContent.forEach(content => {
        content.style.display = "block";
    });
}

function closeMenu() {
    const menu = document.getElementById("menu");
    menu.classList.remove("active");

    const menuImg = document.getElementById("menu-img");
    menuImg.style.display = "block";

    const dropdownContent = document.querySelectorAll(".dropdown-content");
    dropdownContent.forEach(content => {
        content.style.display = "none";
    });
}