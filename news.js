var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	var elem = document.getElementById("zone_saisie");
	var recherche = document.getElementById("recherches-stockees");
	var paragraphe = document.createElement('p');
	paragraphe.class = 'titre-recherche';
	var label = document.createElement('label');
	label.innerText = elem.value;
	var im = document.createElement('img');
	im.src = "croix30.jpg";
	im.class = 'icone-croix';
	paragraphe.appendChild(label);
	paragraphe.appendChild(im);
	recherche.appendChild(paragraphe);
	console.log(paragraphe.value);
	nouveauCookie('recherches',recherches.value,1000);
}

function supprimer_recherche(e)
{


}


function selectionner_recherche(e)
{

}


function init()
{
	let recherches = [];
	recherches = document.cookie.split("; ");
	console.log("Liste de vos cookies actuels : "+recherches);

	let boutonsLibres = document.getElementsByClassName("bouton_simple bouton_libre");

	for(let c = 0; c < recherches.length; c++) {
			let cookieCourant = " ";
			cookieCourant = recherches[c].split("=");

			for (let b = 0; b < boutonsLibres.length; b++) {
				if (cookieCourant[0] == boutonsLibres[b].id){
					boutonsLibres[b].value = cookieCourant[1];
					boutonsLibres[b].onclick = cookieCourant[1];
				}
			}
	}
}


function rechercher_nouvelles()
{


}


function maj_resultats(res)
{


}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}

//////////Nouvelles Fonctions//////////

function nouveauCookie(nom,valeur,jours) {
		if (jours != 0) { // Si le nombre de jours est renseigné
			let date = new Date(); // Création d'un nouvel objet Date
			let dateExpiration = date.getTime()+(jours*24*60*60*1000); // Création date expiration
			date.setTime(dateExpiration);
			let valeurExpiration = "; expires="+date.toGMTString();
		} else { // Si le nombre de jours n'est pas renseigné
			let valeurExpiration = ""; // valeurExpiration est nulle
		}
		document.cookie = nom+"="+valeur+valeurExpiration+"; path=/";
}
