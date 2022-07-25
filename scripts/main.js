const header = document.querySelector("header");
const headerLinks = header.querySelectorAll("a");

//Header link hover
function headerLinkHover () {
  const nav = header.querySelector("nav");
  const navLinks = nav.querySelectorAll("a");

  for (let link of navLinks) {
    link.onmouseover = () => {
      setTimeout(function() {
        link.classList.add("nav__link_active");
      }, 300)
    }

    link.onmouseout = () => {
      setTimeout(function() {
        link.classList.remove("nav__link_active");
      }, 300)
    }
  }
}

headerLinkHover();



//Burger link click
function burgerLinksClick () {
  const body = document.querySelector("body");
  const burger = header.querySelector(".header__burger");

  for (let link of headerLinks) {
    link.addEventListener("click", function () {
      burger.classList.remove("header__burger_active");
      body.classList.remove("lock");
      header.classList.remove("header_active");

      if (window.pageYOffset === 0) {
        header.classList.toggle("header_black")
      }
    });
  }
}

burgerLinksClick();



//Header links smooth transition
function headerLinksSmoothTransition () {
  for (let link of headerLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
  
      const href = link.href;
      const idStr = href.slice(href.indexOf("#"));
  
      if (idStr.length !== 1) {
        document.querySelector(`${idStr}`).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    });
  }
}

headerLinksSmoothTransition();



//Burger
let previousHeaderBlackStatus;

function burgerClick () {
  const body = document.querySelector("body");
  const burger = header.querySelector(".header__burger");

  burger.onclick = () => {
    burger.classList.toggle("header__burger_active");
    body.classList.toggle("lock");
    header.classList.toggle("header_active");
    
    if (window.pageYOffset === 0) {
      header.classList.toggle("header_black")
    }
  }
}

burgerClick();



function checkHeaderClassList (header) {
  for(let className of header.classList) {
    if (className === "header_black") {
      return true;
    }
  }

  return false;
}



//Header scroll style
window.addEventListener("scroll", function() {
  let scroll = window.pageYOffset;

  if (!checkHeaderClassList(header) && scroll > 0) {
    header.classList.add("header_black");
  } else if (scroll === 0) {
    header.classList.remove("header_black");
  }
})