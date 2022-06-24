let form = document.forms["form"];
var pokemonId=7;


form.onsubmit = function (e) {
  e.preventDefault();
  let pokemonName = document.form.nombrePokemon.value.toLowerCase();
  
  buscarPokemon(pokemonName);
};
let obtenerNombre = document.getElementById("nombre");
let obtenerHabilidades = document.getElementById("habilidades");
let pokefoto = document.getElementById("pokefoto");
let estadofoto = true;
function buscarPokemon(pokemonName) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response;
    })
    .then((pokemon)=> pokemon.json())
    .catch(error => alert("No se encuentra el pokemon "+pokemonName+" eso no es muy pokeamigo de tu parte"))
    .then((pokemon) => {
      pokemonName=pokemon.name.toLowerCase()
      pokemonId=pokemon.id;
      imgatras =
        "https://img.pokemondb.net/sprites/black-white/anim/back-normal/" +
        pokemonName +
        ".gif";
      imgfrente =
        "https://img.pokemondb.net/sprites/black-white/anim/normal/" +
        pokemonName +
        ".gif";
        
      pokefoto.setAttribute("src", imgfrente);
      obtenerNombre.innerHTML = pokemonName;
      let listaOrdenadaHabilidades = document.getElementById("habilidades");
      while (listaOrdenadaHabilidades.hasChildNodes()) {
        listaOrdenadaHabilidades.removeChild(
          listaOrdenadaHabilidades.firstChild
        );
      }

      pokemon.moves.map((nombreHabilidad, index) => {
        if (index < 4) {
          let textoNombreHabilidad = document.createTextNode(
            nombreHabilidad.move.name
          );

          let crearNombreHabilidad = document.createElement("li");
          crearNombreHabilidad.appendChild(textoNombreHabilidad);
          obtenerHabilidades.appendChild(textoNombreHabilidad);
          listaOrdenadaHabilidades.appendChild(crearNombreHabilidad);
        }
      });
    });
}

$("#pokefoto").click(function () {
  if (estadofoto == true) {
    $("#pokefoto").attr("src", imgatras);
    estadofoto = false;
  } else {
    $("#pokefoto").attr("src", imgfrente);
    estadofoto = true;
  }
});

$( "#pokefoto" ).hover(function() {
 $(this).addClass("grande");
},
function(){
  $(this).removeClass("grande");
});

$(".anterior").click(function(){
  pokemonId--
  buscarPokemon(pokemonId);
})
$(".sgte").click(function(){
  pokemonId++
  buscarPokemon(pokemonId);
})
