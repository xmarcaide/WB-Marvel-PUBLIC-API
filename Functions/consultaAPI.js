/**JS PRINCIPAL*/

//ARRAYS
var superHeroesArray = [];
var comicsArrays = [];

//VARIABLES
// El super heroe tiene que tener al menos 3 comics que cumplan las condiciones para que se muestren.
var minComicsToDisplay = 3;

// Tiempo que se tarda en procesar todos los datos a mostrar.
var timeToWait = 0;
//Tiempo que se tarda en realizar una llamada a la API 0.075s
var timePerCall = 0.075;

/**
 * Main functionality, get 3 comics where the super hero appears with more super heroes.
 * @param button
 */
function mainFunction(button){
    //Limpio las arrays
    superHeroesArray = [];
    comicsArrays = [];

    //Limpio el tiempo
    timeToWait = 0;

    //Borrar resultados si están mostrados
    eliminarResult();

    var name = button.previousElementSibling.value;

    if(name != ""){
        //Desabilitamos el boton de busqueda para que no puedan hacerse más peticiones mientras se cargan los datos.
        document.getElementsByClassName("submit_input")[0].disabled = true;
        document.getElementsByClassName("submit_input")[0].classList.add("disabled");
        getSHByName(name);
    } else {
        return _false();
    }
}


