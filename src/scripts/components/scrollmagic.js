import ScrollMagic from 'scrollmagic';
import { TweenMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

const $header = document.querySelector("header");
const scrollEls = document.querySelectorAll("[data-viewport]");
const parallaxEls = document.querySelectorAll(".parallax");
// const $hero = document.querySelector(".full__hero");

let controller = new ScrollMagic.Controller();

//HEADER
// new ScrollMagic.Scene({
//     triggerHook: 0,
//     duration: $header.offsetHeight 
// })
// .setTween($header, { y: -$header.offsetHeight })
// .addTo(controller)

// new ScrollMagic.Scene()
// .addTo(controller)
// .on('update',function(event){
//     const direction = controller.info("scrollDirection");
//     if(event.scrollPos > $header.offsetHeight){
//         $header.classList.add("active")
//         if(direction === "REVERSE"){
//             $header.classList.remove("swiped-up")
//             $header.classList.add("swiped-down")
//         } else {
//             $header.classList.add("swiped-up")
//             $header.classList.remove("swiped-down")
//         }
//     } else {
//         $header.classList.remove("active")
//         $header.classList.remove("swiped-up")
//         if(direction !== "REVERSE"){
//             $header.classList.remove("swiped-down")
//         }
//     }

//     if(event.scrollPos > window.innerHeight + 600){
//         document.querySelector("body").classList.add("scrolled-past-hero")
//     } else {
//         document.querySelector("body").classList.remove("scrolled-past-hero")
//     }
// });

if(scrollEls !== null){
    scrollEls.forEach(el => {
        let offset = 0;
        if(el.getAttribute('data-viewport') !== ''){
            offset = parseInt(el.getAttribute('data-viewport'))
        }
        new ScrollMagic.Scene({
            triggerElement: el,
            offset: offset, 
            reverse: false
        })
        .setClassToggle(el, 'in-view')
        .addTo(controller)
    });
}

if(parallaxEls !== null){
    parallaxEls.forEach(el => {
        let triggerEl = el;
        let offset = 0;
        let shiftX = 0;
        let shiftY = 0;
        if(el.getAttribute('data-parallax-trigger') !== ''){
            triggerEl = parseInt(el.getAttribute('data-parallax-trigger'))
        }            
        if(el.getAttribute('data-parallax-offset') !== ''){
            offset = parseInt(el.getAttribute('data-parallax-offset'))
        }           
        if(el.getAttribute('data-parallax-x') !== ''){
            shiftX = parseInt(el.getAttribute('data-parallax-x'))
        }          
        if(el.getAttribute('data-parallax-y') !== ''){
            shiftY = parseInt(el.getAttribute('data-parallax-y'))
        }      
        new ScrollMagic.Scene({
            triggerElement: triggerEl,
            offset: offset,
            duration: window.innerHeight * 2
        })
        .setTween(el, 0.5, { y: shiftY, x: shiftX })
        .addTo(controller)
    });    
}