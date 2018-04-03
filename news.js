var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)
var jours = 1000;

function ajouter_recherche()
{
	var elem = document.getElementById("zone_saisie");
	var recherche = document.getElementById("recherches-stockees");
	var paragraphe = document.createElement('p');
	paragraphe.class = 'titre-recherche';

	var label = document.createElement('label');
	label.innerText = elem.value;
	label.setAttribute('onclick','selectionner_recherche(this)');

	var im = document.createElement('img');
	im.src = "croix30.jpg";
	im.class = 'icone-croix';
	im.setAttribute('onclick','supprimer_recherche(this)');

	paragraphe.appendChild(label);
	paragraphe.appendChild(im);
	recherche.appendChild(paragraphe);
	recherches.push(label.innerText);
	console.log("Ajout dans le cookie 'recherches' la valeur : "+label.innerText);
	var r = new Recherche(elem.value,recherche_courante_news);
	var j = JSON.stringify(r);
	MAJCookieRecherches();
}

function supprimer_recherche(e)
{

	var parent = e.parentElement;
	var i = recherches.indexOf(parent.firstChild.innerText);
	recherches.splice(i,1);
	var elem = document.getElementById("recherches-stockees");
	elem.removeChild(parent);
	MAJCookieRecherches();
}


function selectionner_recherche(e)
{
	recherche_courante = e.innerText;
	document.getElementById("zone_saisie").value = e.innerText;
}


function init()
{
	initCookieRecherches();
	var recherche = document.getElementById("recherches-stockees");

	for (var i = 0; i < recherches.length; i++) {
		var paragraphe = document.createElement('p');
		paragraphe.class = 'titre-recherche';

		var label = document.createElement('label');
		label.innerText = recherches[i];
		label.setAttribute('onclick','selectionner_recherche(this)');

		var im = document.createElement('img');
		im.src = "croix30.jpg";
		im.class = 'icone-croix';
		im.setAttribute('onclick','supprimer_recherche(this)');

		paragraphe.appendChild(label);
		paragraphe.appendChild(im);
		recherche.appendChild(paragraphe);
	}
}


function rechercher_nouvelles()
{
	var saisie = document.getElementById("zone_saisie");
	var rech = saisie.value;
	var dis =document.getElementById("wait");
	dis.style.display = "block";
	ajax_get_request(maj_resultats,"search.php?data="+rech,true);
}

function ajax_get_request(callback,url,sync){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
                              if ((xhr.readyState ==4) && (xhr.status == 200)) {
                                  callback(xhr.responseText);
                              }
                           };
  xhr.open("GET",url,sync);
  xhr.send();
}


function maj_resultats(res)
{
	var dis =document.getElementById("wait");
	dis.style.display = "none";

	var div = document.getElementById("resultats");
	div.innerHTML = ""
	var json = JSON.parse(res);

	for (var i = 0; i < json.length; i++) {
		var paragraphe = document.createElement('p');
		paragraphe.className = "titre_result";

		var a = document.createElement('a');
		a.className = "titre_new";
		a.text = json[i].titre;
		a.href = json[i].url;
		a.target = "_blank";
		paragraphe.appendChild(a);

		var span1 = document.createElement('span');
		span1.className = "date_news";
		span1.innerText = json[i].date;
		paragraphe.appendChild(span1);

		var span2 = document.createElement('span');
		span2.className = "action_news";
		span2.innerHTML = "<img src='horloge15.jpg'>";
		span2.setAttribute('onclick','sauver_nouvelle(this)');
		paragraphe.appendChild(span2);


		div.appendChild(paragraphe);
	}

}


function sauver_nouvelle(e)
{
	e.firstChild.src = "disk15.jpg";
	e.setAttribute('onclick','supprimer_nouvelle(this)');
	var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
	var i = 0;
	var trouver = false;
	while (!trouver && i<recherche_courante_news.length) {
		if (recherche_courante_news[i].nom == nouvelle.nom) {
			trouver = true;
		}
		i++;
	}
	if (!trouver) {
		recherche_courante_news.push(nouvelle);
	}
}


function supprimer_nouvelle(e)
{
	e.firstChild.src = "horloge15.jpg";
	e.setAttribute('onclick','sauver_nouvelle(this)');
	var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
	var i = 0;
	var trouver = false;
	while (!trouver && i<recherche_courante_news.length) {
		if (recherche_courante_news[i].nom == nouvelle.nom) {
			trouver = true;
		}
		if (!trouver) {
			i++;
		}
	}
	if (trouver) {
		recherche_courante_news.splice(i,1);
	}
	console.log(recherche_courante_news);
}

//////////Nouvelles Fonctions//////////

/*Met à jour le cookie et les recherches*/
function MAJCookieRecherches() {

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

}

function MajCookiesRecherchesNew(e) {
	if (jours != 0) { // Si le nombre de jours est renseigné
			let date = new Date(); // Création d'un nouvel objet Date
			let dateExpiration = date.getTime()+(jours*24*60*60*1000); // Création date expiration
			date.setTime(dateExpiration);
			var valeurExpiration = "; expires="+date.toGMTString();
	} else { // Si le nombre de jours n'est pas renseigné
			var valeurExpiration = ""; // valeurExpiration est nulle
	}
	document.cookie = "recherchesNews="+e+valeurExpiration;


}

/*Initialise le cookie recherches*/
function initCookieRecherches() {

	console.log("Liste de vos cookies actuels : "+document.cookie);
	var cookies = document.cookie.split('=')[1];
	var lesRecherchesStockees = JSON.parse(cookies);

	for (var i = 0; i < lesRecherchesStockees.length; i++) {
		recherches.push(lesRecherchesStockees[i]);
	}
}

class Nouvelle {
  constructor(nom,date,url) {
    this.nom = nom;
    this.date = date;
    this.url = url;
  }
}

class Recherche{
	constructor(nom,nouvelles){
		this.recherche = nom;
		this.nouvelles = nouvelles;
	}
}
