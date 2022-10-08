window.onscroll = function() {scrollFunction()};

var navbar = document.getElementById("navbar");
var navbarContainer = document.getElementById("navbarContainer");
var sticky = navbar.offsetTop;

var home = document.getElementById("home");
var info = document.getElementById("info");
var faq = document.getElementById("faq");
var about = document.getElementById("about");
var contact = document.getElementById("contact");
var book = document.getElementById("book");

var homeB = document.getElementById("homeButton");
var infoB = document.getElementById("infoButton");
var faqB = document.getElementById("faqButton");
var aboutB = document.getElementById("aboutButton");
var contactB = document.getElementById("contactButton");
var bookB = document.getElementById("bookButton");

console.log(home.offsetTop);
console.log(info.offsetTop);
console.log(faq.offsetTop);
console.log(about.offsetTop);
console.log(contact.offsetTop);
console.log(book.offsetTop);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function scrollFunction() {
  console.log(window.pageYOffset);
  if (window.pageYOffset >= sticky) {
    navbarContainer.classList.add("sticky");
  } else {
    navbarContainer.classList.remove("sticky");
  }

  const offsetSection = 400;

  if (window.pageYOffset >= book.offsetTop - offsetSection) {
    homeB.classList.remove("active");
    infoB.classList.remove("active");
    faqB.classList.remove("active");
    aboutB.classList.remove("active");
    contactB.classList.remove("active");
    bookB.classList.add("active");
    return;
  }
  if (window.pageYOffset >= contact.offsetTop - offsetSection) {
    homeB.classList.remove("active");
    infoB.classList.remove("active");
    faqB.classList.remove("active");
    aboutB.classList.remove("active");
    contactB.classList.add("active");
    bookB.classList.remove("active");
    return;
  }
  if (window.pageYOffset >= about.offsetTop - offsetSection) {
    homeB.classList.remove("active");
    infoB.classList.remove("active");
    faqB.classList.remove("active");
    aboutB.classList.add("active");
    contactB.classList.remove("active");
    bookB.classList.remove("active");
    return;
  }
  if (window.pageYOffset >= faq.offsetTop - offsetSection) {
    homeB.classList.remove("active");
    infoB.classList.remove("active");
    faqB.classList.add("active");
    aboutB.classList.remove("active");
    contactB.classList.remove("active");
    bookB.classList.remove("active");
    return;
  }
  if (window.pageYOffset >= info.offsetTop - offsetSection) {
    homeB.classList.remove("active");
    infoB.classList.add("active");
    faqB.classList.remove("active");
    aboutB.classList.remove("active");
    contactB.classList.remove("active");
    bookB.classList.remove("active");
    return;
  }
  if (window.pageYOffset >= 0) {
    homeB.classList.add("active");
    infoB.classList.remove("active");
    faqB.classList.remove("active");
    aboutB.classList.remove("active");
    contactB.classList.remove("active");
    bookB.classList.remove("active");
    return;
  }
}
