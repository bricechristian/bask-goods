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
let loaded = false;
new ScrollMagic.Scene()
.addTo(controller)
.on('update',function(event){
    if(loaded){
        if(event.scrollPos > $header.offsetHeight){
            $header.classList.add("active")
        } else {
            if(event.scrollPos === 0){
                $header.classList.remove("active")
            }
        }
    }
    loaded = true;
});

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