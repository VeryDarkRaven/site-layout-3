const header = document.querySelector("header");
const headerLinks = header.querySelectorAll("a");

const nav = header.querySelector("nav");
const navLinks = nav.querySelectorAll("a");

//Header link hover
function headerLinkHover () {
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



//Header scroll position
const sectionsHeightArr = [];

window.addEventListener("scroll", function() {
  headerPosition(window.scrollY);
});

function headerPosition (scroll) {
  if (sectionsHeightArr.length === 0) {
    const sections = document.querySelectorAll("section");

    for (let i = 0; i < sections.length; i++) {
      sectionsHeightArr[i] = sections[i].scrollHeight;
    }
  }

  for (let i = 0; i < sectionsHeightArr.length; i++) {
    let blocksHeightSum = 0;

    for (let x = 0; x <= i; x++) {
      blocksHeightSum += sectionsHeightArr[x];
    }

    if (scroll === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
      linkScrollClassSwitching(sectionsHeightArr.length - 1);
      break;
    } else if (scroll <= blocksHeightSum) {
      linkScrollClassSwitching(i);
      break;
    }
  }
}

function linkScrollClassSwitching (num) {
  for (let link of navLinks) {
    if (num === 0) {
      link.classList.remove("link_scroll-position");
      setTimeout(function() {
        link.classList.remove("link_scroll-position_active");
      }, 300)
      continue;
    } else if (navLinks[num - 1] === link) {
      link.classList.add("link_scroll-position");
      setTimeout(function() {
        link.classList.add("link_scroll-position_active");
      }, 300)
      continue;
    } 

    link.classList.remove("link_scroll-position");
    setTimeout(function() {
      link.classList.remove("link_scroll-position_active");
    }, 300)
  }
}