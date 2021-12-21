const $header = document.querySelector('header')
const $nav = document.querySelector('nav')

// FLY AWAY HEADER
let lastScrollTop = 0;
let scrollSpeed = 0;
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
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        $header.classList.add('slide-up');
    } else {
        if (Math.abs(scrollSpeed) > 25) {
            $header.classList.remove('slide-up');
        }
    }
    if (st > 200) {
        $nav.classList.add('min');
    } else {
        $nav.classList.remove('min');
        $header.classList.remove('slide-up');
    }
    if (st == 0) {
        $header.classList.remove('slide-up');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


//DROPDOWNS
const $headerNav = $header.querySelector('.header nav').children;
const navChildren = [...$headerNav]
const $shopLink = document.getElementById('header-shop-link');
const $headerMain = $header.querySelector('.header__main');
let headerHeight = $headerMain.clientHeight;
const $headerShopCats = $header.querySelector('.header__categories');
const $headerMenu = $header.querySelector('.header__menu');
const $headerMenuLinks = $headerMenu.querySelectorAll(".header__link");
const $headerSubMenus = $header.querySelectorAll('.header__submenu');
const $headerLinksWithSubmenu = $header.querySelectorAll('a.has-submenu');

const openDropdown = (a, b) => {
    navChildren.forEach((el, i) => {
        if (i !== 0) {
            el.classList.remove("active")
            setTimeout(() => {
                el.style.display = "none";
            }, 25);
        }
    });
    if (a !== null) {
        a.classList.add("active");
    }
    if (b !== null) {
        setTimeout(() => {
            b.style.display = "block";
        }, 50);
        setTimeout(() => {
            b.classList.add("active")
        }, 75);
    }
    setTimeout(() => {
        $header.style.height = headerHeight + b.clientHeight + "px";
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
            b.style.display = "none";
        }, 25);
    }
    setTimeout(() => {
        $header.style.height = headerHeight + "px";
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

//HEADER SUBMENU LINKS
$headerMenuLinks.forEach($link => {
    $link.addEventListener("mouseover", () => {
        $headerMenuLinks.forEach($link => {
            $link.classList.remove("active")
        });
        if (!$link.classList.contains("has-submenu")) {
            if ($headerSubMenus !== null) {
                $header.style.height = headerHeight + $headerMenu.clientHeight + "px";
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
        const subMenuHeight = $subMenu.clientHeight;
        let currentHeaderHeight;
        $link.addEventListener("mouseover", () => {
            currentHeaderHeight = $header.clientHeight;
            if (!$subMenu.classList.contains("active")) {
                setTimeout(() => {
                    $header.style.height = currentHeaderHeight + subMenuHeight + "px";
                }, 25);
            } else {
                $header.style.height = currentHeaderHeight + "px";
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
        $headerSubMenus.forEach($submenu => {
            $submenu.classList.remove("active")
        });
    }
    closeDropdown($hamburgerClose, $headerMenu)
}
$hamburger.addEventListener("click", openMenu)
$hamburgerClose.addEventListener("click", closeMenu)
$header.addEventListener("mouseleave", closeMenu)

const resizeWindow = () => {
    headerHeight = $headerMain.clientHeight;
}

window.addEventListener("resize", resizeWindow, true)