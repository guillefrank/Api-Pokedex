let form = document.forms["form"];

form.onsubmit = function (e) {
  e.preventDefault();
  let seleccion = document.form.nombrePokemon.value.toLowerCase();
  pokemonId = seleccion;   
  buscarPokemon();
  
};
let obtenerNombre = document.getElementById("nombre");
let obtenerHabilidades = document.getElementById("habilidades");
let pokefoto = document.getElementById("pokefoto");

let estadofoto = true;
function buscarPokemon() {  
 imgatras = "https://img.pokemondb.net/sprites/black-white/anim/back-normal/"+ pokemonId +".gif";
 imgfrente ="https://img.pokemondb.net/sprites/black-white/anim/normal/"+ pokemonId +".gif"; 
  pokefoto.setAttribute("src",imgfrente);

  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
    .then((response) => response.json())
    .then((pokemon) => {
      
      obtenerNombre.innerHTML = pokemonId;

      let textoNombre = document.createTextNode(pokemon.name.toUpperCase());
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
