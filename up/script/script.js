"use strict";

// Overlay & Nav

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var menu = document.querySelector(".header__menu");
var overlay = document.querySelector(".header__overlay");
var header = document.querySelector(".header");

var toggleClassOpen = function toggleClassOpen() {
  header.classList.toggle("open");
  overlay.classList.toggle("open");
  menu.classList.toggle("open");
};

var removeClassOpen = function removeClassOpen() {
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

var smoothTrans = function smoothTrans() {
  document.documentElement.classList.add("transition");
  setTimeout(function () {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

var btnToggleTheme = document.querySelector("#toggle");
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

var nav = document.querySelector(".header__nav--links");

nav.addEventListener("click", function (e) {
  if (e.target.tagName !== "A") return;else e.preventDefault();
  var idx = e.target.dataset.idx;
  if (!idx) return;
  console.log(idx);
  var section = document.querySelector(".section-" + idx);
  setTimeout(function () {
    return removeClassOpen();
  }, 1000);
  if (section.classList.contains("section-1")) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  } else {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
});

// Scroll into view Register&Footer

var btnJoin = document.querySelector(".join");
btnJoin.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".register").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});

var btnFindMore = document.querySelector(".find");
btnFindMore.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".footer").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});

// ------->      GSAP
var tl = gsap.timeline();

tl.fromTo(".showcase--title", { opacity: 0, scale: 0.6 }, { opacity: 1, duration: 1, scale: 1 }, 0.5);
tl.fromTo(".find", { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "<");
tl.fromTo(".join", { y: "-100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "<");

// ------- Testimonials

var tabsConstainer = document.querySelector(".testimonials__tabs");

tabsConstainer.addEventListener("click", function (e) {
  // ------>  Tabs Component
  if (!e.target.classList.contains("testimonials__tab--img")) return;

  // Selecting tab
  var tab = e.target.closest(".testimonials__tab");

  // Removing 'active' from all tabs
  var tabs = [].concat(_toConsumableArray(tab.parentElement.children));
  tabs.forEach(function (el) {
    el.classList.remove("active");
  });
  // Adding on clicked tab
  tab.classList.add("active");

  //  ---> Reviews
  var id = e.target.dataset.id;

  var review = document.querySelector(".testimonials__review--" + id);

  //Removing active from all reviews
  var reviews = [].concat(_toConsumableArray(review.parentElement.children));
  reviews.forEach(function (rev) {
    return rev.classList.remove("active");
  });
  review.classList.add("active");
});

// Page scroll UP

var btnScrollUp = document.querySelector(".btn-scroll");

var scrollToTop = function scrollToTop(entries) {
  var _entries = _slicedToArray(entries, 1),
      entry = _entries[0];

  if (!entry.isIntersecting) {
    btnScrollUp.classList.remove("hidden");
  } else {
    btnScrollUp.classList.add("hidden");
  }
};

var options = {
  root: null,
  threshold: 0
};

var showcase = document.querySelector(".showcase");
var observer = new IntersectionObserver(scrollToTop, options);
observer.observe(showcase);

btnScrollUp.addEventListener("click", function (e) {
  header.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
});

// Register

var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

var slidePage = document.querySelector(".register__content--page");
var firstNextBtn = document.querySelector(".next-1");

var firstPrevBtn = document.querySelector(".prev-1");
var secondNextBtn = document.querySelector(".next-2");
var secondPrevBtn = document.querySelector(".prev-2");
var thirdNextBtn = document.querySelector(".next-3");
var thirdPrevBtn = document.querySelector(".prev-3");
var submitBtn = document.querySelector(".submit");

var progressSteps = document.querySelectorAll(".register__progress--step");

var progressNum = document.querySelectorAll(".register__progress--step span");
var progressIcon = document.querySelectorAll(".register__progress--step i");

//

var current = 1;

var forwardTick = function forwardTick() {
  progressSteps[current - 1].classList.add("active");
  progressNum[current - 1].classList.add("active");
  progressIcon[current - 1].classList.add("active");
  current += 1;
};
var backwardsTick = function backwardsTick() {
  progressSteps[current - 2].classList.add("active");
  progressNum[current - 2].classList.add("active");
  progressIcon[current - 2].classList.add("active");
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
  setTimeout(function () {
    alert("Form successfully submited");
    location.reload();
  }, 1000);
  forwardTick();
});
