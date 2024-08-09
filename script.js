const API_KEY="b0a48bbd59c24ecd824a5a70c126f25d"
const url="https://newsapi.org/v2/everything?q="
window.addEventListener('load',()=>fetchNews("India"))
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data=await res.json();
    console.log(data)
    bindData(data.articles)
    
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container')
    let newsCardTemplate=document.getElementById("template-news-card");
    cardsContainer.innerHTML=''
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        let cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
    })



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

}