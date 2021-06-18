async function getApiFilmesPopulares() {
  let response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=d1062712c584fc983db14e2302010486&language=pt-BR&page=1");
  let data = await response.json();
  return data;
}

async function getMovieDetails(id) {
  let response = await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=d1062712c584fc983db14e2302010486&language=pt-BR");
  let data = await response.json();
  return data;
}

function loadFilmesPopulares() {
  
  getApiFilmesPopulares().then(data => {
    const movies = data.results;
    let carrousel = document.querySelector('.carousel-inner'); 
    let carrouselIndicators = document.querySelector('.carousel-indicators'); 
    console.log(Object.keys(movies));
    Object.keys(movies).forEach( function(key, value) {
      getMovieDetails(movies[key].id).then(details => {
      let indicators = document.createElement('button');
      

      let carouselItem = document.createElement('div');
      if(key == 0)
        carouselItem.classList.add('carousel-item', 'active');
      else  
        carouselItem.classList.add('carousel-item');

      let panel  = document.createElement('div');
      panel.classList.add('row');
      
      let banner = document.createElement('div');
      banner.classList.add('banner', 'col-sm-12', 'col-lg-6');
      let img = document.createElement('img');
      img.src = "https://image.tmdb.org/t/p/w500" + movies[key].poster_path;
      img.addEventListener("click", () => {
        window.open(
          details.homepage,
          '__blank'
        )
      })
      banner.appendChild(img);
      panel.appendChild(banner);

      let descricao = document.createElement('div');
      descricao.classList.add('descricao', 'col-sm-12', 'col-lg-6');
      let titulo = document.createElement('h3');
      titulo.innerHTML = movies[key].title;
      descricao.appendChild(titulo);

      let sinopse = document.createElement('p');
      sinopse.classList.add('sinopse');
      sinopse.innerHTML = "<b>Sinopse:</b> " + movies[key].overview;
      descricao.appendChild(sinopse);

      let infos = document.createElement('div');
      infos.classList.add('row', 'infos');
      let estreia = document.createElement('p');
      estreia.classList.add('col-4');
      estreia.innerHTML = "<b>Estreia:</b> " + movies[key].release_date;
      infos.appendChild(estreia);
      descricao.appendChild(infos);

      let elenco = document.createElement('div');
      elenco.innerHTML = "<b>Produção:</b>";
      let elencoNames = document.createElement('p');
      elencoNames.innerHTML = details.production_companies[0].name;  
      elenco.appendChild(elencoNames);
      descricao.appendChild(elenco);

      let avaliacao = document.createElement('div');
      avaliacao.innerHTML = "<b>Avaliação:</b> " + movies[key].vote_average;
      descricao.appendChild(avaliacao);

      panel.appendChild(descricao);

      carouselItem.appendChild(panel);

      carrousel.appendChild(carouselItem);
    })
    })
  })

}

window.onload = () => {
  loadFilmesPopulares();

}