const BASEURL1 = "https://api.jikan.moe/v3"
/*const BASEURL2 = "https://animechan.vercel.app/api/quotes"
const BASEURL3 = "https://animechan.vercel.app/api/random"*/


function getQuote(){
    fetch(BASEURL3)
      .then(response => response.json())
      .then(quotes => console.log(quotes))
}

function getAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");
   
    fetch(`${BASEURL1}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));

    fetch(`${BASEURL1}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(data => console.log(data))
    .catch(err=>console.warn(err.message));

}

function updateDom(data){
const searchResults = document.getElementById('search-results');

const animeByCategories = data.results
    .reduce((acc, anime)=>{

        const {type} = anime;
        if(acc[type] === undefined) acc[type] = [];
        acc[type].push(anime);
        return acc;

    }, {});

    searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

        const animesHTML = animeByCategories[key]
        .map(anime=>{
            return `
                <div class="card">
                    <div class="card-image">
                        <img src="${anime.image_url}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${anime.title}</span>
                        <p>${anime.synopsis}</p>
                    </div>
                </div>
            `
        }).join("");


        return `
            <section>
                <h3>${key.toUpperCase()}</h3>
                <div class="kemicofa-row">${animesHTML}</div>
            </section>
        `
    }).join("");
}







function pageLoaded(){
    const form = document.getElementById('user-search');
    form.addEventListener("submit",  getAnime);
}

window.addEventListener("load", pageLoaded);

/*getQuote();*/