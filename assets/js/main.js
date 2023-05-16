
const limit = 20;
const totalPokes = 251
let offset = 0;
let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
const thisHtml = document.getElementById("pokeList")
const loadMoreButton = document.getElementById("loadMoreButton")

function typeToItem (typeList){
	return typeList.map((slot) => `<li class="type ${slot.type.name}">${slot.type.name}</li>`)
}

function typeUnq (typeList){
	return typeList.map((slot) => slot.type.name)
}

function pokemonToItem (pokemon) {
	const [type] = typeUnq(pokemon.types)
	return `<li class="pokemon ${type}">
	<span class="number">${pokemon.id}</span>
	<span class="name">${pokemon.name}</span>

	<div class="detail">
		<ol class="types">
			${typeToItem(pokemon.types).join('')}						
		</ol>
		<img src="${pokemon.sprites.other.dream_world.front_default}"
		alt=${pokemon.name}>
	</div>
</li>`
}

fetch(url)
	.then((response) => response.json())
	.then((jsonBody) => jsonBody.results)
	.then((pokeList) => pokeList.map (function (pokemon) {
		return fetch(pokemon.url).then((response) => response.json())
	}))
	.then((detailRequests) => Promise.all(detailRequests))
	.then((pokemonDetails) => {
		console.log(pokemonDetails)
		const httpList = pokemonDetails.map(pokemonToItem).join('')
		thisHtml.innerHTML += httpList
	})
	.catch((error) => console.error(error))

loadMoreButton.addEventListener('click', () => {
    offset += limit
	url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= totalPokes) {
        const newLimit = totalPokes - offset
		url = `https://pokeapi.co/api/v2/pokemon?limit=${newLimit}&offset=${offset}`
        fetch(url)
			.then((response) => response.json())
			.then((jsonBody) => jsonBody.results)
			.then((pokeList) => pokeList.map (function (pokemon) {
				return fetch(pokemon.url).then((response) => response.json())
			}))
			.then((detailRequests) => Promise.all(detailRequests))
			.then((pokemonDetails) => {
				console.log(pokemonDetails)
				const httpList = pokemonDetails.map(pokemonToItem).join('')
				thisHtml.innerHTML += httpList
			})
			.catch((error) => console.error(error))

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        fetch(url)
			.then((response) => response.json())
			.then((jsonBody) => jsonBody.results)
			.then((pokeList) => pokeList.map (function (pokemon) {
				return fetch(pokemon.url).then((response) => response.json())
			}))
			.then((detailRequests) => Promise.all(detailRequests))
			.then((pokemonDetails) => {
				console.log(pokemonDetails)
				const httpList = pokemonDetails.map(pokemonToItem).join('')
				thisHtml.innerHTML += httpList
			})
			.catch((error) => console.error(error))
			}
})