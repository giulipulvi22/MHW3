const client_id='00b878d70a3e4399a5c0a3c3db3ce26a';
const client_secret='3b9b2694674546fb8de1d035e404c868';
let token;
let c=0;

function onJson(promise){
  const section=document.querySelector('section');
  if(c==0){
    item.remove();
    const newSep=document.createElement('div');
    newSep.classList.add('separatore');
    section.appendChild(newSep);

    const newTit=document.createElement('h1');
    newTit.textContent='Fotografi';
    section.appendChild(newTit);

    const article = document.createElement('article');
    section.appendChild(article);
    c=1;
  }
      
  const article=document.querySelector('article');

  for(let i=0; i<FOTOGRAFI.length; i++){
    if(FOTOGRAFI[i].playlist==promise.id){
      const newDiv = document.createElement('div');
      newDiv.classList.add('fotografo');
      article.appendChild(newDiv);

      const newFoto = document.createElement('img');
      newFoto.src=FOTOGRAFI[i].foto;
      newFoto.classList.add('foto');
      newDiv.appendChild(newFoto);

      const newInfo1 = document.createElement('div');
      newInfo1.classList.add('info1');
      newDiv.appendChild(newInfo1);

      const newName = document.createElement('p');
      newName.textContent=FOTOGRAFI[i].nome+' '+FOTOGRAFI[i].cognome;
      newName.classList.add('nome');
      newInfo1.appendChild(newName);

      const newCitt = document.createElement('p');
      newCitt.textContent=FOTOGRAFI[i].citta+' '+FOTOGRAFI[i].datanascita;
      newCitt.classList.add('txt');
      newInfo1.appendChild(newCitt);

      const newInizio = document.createElement('p');
      newInizio.textContent='scatta con noi dal '+FOTOGRAFI[i].datainizio;
      newInizio.classList.add('txt');
      newInfo1.appendChild(newInizio);

      const newInfoSpotify = document.createElement('div');
      newInfoSpotify.classList.add('infoSpot');
      newDiv.appendChild(newInfoSpotify);

      const newPlayName = document.createElement('p');
      newPlayName.textContent="Quando scatta ascolta '"+promise.name+"'";
      newPlayName.classList.add('musica');
      newInfoSpotify.appendChild(newPlayName);

      const newImg = document.createElement('img');
      newImg.src=promise.images[0].url;
      newImg.classList.add('image');
      newInfoSpotify.appendChild(newImg);

      const newInfoLink = document.createElement('div');
      newInfoLink.classList.add('infoLinks');
      newDiv.appendChild(newInfoLink);

      const newUrl1 = document.createElement('a');
      newUrl1.href=FOTOGRAFI[i].facebook;
      const butt1=document.createElement('img');
      butt1.src='immagini/facebook.png';
      butt1.classList.add('link1');
      newUrl1.appendChild(butt1);
      newInfoLink.appendChild(newUrl1);

      const newUrl2 = document.createElement('a');
      newUrl2.href=FOTOGRAFI[i].instagram;
      const butt2=document.createElement('img');
      butt2.src='immagini/instagram.png';
      butt2.classList.add('link2');
      newUrl2.appendChild(butt2);
      newInfoLink.appendChild(newUrl2);

      const newUrl3 = document.createElement('a');
      newUrl3.href=promise.external_urls.spotify;
      const butt3=document.createElement('img');
      butt3.src='immagini/spotify.png';
      butt3.classList.add('link3');
      newUrl3.appendChild(butt3);
      newInfoLink.appendChild(newUrl3);

      }
    }
}

function onResponse(response){
    return response.json();
}

function onTokenJson(promise){
    token=promise.access_token;
}

function onTokenResponse(response){
    return response.json();
}

fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}
).then(onTokenResponse).then(onTokenJson);


function playlist(event){
    event.currentTarget;
    for(let i=0; i<FOTOGRAFI.length; i++){

        const play=FOTOGRAFI[i].playlist;

        fetch('https://api.spotify.com/v1/playlists/'+ play,
            {
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
        }).then(onResponse).then(onJson);

    }
    
}

const item = document.querySelector('button');
item.addEventListener('click', playlist);


