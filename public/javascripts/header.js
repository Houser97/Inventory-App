const header = document.getElementById("header");
const menu_svg = document.querySelector(".svg-menu");
const close_menu = document.querySelector(".close-menu");
const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", ()=> {
    if(document.documentElement.scrollTop !== 0){
        header.style.position = "fixed";
        header.style.backgroundColor = "rgb(0, 0, 0)";
    } else {
        header.style.position = "relative";
        header.style.backgroundColor = "transparent";
    }
})

menu_svg.addEventListener("click", () => {
    menu_svg.style.display = "none";
    close_menu.style.display = "flex";
    navbar.style.transform = "translateX(100%)"
})

close_menu.addEventListener("click", () => {
    menu_svg.style.display = "flex";
    close_menu.style.display = "none";
    navbar.style.transform = "translateX(0%)"
});