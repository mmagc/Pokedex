/*const offset = 50
const limit = 50
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`*/

const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types =  types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.front_default

    pokemon.hp = pokeDetail.stats[0].base_stat

    pokemon.attack = pokeDetail.stats[1].base_stat

    pokemon.speed = pokeDetail.stats[5].base_stat

    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)


    return pokemon
    
}

function convertPokeApiSpeciesToDescription(pokeSpecies) {
    // Filtra a primeira descrição em inglês
    const flavorTextEntry = pokeSpecies.flavor_text_entries.find((entry) => entry.language.name === 'en');
    if (flavorTextEntry) {
        // Remove caracteres de controle do texto
        const cleanedText = flavorTextEntry.flavor_text.replace(/[\f]/g, ' ').replace(/\s+/g, ' ').trim();
        return cleanedText;
    } else {
        return 'No description available.';
    }
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDetailByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => {
            console.error('Erro ao carregar detalhes do Pokémon:', error);
            throw error; // Propaga o erro para ser tratado posteriormente
        });
}

pokeApi.getPokemonDescriptionByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
    return fetch(url)
        .then((response) => response.json())
        .then((pokeSpecies) => {
            const description = convertPokeApiSpeciesToDescription(pokeSpecies)
            return description
        })
        .catch((error) => {
            console.error('Erro ao carregar descrição do Pokémon:', error);
            throw error; 
        });
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)  
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}


