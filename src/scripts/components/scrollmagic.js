import ScrollMagic from 'scrollmagic';
import { TweenMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

const $header = document.querySelector("header");
const $hero = document.querySelector(".full__hero");

let controller = new ScrollMagic.Controller();

//HEADER
// new ScrollMagic.Scene({
//     triggerHook: 0,
//     duration: $header.offsetHeight 
// })
// .setTween($header, { y: -$header.offsetHeight })
// .addTo(controller)

new ScrollMagic.Scene()
.addTo(controller)
.on('update',function(event){
    const direction = controller.info("scrollDirection");
    if(event.scrollPos > $header.offsetHeight){
        $header.classList.add("active")
        if(direction === "REVERSE"){
            $header.classList.remove("swiped-up")
            $header.classList.add("swiped-down")
        } else {
            $header.classList.add("swiped-up")
            $header.classList.remove("swiped-down")
        }
    } else {
        $header.classList.remove("active")
        $header.classList.remove("swiped-up")
        if(direction !== "REVERSE"){
            $header.classList.remove("swiped-down")
        }
    }

    if(event.scrollPos > window.innerHeight + 600){
        document.querySelector("body").classList.add("scrolled-past-hero")
    } else {
        document.querySelector("body").classList.remove("scrolled-past-hero")
    }
});