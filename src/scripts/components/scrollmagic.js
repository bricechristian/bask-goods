import ScrollMagic from 'scrollmagic';
import { TweenMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

const $header = document.querySelector("header");

let controller = new ScrollMagic.Controller();


//HEADER
new ScrollMagic.Scene({
    triggerElement: document.querySelector("body"),
    triggerHook: 0,
    duration: $header.offsetHeight 
})
.setTween($header, { y: -$header.offsetHeight })
.addTo(controller)

console.log($header.offsetHeight)
