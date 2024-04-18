$('#flashMessage').hide();

$(document).ready(() => {
  $("#results-container").empty(); // Clear search results container on page load
  localStorage.removeItem("recent-searches");

  // function to close modal
  function closeModal() {
    $("#myModal").removeClass("is-active");
  }

  // function to open modal
  $("#openModal").on("click", function (e) {
    e.preventDefault();
    const target = $(this).data("target");
    $(`#${target}`).addClass("is-active");

    // Clear the search field when modal is opened
    $("#search-input").val("");
  });

  // closes the modal if we  click outside of it
  $(".modal-background, .delete").on("click", function (event) {
    event.preventDefault();
    closeModal();
  });

  // Event listener for form submission
  $("#searchButton").on("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const searchTerm = $("#search-input").val().trim();
    if (searchTerm === "") {
      // Display flash message if the search input field is empty
      $('#flashMessage').appendTo('body').slideDown(1000).delay(3000).slideUp();
    } else {
      closeModal(); // Close the modal after search button click
      search();
    }
  });

  // Event listener for pressing Enter key in the search input field
  $("#search-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
      // Trigger search button click when Enter key is pressed
      $("#searchButton").click();
    }
  });
});

const clientId = "dcb4fb0557f74ae289fb0ebaab01d07d";
const clientSecret = "8fb7747e40784aa890919eac0f2969c8";
const redirectURI = "";
const code = undefined;
const authOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
  },
  body: "grant_type=client_credentials",
  json: true,
};

let accessToken;

function fetchAccessToken() {
  // Return a promise that resolves with the access token or rejects with an error
  return fetch("https://accounts.spotify.com/api/token", authOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to obtain access token");
      }
      return response.json();
    })
    .then((data) => {
      accessToken = data.access_token;
      console.log("Access Token:", accessToken);
      return accessToken; // Return the access token
    })
    .catch((error) => {
      console.error("Error:", error.message);
      throw error; // Throw the error to propagate it to the next catch block
    });
}
let recentSearches = JSON.parse(localStorage.getItem("recent-searches")) || [];

function addToLocalStorage(query) {
  if (!recentSearches.includes(query)) {
    recentSearches.unshift(query); // Add query to the beginning of the array
    // Limit recent searches to 5 items
    if (recentSearches.length > 5) {
      recentSearches.pop(); // Remove the last item if there are more than 5
    }
    localStorage.setItem("recent-searches", JSON.stringify(recentSearches)); // Store recent searches in localStorage
    displayRecentSearches(); // Update UI with recent searches
  }
}


function displayRecentSearches() {
  const recentSearchesContainer = document.getElementById('recent-searches');
  recentSearchesContainer.innerHTML = '';

  recentSearches.forEach(query => {
    const searchItem = document.createElement('div');
    searchItem.classList.add('column', 'is-half');
    
    const button = document.createElement('button');
    button.classList.add('button', 'search-history-btn');
    button.textContent = query;
    button.addEventListener('click', () => {
      window.location.href = "index2.html";
      const encodedQuery = encodeURIComponent(query);
      window.location.href = `index2.html?query=${encodedQuery}`;
    });

    searchItem.appendChild(button);
    recentSearchesContainer.appendChild(searchItem);
  });
}


displayRecentSearches();


function search() {
  fetchAccessToken().then(() => {
    const query = $("#search-input").val().trim();
    addToLocalStorage(query); // Store the search query
    console.log(query);
    // if there is no access token, stop
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Add console log to check the fetched data
        displaySearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching access token:", error.message);
      });
  });
}

document.getElementById("searchButton").addEventListener("click", search);

function displaySearchResults(data) {
  const searchResults = data.tracks.items;

  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  searchResults.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const trackName = document.createElement("p");
    trackName.textContent = track.name;

    const artistName = document.createElement("p");
    artistName.textContent = track.artists[0].name;

    const albumCover = document.createElement("img");
    albumCover.src = track.album.images[0].url;
    albumCover.alt = "Album Cover";

    cardContent.appendChild(trackName);
    cardContent.appendChild(artistName);
    card.appendChild(albumCover);
    card.appendChild(cardContent);

    resultsContainer.appendChild(card);
  });
}

const apiKeyMusicNote = "Ftz45OlejK7c1TotYb8ypOJFkUrrbJzF";
fetchMusicNotesGIF(apiKeyMusicNote);

function fetchMusicNotesGIF(apiKeyMusicNote) {
  const query = "music notes";
  const apiUrlMusicNote = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyMusicNote}&q=${query}`;

  fetch(apiUrlMusicNote)
    .then((response) => response.json())
    .then((data) => {
      const gifUrl = data.data[0].images.original.url;
      displayMusicNotesGIF(gifUrl);
    })
    .catch((error) => console.error("Error fetching GIF:", error));
}

function displayMusicNotesGIF(url) {
  const musicNotesDiv = document.getElementById("musicNotes");
  if (!musicNotesDiv) {
    const newDiv = document.createElement("div");
    newDiv.id = "musicNotes";
    document.body.appendChild(newDiv);
    musicNotesDiv = newDiv;
  }

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Music Notes GIF";
  musicNotesDiv.appendChild(img);
}