
// Add event listener for modal
// Function to fetch music data




// http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'





var client_id = '';
var client_secret = '';

var authOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
  },
  body: 'grant_type=client_credentials',
  json: true,
};

fetch('https://accounts.spotify.com/api/token', authOptions)
  .then((res) => res.json())
  .then((data) => console.log(data));


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





// document.addEventListener('DOMContentLoaded', () => {
//     // Functions to open and close a modal
//     function openModal($el) {
//       $el.classList.add('is-active');
//     }
  
//     function closeModal($el) {
//       $el.classList.remove('is-active');
//     }
  
//     function closeAllModals() {
//       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
//         closeModal($modal);
//       });
//     }
  
//     // Add a click event on buttons to open a specific modal
//     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
//       const modal = $trigger.dataset.target;
//       const $target = document
//       .getElementById(modal);
  
//       $trigger.addEventListener('click', () => {
//         openModal($target);
//       });
//     });
  
//     // Add a click event on various child elements to close the parent modal
//     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
//       const $target = $close.closest('.modal');
  
//       $close.addEventListener('click', () => {
//         closeModal($target);
//       });
//     });
  
//     // Add a keyboard event to close all modals
//     document.addEventListener('keydown', (event) => {
//       if(event.key === "Escape") {
//         closeAllModals();
//       }
//     });
//   });