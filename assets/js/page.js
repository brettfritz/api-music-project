
document.addEventListener("DOMContentLoaded", () => {
    const recentSearches = JSON.parse(localStorage.getItem("recent-searches")) || [];
    const lastSearchQuery = recentSearches[0]; // Get the last search query from recent searches

    if (lastSearchQuery) {
        search(lastSearchQuery); // Perform the search using the last query
    } else {
        console.log("No recent search query found.");
    }
});

function search(query) {
    fetchAccessToken().then(() => {
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
            console.log(data); // Log the fetched data for debugging
            displaySearchResults(data);
        })
        .catch((error) => {
            console.error("Error fetching search results:", error.message);
        });
    });
}

function displaySearchResults(data) {
    const searchResults = data.tracks.items;
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    searchResults.forEach((track) => {
        console.log("Processing track:", track); // Debugging log

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

        console.log("Created card:", card); // Debugging log

        resultsContainer.appendChild(card);
    });
}



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

