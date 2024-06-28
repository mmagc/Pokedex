function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const pokemonName = getQueryParameter('name');

if (pokemonName) {
    Promise.all([
        pokeApi.getPokemonDetailByName(pokemonName),
        pokeApi.getPokemonDescriptionByName(pokemonName)
    ]).then(([pokemon, description]) => {
        pokemon.desc = description;
        
        const pokemonDetailsElement = document.getElementById('pokemonDetails');
        pokemonDetailsElement.innerHTML = `
            <span class="number">#${pokemon.number}</span>
            <img src="${pokemon.photo}" class="pokemon-image">
            <div class="details">
                <h1>${pokemon.name}</h1>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class="Menu">
                    <button class="tab-button active" onclick="openTab(event, 'about')"><span>About</span></button>
                    <button class="tab-button" onclick="openTab(event, 'stats')"><span>Stats</span></button>
                    <button class="tab-button" onclick="openTab(event, 'moves')"><span>Moves</span></button>
                </div>
                <div id="about" class="tab-content">
                    <p>${pokemon.desc}</p>
                </div>
                <div id="stats" class="tab-content" style="display: none;">
                    <div class="stat-container">
                            <label>Attack</label>
                            <div class="progress-bar">
                                <div class="progress ${pokemon.type}" style="width: ${pokemon.attack}%;"></div>
                            </div>
                    </div>

                    <div class="stat-container">
                        <label>HP</label>
                        <div class="progress-bar">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.hp}%;"></div>
                        </div>
                    </div>

                    <div class="stat-container">
                        <label>Speed</label>
                        <div class="progress-bar">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.speed}%;"></div>
                        </div>
                    </div>
                </div>
                <div id="moves" class="tab-content" style="display: none;">
                    <div class="moves">
                        <ol>
                            ${pokemon.abilities.map((abilities) => `<li>${abilities}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        `;
        
        document.body.className = pokemon.type;
    }).catch(error => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
        const pokemonDetailsElement = document.getElementById('pokemonDetails');
        pokemonDetailsElement.innerText = 'Erro ao carregar detalhes do Pokémon.';
    });
} else {
    const pokemonDetailsElement = document.getElementById('pokemonDetails');
    pokemonDetailsElement.innerText = 'Nenhum Pokémon especificado';
}

function goBack() {
    window.location.href = 'index.html';
}

function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove the "active" class from all tab buttons
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Initialize with "About" tab active
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('about').style.display = 'block';
});
