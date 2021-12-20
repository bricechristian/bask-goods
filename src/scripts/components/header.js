const $header = document.querySelector('header')
const $nav = document.querySelector('nav')

// FLY AWAY HEADER
let lastScrollTop = 0;
let scrollSpeed = 0;
const checkScrollSpeed = ( (settings) => {
    settings = settings || {};

    let lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function(){
        newPos = window.scrollY;
        if ( lastPos != null ){ // && newPos < maxScroll 
            delta = newPos -  lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        scrollSpeed = delta;
    };
})();

window.addEventListener("scroll", () => { 
    checkScrollSpeed();
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
        $header.classList.add('slide-up');
    }  else {
        if(Math.abs(scrollSpeed) > 25){
            $header.classList.remove('slide-up');
        } 
    }
    if (st > 200 ) {
        $nav.classList.add('min');
    } else {
        $nav.classList.remove('min');
        $header.classList.remove('slide-up');
    }
    if (st == 0 ) {
        $header.classList.remove('slide-up');
    }             
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);  


//DROPDOWNS
const $headerNav = $header.querySelector('.header nav').children;
const $shopLink = document.getElementById('header-shop-link');
const $headerShopCats = $header.querySelector('.header__categories');
const $headerMenu = $header.querySelector('.header__menu');

const openDropdown = (a, b) => {
    const navChildren = [...$headerNav]
    navChildren.forEach((el, i) => {
        if(i !== 0){
            el.style.display = "none";
        }
    });
    if(a !== null){
        a.classList.add("active");
    }
    if(b !== null){
        b.style.display = "block";
        b.classList.add("active")
    }
    $header.classList.add("dropdown-open");
}
const closeDropdown = (a, b) => {
    if(a !== null){
        a.classList.remove("active");
    }
    if(b !== null){
        b.classList.remove("active")
        setTimeout(() => {
            b.style.display = "none";
        }, 300);
    }
    $header.classList.remove("dropdown-open");
}

if($shopLink !== null && $headerShopCats !== null){
    $shopLink.addEventListener("mouseover", () => {
        openDropdown($shopLink, $headerShopCats)
    }, false)
    // $headerShopCats.querySelector(".grid").addEventListener("mouseleave", () => {
    //     closeDropdown($shopLink, $headerShopCats)
    // }, false)
    $header.addEventListener("mouseleave", () => {
        closeDropdown($shopLink, $headerShopCats)
    }, false)
}

// HAMBURGER
const $hamburger = document.getElementById('hamburger');
const $hamburgerClose = document.getElementById('hamburger-close');
const openMenu = () => {
    $hamburger.classList.remove("active")
    openDropdown($hamburgerClose, $headerMenu)
}
const closeMenu = () => {
    $hamburger.classList.add("active")
    if($shopLink !== null){
        $shopLink.classList.remove("active")
    }
    if($headerShopCats !== null){
        $headerShopCats.classList.remove("active")
    }
    closeDropdown($hamburgerClose, $headerMenu)
}
$hamburger.addEventListener("click", openMenu)
$hamburgerClose.addEventListener("click", closeMenu)
$header.addEventListener("mouseleave", closeMenu)