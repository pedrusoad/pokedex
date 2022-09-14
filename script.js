const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 6;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200) {
        const data = await APIResponse.json ();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonNumber.innerHTML = data.id;
        if (data.id <= 649) {  // LIMITE NO INPUT
            pokemonImage.style.display = 'block'
            pokemonName.innerHTML = data.name;
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            input.value = '';
            searchPokemon = data.id
        } else {
            pokemonImage.style.display = 'none'
            pokemonName.innerHTML = 'Not found :C';
            pokemonNumber.innerHTML = '';
            input.value = '';
        }
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);