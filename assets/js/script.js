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


const apiKey = 'Ftz45OlejK7c1TotYb8ypOJFkUrrbJzF';
fetchMusicNotesGIF(apiKey);

function fetchMusicNotesGIF(apiKey) {
  const query = 'music notes';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;

  fetch(apiUrl)
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



// spotify client id: dcb4fb0557f74ae289fb0ebaab01d07d

// spotify client secret: 8fb7747e40784aa890919eac0f2969c8

// // http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
// //   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'


//   curl --request GET \
//   'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
//    --header "Authorization: Bearer NgCXRK...MzYjw"

// The following code implements the getProfile() function which performs the API call to the Get Current User's Profile endpoint to retrieve the user profile related information:

// async function getProfile(accessToken) {
// let accessToken = localStorage.getItem('access_token');

// const response = await fetch('https://api.spotify.com/v1/me', {
//   headers: {
//     Authorization: 'Bearer ' + accessToken
//   }
// });

// const data = await response.json();
