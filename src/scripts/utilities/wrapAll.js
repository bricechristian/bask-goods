// Wrap an HTMLElement around another HTMLElement or an array of them.
export const wrapAll = el => {
   if(el !== null){

        const els = [...document.querySelectorAll(el)];
        console.log(els)
        const firstEl = els[0]
        const lastEl = els[els.length - 1];
        console.log(lastEl)
        const firstHtml = firstEl.outerHTML;
        const lastHtml = lastEl.outerHTML;

        firstEl.outerHTML = "<div class='wrap'>" + firstHtml;
        els[2].outerHTML = lastHtml + "</div>";
        
       
   }
};
