const $header = document.querySelector('header')
const $nav = document.querySelector('nav')
const $hamburger = document.getElementById('hamburger');
const $hamburgerClose = document.getElementById('hamburger-close');

//DROPDOWNS
const $headerOverlay = document.querySelector('.header__overlay');
const $headerNav = $header.querySelector('.header nav').children;
const navChildren = [...$headerNav]
const $shopLink = document.getElementById('header-shop-link');
const $searchLinks = document.querySelectorAll('.header-search-link');
const $headerMain = $header.querySelector('.header__main');
const $headerMainLinks = $headerMain.querySelectorAll(".header__link");
let headerHeight = $headerMain.offsetHeight;
const $headerShopCats = $header.querySelector('.header__categories');
const $headerSearch = $header.querySelector('.header__search');
const $headerMenu = $header.querySelector('.header__menu');
const $headerTopMenu = $header.querySelector('.header__menu-top');
const $headerMenuLinks = $headerMenu.querySelectorAll("a.header__link");
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
    if ( b !== null) {
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
    const handleShopLink = e => {
        e.preventDefault()
        if (!$headerShopCats.classList.contains("active")) {
            setTimeout(() => {
                closeMenu()
                openDropdown($shopLink, $headerShopCats)
            }, 51);
        }        
    }
    ['mouseover', 'click'].forEach( evt => {
        $shopLink.addEventListener(evt, handleShopLink, false)
    });      
    $header.addEventListener("mouseleave", () => {
        closeDropdown($shopLink, $headerShopCats)
    }, false)
}

//HEADER LINKS
$headerMainLinks.forEach($link => {
    const handleMainLinks = () => {
        if ($headerSearch.classList.contains("active")) {
            $searchLinks.forEach($searchLink => {
                closeDropdown($searchLink, $headerSearch)
            });
        }
        if ($headerShopCats.classList.contains("active")) {
            closeDropdown($shopLink, $headerShopCats)
        }     
        
        setTimeout(() => {
            if($header.classList.contains("header__wordmark") || $header.classList.contains("header__wordmark-brown")){
                $header.style.height = "160px";
            } else {
                $header.style.height = "135px";
            }
            $headerOverlay.classList.add("active");
            $header.classList.add("dropdown-open");
            $headerMenu.classList.remove("active")
            $hamburger.classList.add("active")
            $hamburgerClose.classList.remove("active")
        }, 50);             
    }
    ['mouseover', 'click'].forEach( evt => {
        $link.addEventListener(evt, handleMainLinks, false)
    });    
})
$headerMenuLinks.forEach($link => {

    const handleHeaderMenuLinks = () => {
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
    }
    ['mouseover', 'click'].forEach( evt => {
        $link.addEventListener(evt, handleHeaderMenuLinks, false)
    });  

});
if ($headerLinksWithSubmenu !== null) {
    $headerLinksWithSubmenu.forEach($link => {
        const $subMenu = $link.nextElementSibling;
        let currentHeaderHeight;
        const handleSubMenuLinks = e => {
            e.preventDefault();
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
            setTimeout(() => {
                $link.classList.add("active")
                $subMenu.classList.add("active")
            }, 125);
        }
        ['mouseover', 'click'].forEach( evt => {
            $link.addEventListener(evt, handleSubMenuLinks, false)
        });          
    });
}

//MAIN SEARCH LINK
if ($searchLinks !== null && $headerSearch !== null) {
    $searchLinks.forEach($searchLink => {
        const handleSearchLinks = () => {
            if (!$headerSearch.classList.contains("active")) {
                // closeMenu()
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
        }
        ['mouseover', 'click'].forEach( evt => {
            $searchLink.addEventListener(evt, handleSearchLinks, false)
        });  
        $header.addEventListener("mouseleave", () => {
            closeDropdown($searchLink, $headerSearch)
        }, false)
    });
}

// HAMBURGER
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
$hamburgerClose.addEventListener("click", () => {
    $searchLinks.forEach($searchLink => {
        closeDropdown($searchLink, $headerSearch)
    });    
    closeMenu()
})
$header.addEventListener("mouseleave", closeMenu)
$headerOverlay.addEventListener("mouseenter", closeMenu)

const resizeWindow = () => {
    headerHeight = $headerMain.offsetHeight;
    document.querySelectorAll('.header__menu .toggle-trigger').forEach($trigger => {
        $trigger.classList.remove("active")
    });
}

window.addEventListener("resize", resizeWindow, true)

window.addEventListener("load", () => {
    $header.classList.add("swiped-down")
    if(window.scrollY > $header.offsetHeight){
        $header.classList.add("active")
    }
}, true)