import Flickity from "flickity-imagesloaded";

var tapArea, startX ;
tapArea = document.querySelectorAll('.carousel');
startX = 0;
for (var item of tapArea) {
    item.ontouchstart = function(e) {
        startX = e.touches[0].clientX;
    };
    item.ontouchmove = function(e) {
        if (Math.abs(e.touches[0].clientX - startX) > 5 && e.cancelable ) {
            e.preventDefault();
        }
    };
}