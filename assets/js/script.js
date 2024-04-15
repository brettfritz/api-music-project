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
    return new Promise((resolve, reject) => {
        // Make a request to Spotify's token endpoint to get an access token
        fetch('https://accounts.spotify.com/api/token', authOptions)
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
            return fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken // Corrected string interpolation
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            return response.json();
        })
        
        .then(data => {
            console.log(data);
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-btn');

    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default button behavior
        search();
    });
});


$(document).ready(() => {
  const modal = $('#myModal');
  const openModal = $('#openModal');
  const closeModal = $('#closeModal');

  openModal.on('click', () => {
      modal.addClass('is-active');
  });

  closeModal.on('click', () => {
      modal.removeClass('is-active');
  });

  modal.on('click', event => {
      if ($(event.target).hasClass('modal-background') || $(event.target).hasClass('modal-close')) {
          modal.removeClass('is-active');
      }
  });

  $(document).on('keydown', event => {
      if (event.key === 'Escape' && $modal.hasClass('is-active')) {
          modal.removeClass('is-active');
      }
  });
});

$(document).ready(function () {
    function openModal(event) {
      const target = $(event.currentTarget).data('target');
      $(`#${target}`).addClass('is-active');
    }
  
    $('.js-modal-trigger').click(openModal);
  
    $('.js-modal-close').click(function () {
      $('.modal').removeClass('is-active');
    });
  
    $(document).keydown(function (event) {
      if (event.key === "Escape") {
        closeAllModals();
      }
    });
  
    function closeAllModals() {
      $('.modal').removeClass('is-active');
    }
  });
  
  
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
  