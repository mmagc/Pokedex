/*function convertPokemonTypesToHtml (pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)

}*/
const pokemonListElement = document.getElementById('pokemonList');
        const loadMore = document.getElementById('loadMore');

        const maxRecords = 151;
        const limit = 12;
        let offset = 0;

        function convertPokemonHtml(pokemon) {
            const li = document.createElement('li');
            li.classList.add('pokemon', pokemon.type);
            li.innerHTML = `
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}">
                </div>
            `;
            li.addEventListener('click', () => {
                
                window.location.href = `pokemonDetail.html?name=${pokemon.name.toLowerCase()}`;
            });
            return li;
        }

        function loadMoreItems(limit, offset) {
            pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
                pokemons.forEach(pokemon => {
                    const pokemonHtml = convertPokemonHtml(pokemon);
                    pokemonListElement.appendChild(pokemonHtml);
                });
            });
        }

        loadMoreItems(limit, offset);

        loadMore.addEventListener('click', () => {
            offset += limit;
            const qtdRecord = offset + limit;

            if (qtdRecord >= maxRecords) {
                const newLimit = maxRecords - offset;
                loadMoreItems(newLimit, offset);
                loadMore.parentElement.removeChild(loadMore);
            } else {
                loadMoreItems(limit, offset);
            }
        });










//pokemon.sprites.other.showdown.front_default

 