
// Add event listener for modal
// Function to fetch music data


// spotify client id: dcb4fb0557f74ae289fb0ebaab01d07d

// spotify client secret: 8fb7747e40784aa890919eac0f2969c8

// http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'







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
// }
 

$(document).ready(() => {
  const $modal = $('#myModal');
  const $openModal = $('#openModal');
  const $closeModal = $('#closeModal');

  $openModal.on('click', () => {
      $modal.addClass('is-active');
  });

  $closeModal.on('click', () => {
      $modal.removeClass('is-active');
  });

  $modal.on('click', event => {
      if ($(event.target).hasClass('modal-background') || $(event.target).hasClass('modal-close')) {
          $modal.removeClass('is-active');
      }
  });

  $(document).on('keydown', event => {
      if (event.key === 'Escape' && $modal.hasClass('is-active')) {
          $modal.removeClass('is-active');
      }
  });
});

