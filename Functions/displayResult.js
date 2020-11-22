/**JS QUE MUESTRA LOS RESULTADOS DE LA BUSQUEDA*/

/**
 * Muestra los comics. Genera toda la estructura HTML y va insertando los datos pertinentes
 * @returns {boolean}
 */
function displayResults(){

    document.getElementsByClassName("banner")[0].classList.add("img-big-size");

    var section = document.getElementById("section");
    var newSection = document.createElement("section");
    newSection.id = "newSection";
    section.parentNode.insertBefore(newSection, newSection.nextSibling);

    for (var i = 0; i<comicsArrays.length; i++){
        var newArticle = document.createElement("article");
        newArticle.classList.add("article-created");
        document.getElementById('newSection').appendChild(newArticle);

        var newUL = document.createElement("ul");
        newUL.classList.add("ul");
        document.getElementsByClassName('article-created')[i].appendChild(newUL);

        var newPComic = document.createElement("p");
        newPComic.classList.add("comic");
        document.getElementsByClassName('ul')[i].appendChild(newPComic);
        newPComic.innerHTML += "Comic " + (i+1);
        console.log("Comic " + (i+1));

        var newLITitle = document.createElement("li");
        newLITitle.classList.add("li");
        document.getElementsByClassName('ul')[i].appendChild(newLITitle);
        newLITitle.innerHTML += "Title: " + comicsArrays[i].getTitle();
        console.log("Title: " + comicsArrays[i].getTitle());

        for(var a = 0; a<comicsArrays[i].getSuperHeroNames().length; a++){
            var newLISHName = document.createElement("li");
            newLISHName.classList.add("li");
            document.getElementsByClassName('ul')[i].appendChild(newLISHName);
            var superHeroName = comicsArrays[i].getSuperHeroNames()[a];
            newLISHName.innerHTML += "Super Hero: " + superHeroName;
            console.log("Super Hero: " + superHeroName);

            var newLISHDescription = document.createElement("li");
            newLISHDescription.classList.add("li");
            document.getElementsByClassName('ul')[i].appendChild(newLISHDescription);
            var superHeroDescription = getDescriptionByName(comicsArrays[i].getSuperHeroNames()[a]);
            newLISHDescription.innerHTML += "Description: " + superHeroDescription;
            console.log("Description: " + superHeroDescription);
        }

    }

    document.getElementsByClassName("submit_input")[0].disabled = false;
    document.getElementsByClassName("submit_input")[0].classList.remove("disabled");

    return true;
}

/**
 * Obtiene del array de Heroes la descripción por nombre
 * @param name
 * @returns {boolean|*}
 */
function getDescriptionByName(name){
    for(var i = 0; i<superHeroesArray.length; i++){
        if (superHeroesArray[i].getName().toLowerCase().localeCompare(name.toLowerCase()) == 0){
            return (superHeroesArray[i].getDescription() != "" ? superHeroesArray[i].getDescription() : "Description not available :(");
        }
    }
    return false;
}

/**
 * Muestra un mensaje de error en caso de que los parametros de busqueda sean incorrectos.
 * @param comic
 * @returns {boolean}
 */
function _false(comic = false){
    document.getElementsByClassName("banner")[0].classList.remove("img-big-size");

    var form = document.getElementById("form");
    var errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    (comic ? errorDiv.innerHTML += 'THIS SUPER HEROE DOES NOT HAVE ENOUGH COMICS TO DISPLAY' :errorDiv.innerHTML += 'NOT A VALID SUPER HERO');
    form.parentNode.insertBefore(errorDiv, errorDiv.nextSibling);

    return false;
}

/**
 * Eliminar el resultado al producirse una nueva consulta
 */
function eliminarResult() {
    if(document.getElementsByClassName("error").length != 0){
        var element = document.getElementsByClassName("error")[0];
        element.parentNode.removeChild(element);
    }
    if(document.getElementById("newSection") != null) document.getElementById("newSection").remove();
}