// Get a reference to the container for displaying character information
const characterInfoContainer = document.getElementById('character-info-container');

// Get the character ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

// Check if characterId is present in the URL
if (characterId) {
    // Call a function to fetch and display character information
    displayCharacterInfo(characterId);
} else {
    // Handle the case when there is no character ID in the URL
    characterInfoContainer.innerHTML = 'No character selected.';
}

// Function to fetch and display character information
async function displayCharacterInfo(characterId) {
    // Create the URL for fetching character details
    const charInfoUrl = `http://gateway.marvel.com/v1/public/characters/${characterId}?&ts=1&apikey=4906069c197e411cb19caa044c992842&hash=409eb1707112052380109d1472a0dc44`;

    try {
        const response = await fetch(charInfoUrl);
        const data = await response.json();

        // Extract character information from the API response
        const characterData = data.data.results[0];

        // Construct the HTML to display character information
        const characterInfoHTML = `
            <div class="hero-name">${characterData.name}</div>
            <div class="flex hero-img-and-more-info">
                <img id="portraitImage" class="hero-img" src="${characterData.thumbnail.path}.jpg" alt="">
                <div class="more-info">
                    <div class="id">
                        <b>ID:</b><span>${characterData.id}</span>
                    </div>
                    <div class="comics">
                        <b>Comics:</b><span>${characterData.comics.available}</span>
                    </div>
                    <div class="series">
                        <b>Series:</b><span>${characterData.series.available}</span>
                    </div>
                    <div class="stories">
                        <b>Stories:</b><span>${characterData.stories.available}</span>
                    </div>
                </div>
            </div>
            <div class="hero-description">
                <b>Description:</b>
                <p>${characterData.description || "No Description Available"}</p>
            </div>
        `;

        // Update the character info container with the HTML
        characterInfoContainer.innerHTML = characterInfoHTML;
    } catch (error) {
        console.error('Error fetching character information:', error);
        characterInfoContainer.innerHTML = 'Error fetching character information.';
    }
}
