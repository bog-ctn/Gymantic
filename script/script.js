"use strict";

// Overlay & Nav
const menu = document.querySelector(".header__menu");
const overlay = document.querySelector(".header__overlay");
const header = document.querySelector(".header");

const toggleClassOpen = function () {
  header.classList.toggle("open");
  overlay.classList.toggle("open");
  menu.classList.toggle("open");
};

const removeClassOpen = function () {
  header.classList.remove("open");
  overlay.classList.remove("open");
  menu.classList.remove("open");
};

menu.addEventListener("click", toggleClassOpen);
overlay.addEventListener("click", removeClassOpen);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    removeClassOpen();
  }
});

// ------> Theme toggle

const smoothTrans = function () {
  document.documentElement.classList.add("transition");
  setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

const btnToggleTheme = document.querySelector("#toggle");
btnToggleTheme.addEventListener("click", function (e) {
  if (e.target.checked) {
    smoothTrans();
    document.documentElement.dataset.theme = "dark";
  } else {
    smoothTrans();
    document.documentElement.dataset.theme = "light";
  }
});

// Navigation : Event delegation

const nav = document.querySelector(".header__nav--links");

nav.addEventListener("click", function (e) {
  if (e.target.tagName !== "A") return;
  else e.preventDefault();
  const idx = e.target.dataset.idx;
  if (!idx) return;
  console.log(idx);
  const section = document.querySelector(`.section-${idx}`);
  setTimeout(() => removeClassOpen(), 1000);
  if (section.classList.contains("section-1")) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  } else {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
});

// Scroll into view Register&Footer

const btnJoin = document.querySelector(".join");
btnJoin.addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector(".register")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});

const btnFindMore = document.querySelector(".find");
btnFindMore.addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector(".footer")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});

// ------->      GSAP
const tl = gsap.timeline();

tl.fromTo(
  ".showcase--title",
  { opacity: 0, scale: 0.6 },
  { opacity: 1, duration: 1, scale: 1 },
  0.5
);
tl.fromTo(
  ".find",
  { y: "100%", opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "<"
);
tl.fromTo(
  ".join",
  { y: "-100%", opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  "<"
);

// ------- Testimonials

const tabsConstainer = document.querySelector(".testimonials__tabs");

tabsConstainer.addEventListener("click", function (e) {
  // ------>  Tabs Component
  if (!e.target.classList.contains("testimonials__tab--img")) return;

  // Selecting tab
  const tab = e.target.closest(".testimonials__tab");

  // Removing 'active' from all tabs
  const tabs = [...tab.parentElement.children];
  tabs.forEach((el) => {
    el.classList.remove("active");
  });
  // Adding on clicked tab
  tab.classList.add("active");

  //  ---> Reviews
  const id = e.target.dataset.id;

  const review = document.querySelector(`.testimonials__review--${id}`);

  //Removing active from all reviews
  const reviews = [...review.parentElement.children];
  reviews.forEach((rev) => rev.classList.remove("active"));
  review.classList.add("active");
});

// Page scroll UP

const btnScrollUp = document.querySelector(".btn-scroll");

const scrollToTop = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    btnScrollUp.classList.remove("hidden");
  } else {
    btnScrollUp.classList.add("hidden");
  }
};

const options = {
  root: null,
  threshold: 0,
};

const showcase = document.querySelector(".showcase");
const observer = new IntersectionObserver(scrollToTop, options);
observer.observe(showcase);

btnScrollUp.addEventListener("click", function (e) {
  header.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

// Register

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

const slidePage = document.querySelector(".register__content--page");
const firstNextBtn = document.querySelector(".next-1");

const firstPrevBtn = document.querySelector(".prev-1");
const secondNextBtn = document.querySelector(".next-2");
const secondPrevBtn = document.querySelector(".prev-2");
const thirdNextBtn = document.querySelector(".next-3");
const thirdPrevBtn = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");

const progressSteps = document.querySelectorAll(".register__progress--step");

const progressNum = document.querySelectorAll(".register__progress--step span");
const progressIcon = document.querySelectorAll(".register__progress--step i");

//

let current = 1;

const forwardTick = function () {
  progressSteps[current - 1].classList.add("active");
  progressNum[current - 1].classList.add("active");
  progressIcon[current - 1].classList.add("active");
  current += 1;
};
const backwardsTick = function () {
  progressSteps[current - 2].classList.remove("active");
  progressNum[current - 2].classList.remove("active");
  progressIcon[current - 2].classList.remove("active");
  current -= 1;
};

firstNextBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "-33%";
  forwardTick();
});
firstPrevBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "0";
  backwardsTick();
});
secondNextBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "-100%";
  forwardTick();
});
secondPrevBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "-33%";
  backwardsTick();
});
thirdNextBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "-200%";
  forwardTick();
});
thirdPrevBtn.addEventListener("click", function (e) {
  slidePage.style.marginLeft = "-100%";
  backwardsTick();
});

submitBtn.addEventListener("click", function (e) {
  setTimeout(() => {
    alert("Form successfully submited");
    location.reload();
  }, 1000);
  forwardTick();
});
