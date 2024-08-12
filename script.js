const API_KEY="b0a48bbd59c24ecd824a5a70c126f25d"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"))


async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data=await res.json();
    console.log(data)
    bindData(data.articles)
    
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    let newsImg=cardClone.querySelector('#news-img');
    let newsTitle=cardClone.querySelector('#news-title');
    let newsSource=cardClone.querySelector('#news-source');
    let newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src= article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML=article.description;

    const date =new Date (article.publishedAt).toLocaleString("en-US",{
        tmeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML=`${article.source.name}.${date}`
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
function searchNews(){
    let query=document.getElementById('news-input').value
    fetchNews(query);

}
let curSelectedItem=null;
function onClickNavItem(navElement){
    let element=document.getElementById(navElement)
    if ( curSelectedItem==element){
        element.classList.remove("selected");
        curSelectedItem=null;
        fetchNews(navElement)
        return ;
    }
    if ( curSelectedItem){
        curSelectedItem.classList.remove("selected");
        
    }
    element.classList.add("selected");
    curSelectedItem=element;
    fetchNews(navElement)
    


}





