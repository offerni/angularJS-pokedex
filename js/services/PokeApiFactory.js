angular.module('pokedexApp')
.factory('PokeApiFactory', PokeApiFactory);

PokeApiFactory.$inject = ['$http'];

function PokeApiFactory($http) {
    return {
        get url() {
            return '//dev.treinaweb.com.br/pokeapi/'
        },
        pkmList: [],
        listAll: function() {
            return $http.get(`${this.url}pokedex/1`)
                .then(response => response.data.pokemon)
                .then(pkmList => {
                    return pkmList.map(pokemon => {
                        pokemon.number = this.getNumberFromURL(pokemon.resource_uri);
                        return pokemon;
                    })
                    .filter(pokemon => pokemon.number < 1000)
                    .sort((a, b) => (a.number > b.number ? 1: -1))
                })
                .then(pkmList => {
                    this.pkmList = pkmList;
                    return pkmList
                })
        },
        getNumberFromURL: function(url) {
            return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
        }
    }
}