 $(document).ready(() => {
    $("#openModal").on("click", function(e) {
      e.preventDefault();
      const target = $(this).data('target');
      $(`#${target}`).addClass('is-active');
    });
});
    

const clientId = "dcb4fb0557f74ae289fb0ebaab01d07d";
const clientSecret = "8fb7747e40784aa890919eac0f2969c8";
const redirectURI = "";
const code = undefined;
const authOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials',
    json: true,
};

let accessToken;

function fetchAccessToken() {
      // Make a request to Spotify's token endpoint to get an access token
      return fetch('https://accounts.spotify.com/api/token', authOptions)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to obtain access token');
              }
              return response.json();
          })
          .then(data => {
              accessToken = data.access_token;
              console.log('Access Token:', accessToken);
              resolve(); // Resolve the promise when access token is retrieved
          })
          .catch(error => {
              console.error('Error:', error.message);
              reject(error); // Reject the promise if there's an error
          });
  });
}


function search() {
    fetchAccessToken()
        .then(() => {
            // grabs input from search bar/form
            const query = $('#searchInput').val();
            // if there is no access token, stop
            if (!accessToken) {
                console.error('Access token is not available');
                return;
            }
            // actual fetch
            fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
                headers: {
                    Authorization: 'Bearer ${accessToken}'
                }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch search results');
                    }
                    return response.json();
                })
                .then(data => {
                    accessToken = data.access_token;
                    console.log('Access Token:', accessToken);
                    displaySearResults(data);
                })
                .catch(error => {
                    console.error('Error fetching access token:', error.message);
                });
    });
}

document.getElementById('searchButton').addEventListener('click', search);

function displaySearchResults(data) {
    const searchResults = data.tracks.items;

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    searchResults.forEach(track => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const trackName = document.createElement('p');
        trackName.textContent = track.name;

        const artistName = document.createElement('p');
        artistName.textContent = track.artists[0].name;

        const albumCover = document.createElement('img');
        albumCover.src = track.album.images[0].url;
        albumCover.alt = 'Album Cover';

        cardContent.appendChild(trackName);
        cardContent.appendChild(artistName);
        card.appendChild(albumCover);
        card.appendChild(cardContent);

        resultsContainer.appendChild(card);
    });
}
  
const apiKeyMusicNote = 'Ftz45OlejK7c1TotYb8ypOJFkUrrbJzF';
fetchMusicNotesGIF(apiKeyMusicNote);

function fetchMusicNotesGIF(apiKeyMusicNote) {
  const query = 'music notes';
  const apiUrlMusicNote = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyMusicNote}&q=${query}`;

  fetch(apiUrlMusicNote)
      .then(response => response.json())
      .then(data => {
          const gifUrl = data.data[0].images.original.url;
          displayMusicNotesGIF(gifUrl);
      })
      .catch(error => console.error('Error fetching GIF:', error));
}
  
function displayMusicNotesGIF(url) {
  const musicNotesDiv = document.getElementById('musicNotes');
  if (!musicNotesDiv) {
    const newDiv = document.createElement('div');
    newDiv.id = 'musicNotes';
    document.body.appendChild(newDiv);
    musicNotesDiv = newDiv;
  }

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Music Notes GIF';
  musicNotesDiv.appendChild(img);
}
  