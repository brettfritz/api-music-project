
// Add event listener for modal
// Function to fetch music data


// spotify client id: dcb4fb0557f74ae289fb0ebaab01d07d

// spotify client secret: 8fb7747e40784aa890919eac0f2969c8

// http GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
//   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'


(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    openModal($target);
  });
});




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
// $(document).ready(function() {
//   const $modal = $('#myModal');
//   const $openModal = $('#openModal');

//   // Function to open the modal
//   function openModal() {
//       $modal.addClass('is-active');
//   }

//   // Event listener for opening the modal
//   $openModal.click(function() {
//       openModal();
//   });
// });



//   // Event listener for closing the modal
//   $closeModal.click(() => {
//       closeModal();
//   });

//   // Event listener for clicking on modal background or close button to close modal
//   $modal.on('click', event => {
//       if ($(event.target).hasClass('modal-background') || $(event.target).hasClass('modal-close')) {
//           closeModal();
//       }
//   });

//   // Event listener for pressing Escape key to close modal
//   $(document).on('keydown', event => {
//       if (event.key === 'Escape' && $modal.hasClass('is-active')) {
//           closeModal();
//       }
//   });
// });
