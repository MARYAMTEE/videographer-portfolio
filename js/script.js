const nav = document.querySelector(".nav");
const openNav = document.querySelector(".portfolio__nav--open");
const closeNav = document.querySelector(".portfolio__nav--close");
const navLink = document.querySelectorAll(".nav__item");

openNav.addEventListener("click", () =>{
    nav.classList.toggle("toggle");
});

closeNav.addEventListener("click", () => {
    nav.classList.remove("toggle");
});

navLink.forEach(link => {
    link.addEventListener("click", () => {
        navLink.forEach(list => list.classList.remove("active"))
        link.classList.add("active");
        nav.classList.remove("toggle");
    });
});

// ABOUT PAGE ANIMATION
document.querySelectorAll(".about__card").forEach(card => {
  card.style.opacity = 1;
});
