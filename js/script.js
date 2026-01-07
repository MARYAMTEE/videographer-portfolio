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

// TOGGLE LOGIC
const toggleBtn = document.querySelector(".theme-toggle");
const icon = toggleBtn.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  icon.className = savedTheme === "light"
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
    icon.className = "fa-solid fa-moon";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    icon.className = "fa-solid fa-sun";
  }
});

