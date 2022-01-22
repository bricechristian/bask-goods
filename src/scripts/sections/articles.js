const moreItemsSection = document.querySelector(".article__more");
if(moreItemsSection !== null){
    // https://bask-goods.myshopify.com/admin/api/2022-01/blogs/84360036601/articles.json
    fetch("https://bask-goods.myshopify.com/admin/api/2022-01/blogs/84360036601/articles.json")
    .then( response => {
        console.log(response)
    })
}