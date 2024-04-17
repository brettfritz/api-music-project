
    document.addEventListener('DOMContentLoaded', function() {
      displayRecentSearches();
      
      function displayRecentSearches() {
        const recentSearches = JSON.parse(localStorage.getItem('recent-searches')) || [];
        console.log('Recent Searches:', recentSearches); // Log recent searches
        const recentSearchesContainer = document.getElementById('recent-searches');
        recentSearchesContainer.innerHTML = '';

        recentSearches.forEach(query => {
            const searchItem = document.createElement('div');
            searchItem.classList.add('recent-search');
            searchItem.textContent = query;
            searchItem.addEventListener('click', () => {
                console.log('Clicked query:', query); // Log clicked query
                fetchSearchResults(query);
            });
            recentSearchesContainer.appendChild(searchItem);
        });
      }

      function fetchSearchResults(query) {
        fetchAccessToken()
            .then(() => {
                // if there is no access token, stop
                if (!accessToken) {
                    console.error('Access token is not available');
                    return;
                }
                // actual fetch
                const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`;
                console.log('API URL:', apiUrl); // Log API URL
                fetch(apiUrl, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken 
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch search results');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Search Results:', data); // Log search results
                    displaySearchResults(data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error.message);
                });
        });
      }

      function displaySearchResults(data) {
        const searchResults = data.tracks.items;

        const resultsContainer = document.getElementById('musicCards');
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
    });

