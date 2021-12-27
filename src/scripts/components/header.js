const $header = document.querySelector('header')
const $nav = document.querySelector('nav')

// FLY AWAY HEADER
let lastScrollTop = 0;
let scrollSpeed = 0;

/*
const checkScrollSpeed = ((settings) => {
    settings = settings || {};

    let lastPos, newPos, timer, delta,
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function () {
        newPos = window.scrollY;
        if (lastPos != null) { // && newPos < maxScroll 
            delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        scrollSpeed = delta;
    };
})();

window.addEventListener("scroll", () => { 
    checkScrollSpeed();
    const $header = document.querySelector('header')
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop){
        //downscroll
        $header.classList.remove('swiped-down');
        if(st > $header.offsetHeight){
            $header.classList.add('swiped-up');
        } else {
            $header.classList.remove('swiped-up');
        }
    }  else {
        //upscroll
        if(Math.abs(scrollSpeed) > 12){
            $header.classList.remove('swiped-up');
            $header.classList.add('swiped-down'); 
        } 
    }
    if (st < $header.offsetHeight) {
        $header.classList.remove('swiped-up');
        $header.classList.remove('swiped-down');
        $header.classList.remove('active');
    } else {
        $header.classList.add('active');
    }        
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);  
*/ 

//DROPDOWNS
const $headerOverlay = document.querySelector('.header__overlay');
const $headerNav = $header.querySelector('.header nav').children;
const navChildren = [...$headerNav]
const $shopLink = document.getElementById('header-shop-link');
const $searchLink = document.getElementById('header-search-link');
const $headerMain = $header.querySelector('.header__main');
let headerHeight = $headerMain.offsetHeight;
const $headerShopCats = $header.querySelector('.header__categories');
const $headerSearch = $header.querySelector('.header__search');
const $headerMenu = $header.querySelector('.header__menu');
const $headerTopMenu = $header.querySelector('.header__menu-top');
const $headerMenuLinks = $headerMenu.querySelectorAll(".header__link");
const $headerSubMenus = $header.querySelectorAll('.header__submenu');
const $headerLinksWithSubmenu = $header.querySelectorAll('a.has-submenu');

const openDropdown = (a, b) => {
    navChildren.forEach((el, i) => {
        if (i !== 0) {
            el.classList.remove("active")
            setTimeout(() => {
                el.style.left = "-9999px";
            }, 25);
        }
    });
    if (a !== null) {
        a.classList.add("active");
    }
    if (b !== null) {
        setTimeout(() => {
            b.style.left = "0px";
        }, 50);
        setTimeout(() => {
            b.classList.add("active")
        }, 75);
    }
    setTimeout(() => {
        $header.style.height = headerHeight + b.offsetHeight + "px";
        $headerOverlay.classList.add("active");
        $header.classList.add("dropdown-open");
    }, 50);
}
const closeDropdown = (a, b) => {
    if (a !== null) {
        a.classList.remove("active");
    }
    if (b !== null) {
        b.classList.remove("active")
        setTimeout(() => {
            b.style.left = "0px";
        }, 25);
    }
    setTimeout(() => {
        $header.style.height = headerHeight + "px";
        $headerOverlay.classList.remove("active");
        $header.classList.remove("dropdown-open");
    }, 50);
}

//MAIN SHOP LINK
if ($shopLink !== null && $headerShopCats !== null) {
    $shopLink.addEventListener("mouseover", () => {
        if (!$headerShopCats.classList.contains("active")) {
            closeMenu()
            openDropdown($shopLink, $headerShopCats)
        }
    }, false)
    $header.addEventListener("mouseleave", () => {
        closeDropdown($shopLink, $headerShopCats)
    }, false)
}

//MAIN SEARCH LINK
if ($searchLink !== null && $headerSearch !== null) {
    $searchLink.addEventListener("mouseover", () => {
        if (!$headerSearch.classList.contains("active")) {
            closeMenu()
            // UPDATE FOCUS
            // create invisible dummy input to receive the focus first
            const fakeInput = document.createElement('input')
            fakeInput.setAttribute('type', 'text')
            fakeInput.style.position = 'absolute'
            fakeInput.style.opacity = 0
            fakeInput.style.height = 0
            fakeInput.style.fontSize = '16px' // disable auto zoom
            // you may need to append to another element depending on the browser's auto 
            // zoom/scroll behavior
            document.querySelector('.header').prepend(fakeInput)
            // focus so that subsequent async focus will work
            fakeInput.focus()
            setTimeout(() => {
                // now we can focus on the target input
                document.querySelector(".header__search input").focus()
                // cleanup
                fakeInput.remove()
            }, 300)            
            openDropdown($searchLink, $headerSearch)
        }
    }, false)
    $header.addEventListener("mouseleave", () => {
        closeDropdown($searchLink, $headerSearch)
    }, false)
}

//HEADER SUBMENU LINKS
$headerMenuLinks.forEach($link => {
    $link.addEventListener("mouseover", () => {
        $headerTopMenu.style.height = "auto";
        $headerMenuLinks.forEach($link => {
            $link.classList.remove("active")
        });
        if (!$link.classList.contains("has-submenu")) {
            if ($headerSubMenus !== null) {
                $header.style.height = headerHeight + $headerMenu.offsetHeight + "px";
                $headerSubMenus.forEach($submenu => {
                    $submenu.classList.remove("active")
                });
            }
        }
    })
});
if ($headerLinksWithSubmenu !== null) {
    $headerLinksWithSubmenu.forEach($link => {
        const $subMenu = $link.nextElementSibling;
        let currentHeaderHeight;
        $link.addEventListener("mouseover", () => {
            currentHeaderHeight = $header.offsetHeight;
            $headerTopMenu.style.height = "auto";
            const subMenuHeight = $subMenu.offsetHeight;
            if (!$subMenu.classList.contains("active")) {
                setTimeout(() => {
                    $headerTopMenu.style.height = subMenuHeight + "px";
                    $header.style.height = currentHeaderHeight + subMenuHeight + "px";
                }, 100);
            } else {
                setTimeout(() => {
                    $header.style.height = currentHeaderHeight + "px";
                }, 100);
            }
            $link.classList.add("active")
            $subMenu.classList.add("active")
        })
    });
}

// HAMBURGER
const $hamburger = document.getElementById('hamburger');
const $hamburgerClose = document.getElementById('hamburger-close');
const openMenu = () => {
    $hamburger.classList.remove("active")
    openDropdown($hamburgerClose, $headerMenu)
    if ($shopLink !== null) {
        $shopLink.classList.remove("active")
    }
}
const closeMenu = () => {
    $hamburger.classList.add("active")
    $headerMenuLinks.forEach($link => {
        $link.classList.remove("active")
    });
    if ($shopLink !== null) {
        $shopLink.classList.remove("active")
    }
    if ($headerShopCats !== null) {
        $headerShopCats.classList.remove("active")
    }
    if ($headerSubMenus !== null) {
        $headerTopMenu.style.height = "auto";
        $headerSubMenus.forEach($submenu => {
            $submenu.classList.remove("active")
        });
    }
    closeDropdown($hamburgerClose, $headerMenu)
}
$hamburger.addEventListener("click", openMenu)
$hamburgerClose.addEventListener("click", closeMenu)
$header.addEventListener("mouseleave", closeMenu)
$headerOverlay.addEventListener("mouseenter", closeMenu)

const resizeWindow = () => {
    headerHeight = $headerMain.offsetHeight;
}

window.addEventListener("resize", resizeWindow, true)