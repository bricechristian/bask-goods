/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/header.js":
/*!******************************************!*\
  !*** ./src/scripts/components/header.js ***!
  \******************************************/
/***/ (() => {

eval("const $header = document.querySelector('header');\nconst $nav = document.querySelector('nav'); // FLY AWAY HEADER\n\nlet lastScrollTop = 0;\nlet scrollSpeed = 0;\n\nconst checkScrollSpeed = (settings => {\n  settings = settings || {};\n  let lastPos,\n      newPos,\n      timer,\n      delta,\n      delay = settings.delay || 50; // in \"ms\" (higher means lower fidelity )\n\n  function clear() {\n    lastPos = null;\n    delta = 0;\n  }\n\n  clear();\n  return function () {\n    newPos = window.scrollY;\n\n    if (lastPos != null) {\n      // && newPos < maxScroll \n      delta = newPos - lastPos;\n    }\n\n    lastPos = newPos;\n    clearTimeout(timer);\n    timer = setTimeout(clear, delay);\n    scrollSpeed = delta;\n  };\n})();\n\nwindow.addEventListener(\"scroll\", () => {\n  checkScrollSpeed();\n  let st = window.pageYOffset || document.documentElement.scrollTop;\n\n  if (st > lastScrollTop) {\n    $header.classList.add('slide-up');\n  } else {\n    if (Math.abs(scrollSpeed) > 25) {\n      $header.classList.remove('slide-up');\n    }\n  }\n\n  if (st > 200) {\n    $nav.classList.add('min');\n  } else {\n    $nav.classList.remove('min');\n    $header.classList.remove('slide-up');\n  }\n\n  if (st == 0) {\n    $header.classList.remove('slide-up');\n  }\n\n  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling\n}, false); //DROPDOWNS\n\nconst $headerNav = $header.querySelector('.header nav').children;\nconst navChildren = [...$headerNav];\nconst $shopLink = document.getElementById('header-shop-link');\nconst $headerMain = $header.querySelector('.header__main');\nlet headerHeight = $headerMain.clientHeight;\nconst $headerShopCats = $header.querySelector('.header__categories');\nconst $headerMenu = $header.querySelector('.header__menu');\nconst $headerMenuLinks = $headerMenu.querySelectorAll(\".header__link\");\nconst $headerSubMenus = $header.querySelectorAll('.header__submenu');\nconst $headerLinksWithSubmenu = $header.querySelectorAll('a.has-submenu');\n\nconst openDropdown = (a, b) => {\n  navChildren.forEach((el, i) => {\n    if (i !== 0) {\n      el.classList.remove(\"active\");\n      setTimeout(() => {\n        el.style.display = \"none\";\n      }, 25);\n    }\n  });\n\n  if (a !== null) {\n    a.classList.add(\"active\");\n  }\n\n  if (b !== null) {\n    setTimeout(() => {\n      b.style.display = \"block\";\n    }, 50);\n    setTimeout(() => {\n      b.classList.add(\"active\");\n    }, 75);\n  }\n\n  setTimeout(() => {\n    $header.style.height = headerHeight + b.clientHeight + \"px\";\n    $header.classList.add(\"dropdown-open\");\n  }, 50);\n};\n\nconst closeDropdown = (a, b) => {\n  if (a !== null) {\n    a.classList.remove(\"active\");\n  }\n\n  if (b !== null) {\n    b.classList.remove(\"active\");\n    setTimeout(() => {\n      b.style.display = \"none\";\n    }, 25);\n  }\n\n  setTimeout(() => {\n    $header.style.height = headerHeight + \"px\";\n    $header.classList.remove(\"dropdown-open\");\n  }, 50);\n}; //MAIN SHOP LINK\n\n\nif ($shopLink !== null && $headerShopCats !== null) {\n  $shopLink.addEventListener(\"mouseover\", () => {\n    if (!$headerShopCats.classList.contains(\"active\")) {\n      closeMenu();\n      openDropdown($shopLink, $headerShopCats);\n    }\n  }, false);\n  $header.addEventListener(\"mouseleave\", () => {\n    closeDropdown($shopLink, $headerShopCats);\n  }, false);\n} //HEADER SUBMENU LINKS\n\n\n$headerMenuLinks.forEach($link => {\n  $link.addEventListener(\"mouseover\", () => {\n    $headerMenuLinks.forEach($link => {\n      $link.classList.remove(\"active\");\n    });\n\n    if (!$link.classList.contains(\"has-submenu\")) {\n      if ($headerSubMenus !== null) {\n        $header.style.height = headerHeight + $headerMenu.clientHeight + \"px\";\n        $headerSubMenus.forEach($submenu => {\n          $submenu.classList.remove(\"active\");\n        });\n      }\n    }\n  });\n});\n\nif ($headerLinksWithSubmenu !== null) {\n  $headerLinksWithSubmenu.forEach($link => {\n    const $subMenu = $link.nextElementSibling;\n    const subMenuHeight = $subMenu.offsetHeight;\n    let currentHeaderHeight;\n    $link.addEventListener(\"mouseover\", () => {\n      currentHeaderHeight = $header.clientHeight;\n\n      if (!$subMenu.classList.contains(\"active\")) {\n        $header.style.height = currentHeaderHeight + subMenuHeight + \"px\";\n      } else {\n        $header.style.height = currentHeaderHeight + \"px\";\n      }\n\n      $link.classList.add(\"active\");\n      $subMenu.classList.add(\"active\");\n    });\n  });\n} // HAMBURGER\n\n\nconst $hamburger = document.getElementById('hamburger');\nconst $hamburgerClose = document.getElementById('hamburger-close');\n\nconst openMenu = () => {\n  $hamburger.classList.remove(\"active\");\n  openDropdown($hamburgerClose, $headerMenu);\n\n  if ($shopLink !== null) {\n    $shopLink.classList.remove(\"active\");\n  }\n};\n\nconst closeMenu = () => {\n  $hamburger.classList.add(\"active\");\n  $headerMenuLinks.forEach($link => {\n    $link.classList.remove(\"active\");\n  });\n\n  if ($shopLink !== null) {\n    $shopLink.classList.remove(\"active\");\n  }\n\n  if ($headerShopCats !== null) {\n    $headerShopCats.classList.remove(\"active\");\n  }\n\n  if ($headerSubMenus !== null) {\n    $headerSubMenus.forEach($submenu => {\n      $submenu.classList.remove(\"active\");\n    });\n  }\n\n  closeDropdown($hamburgerClose, $headerMenu);\n};\n\n$hamburger.addEventListener(\"click\", openMenu);\n$hamburgerClose.addEventListener(\"click\", closeMenu);\n$header.addEventListener(\"mouseleave\", closeMenu);\n\nconst resizeWindow = () => {\n  headerHeight = $headerMain.clientHeight;\n};\n\nwindow.addEventListener(\"resize\", resizeWindow, true);\n\n//# sourceURL=webpack://bask-goods/./src/scripts/components/header.js?");

/***/ }),

/***/ "./src/scripts/theme.js":
/*!******************************!*\
  !*** ./src/scripts/theme.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_theme_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/theme.scss */ \"./src/styles/theme.scss\");\n/* harmony import */ var _components_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header.js */ \"./src/scripts/components/header.js\");\n/* harmony import */ var _components_header_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_header_js__WEBPACK_IMPORTED_MODULE_1__);\n//SCSS\n //JS\n\n\n\n//# sourceURL=webpack://bask-goods/./src/scripts/theme.js?");

/***/ }),

/***/ "./src/styles/theme.scss":
/*!*******************************!*\
  !*** ./src/styles/theme.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bask-goods/./src/styles/theme.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/theme.js");
/******/ 	
/******/ })()
;