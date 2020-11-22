/**JS QUE INTERACTUA CON LA API PARA CONSEGUIR LOS RESULTADOS NECESARIOS*/

/**
 * Compruba si el Heroe en cuestión ya ha sido solicitado a la API, para evitar consultas innecesarias
 * @param name
 */
function existSHinArray(name){
    for(var i = 0; i<superHeroesArray.length; i++){
        if(superHeroesArray[i].getName().toLowerCase().localeCompare(name.toLowerCase()) == 0)  return true;
    }
    return false;
}

/**
 * Crea un nuevo Super Heroe guardando el nombre, id y descripción
 * @param name
 */
function getSHByName(name) {
    //Genramos la URL
    var url = new URL("http://gateway.marvel.com:80/v1/public/characters"), params = {
        ts: calculateTs(),
        apikey: PUBLIC_KEY,
        hash: calculateHash(),
        name: name
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data["data"]["results"].length !=0){
                superHeroesArray.push(new superhero(data["data"]["results"][0]["id"], data["data"]["results"][0]["name"], data["data"]["results"][0]["description"]));

                //En la primera llamada, llama a la función mostrar comics
                superHeroesArray.length == 1 && getComicsBySH(superHeroesArray[0].getId());

                return true;
            }
            return _false();
        })
        .catch(function(err){
            document.getElementsByClassName("submit_input")[0].disabled = false;
            document.getElementsByClassName("submit_input")[0].classList.remove("disabled");
            console.log(err);
        });
};

/**
 * Obtiene los comics de un Super Heroe por ID
 * @param id
 */
function getComicsBySH(id){
    //Genramos la URL
    var url = new URL("http://gateway.marvel.com:80/v1/public/characters/" + id + "/comics"), params = {
        ts: calculateTs(),
        apikey: PUBLIC_KEY,
        hash: calculateHash()
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var comics = data["data"]["results"];
            var SHinComicArray = [];

            for (var i = 0; i<comics.length; i++){
                if(comics[i]["characters"]["available"] > 1){
                    for (var a = 0; a<comics[i]["characters"]["available"]; a++){
                        if(!existSHinArray(comics[i]["characters"]["items"][a]["name"])) {getSHByName(comics[i]["characters"]["items"][a]["name"]); timeToWait++;}
                        SHinComicArray.push(comics[i]["characters"]["items"][a]["name"]);
                    }
                    comicsArrays.push(new comic(comics[i]["title"], SHinComicArray));
                    SHinComicArray = [];
                }
            }

            if(comicsArrays.length >= minComicsToDisplay){
                console.log("The response will take " + (timeToWait*timePerCall).toFixed(2)+ " seconds.");
                setTimeout(function() { displayResults(); }, timeToWait*(timePerCall*1000));
            } else {
                _false(true);
            }

            return true;
        })
        .catch(function(err){
            document.getElementsByClassName("submit_input")[0].disabled = false;
            document.getElementsByClassName("submit_input")[0].classList.remove("disabled");
            console.log(err);
        });
}