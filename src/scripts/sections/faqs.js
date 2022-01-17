if(document.querySelector(".faqs__nav") !== null){

    const resizeWindow = () => {
        headerHeight = document.querySelector('.header__main').offsetHeight;
        if(document.querySelector(".announcement-bar") !== null){
            const announcementBarHeight = document.querySelector(".announcement-bar").offsetHeight
            document.querySelector(".faqs__nav").style.paddingTop = headerHeight + announcementBarHeight + "px"
            document.querySelectorAll(".faqs__section")[0].style.paddingTop = headerHeight + announcementBarHeight + "px"
        } else {
            document.querySelector(".faqs__nav").style.paddingTop = headerHeight + "px"
            document.querySelectorAll(".faqs__section")[0].style.paddingTop = headerHeight + "px"
        }
    }
    
    resizeWindow()
    
    window.addEventListener("resize", resizeWindow, true)

}
