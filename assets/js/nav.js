const menubtn = document.querySelector(".menu-moblie");
const nav = document.querySelector(".Navbar");
const menu = document.querySelector(".menu3");






function backg() {
    if (window.scrollY < 70) {

        nav.classList.add("nav-colored");
        // // nav.before.backdropFilter=" blur(0)"

    }
}
backg();




window.onscroll = () => {

    if (window.scrollY < 70) {

        nav.classList.add("nav-colored");


    }
    else if (window.scrollY > 70) {

        nav.classList.remove("nav-colored");

    }





};

let click = 0;
menubtn.addEventListener('click', () => {
    menu.classList.toggle("active");
    menubtn.classList.toggle("rotate");
    nav.classList.toggle("navborder");
    if (nav.classList == "Navbar nav-colored navborder") {
        nav.classList.remove("nav-colored")
    } else if (window.scrollY < 70) {
        nav.classList.add("nav-colored")
    }
    // menu.style.backdropFilter=" blur(8px)"


})

