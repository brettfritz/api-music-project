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
    // Make a request to spotifys token endpoint to get an access token
    fetch('https://accounts.spotify.com/api/token', authOptions)
    // If the response is not good, throw an error, if it is good, return json
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to obtain access token');
            }
            return response.json();
        })
        // console log the access token??
        .then(data => {
            accessToken = data.access_token;
            console.log('Access Token: ', accessToken)
        })
        // console log the access token??
        .then((data) => console.log(data));
}


function search() {
    // grabs input from search bar/form
    const query = $('#searchInput').val();
    // if there is no access token, stop
    if (!accessToken) {
        console.error('Access token is not available')
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
        displaySearchResults(data);
    })

    .catch(error => {
        console.error('Error:', error.message);
    })
}

