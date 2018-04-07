var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)
var jours = 1000;
var motsAutocompletion = ['bonjour','aurevoir']; //pour test sinon version finale il sera vide

var modele = new Modele();
var vue = new Vue();

function ajouter_recherche()
{
    var dejaAjouter = modele.ajouter_recherche();
    if (!dejaAjouter) {
      vue.afficherRecherche();
    }
    /*
    var jsonRecherches = JSON.stringify(recherches);
    setCookie("recherches",jsonRecherches,jours);
    */
}

function supprimer_recherche(e)
{
    /*
    var cookieRech = getCookie("recherches");
    console.log(cookieRech);
    */
    modele.supprimer_recherche(e.parentElement.firstChild.innerText);
    vue.supprimer_recherche(e);



    /*
    var jsonRecherches = JSON.stringify(recherches);
    setCookie("recherches",jsonRecherches,jours);
    */
}


function selectionner_recherche(e)
{
    var recherche_associer = modele.selectionner_recherche(e.innerText);
    vue.changerRecherche(recherche_associer.recherche);
    vue.afficherRecherche_Courante(recherche_associer.nouvelles);
}


function init()
{
    /*
    initCookieRecherches();
    */
    let rech = modele.getRecherches();
    if(rech.lenght != 0 ){
      vue.afficherRecherchesStocker(rech);
    }
}


function rechercher_nouvelles()
{
    var rech = vue.rechercher_nouvelles();
    modele.setRecherche_courante(rech);
    modele.remise_a_zeroRechercheNews();
    modele.ajax_get_request(maj_resultats,"search.php?data="+rech,true);

    //Ajoute recherche dans la liste pour l'autocomplétion
    /*
    if (!mo){

    }*/
}

function maj_resultats(res)
{
    var json = JSON.parse(res);
    vue.afficherResultats(json);
}


function sauver_nouvelle(e)
{
    vue.sauver_nouvelle(e);
    modele.sauver_nouvelle(e);
}


function supprimer_nouvelle(e)
{
    vue.supprimer_nouvelle(e);
    modele.supprimer_nouvelle(e);
}

//////////Nouvelles Fonctions//////////

function autocompletion (recherche){


    if (recherche != ""){
        for (var i = 0; i < motsAutocompletion.length; i++) {
            if (motsAutocompletion[i].match(recherche)){
                let mot = document.createElement('button');
                mot.value = motsAutocompletion[i];
                document.getElementById('tabAutocompletion').appendChild(mot);
            };
        }
    }

}

/*Met à jour le cookie et les recherches*/
/*function MAJCookieRecherches() {

        if (jours != 0) { // Si le nombre de jours est renseigné
                let date = new Date(); // Création d'un nouvel objet Date
                let dateExpiration = date.getTime()+(jours*24*60*60*1000); // Création date expiration
                date.setTime(dateExpiration);
                var valeurExpiration = "; expires="+date.toGMTString();
        } else { // Si le nombre de jours n'est pas renseigné
                var valeurExpiration = ""; // valeurExpiration est nulle
        }

        let jsonRecherches = JSON.stringify(recherches);
        document.cookie = "recherches="+jsonRecherches+valeurExpiration;

}*/

/*Initialise le cookie recherches*/
/*function initCookieRecherches() {

    console.log("Liste de vos cookies actuels : "+document.cookie);
    var cookies = document.cookie.split('=')[1];
    var lesRecherchesStockees = JSON.parse(cookies);

    for (var i = 0; i < lesRecherchesStockees.length; i++) {
        recherches.push(lesRecherchesStockees[i]);
    }
}*/
