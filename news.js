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
	label.setAttribute('onclick','selectionner_recherche(this)');

	var im = document.createElement('img');
	im.src = "croix30.jpg";
	im.class = 'icone-croix';
	im.setAttribute('onclick','supprimer_recherche(this)');

	paragraphe.appendChild(label);
	paragraphe.appendChild(im);
	recherche.appendChild(paragraphe);
	recherches.push(label.innerText);
	//nouveauCookie('recherches',label.innerText,1000);
}

function supprimer_recherche(e)
{

	var parent = e.parentElement;
	var i = recherches.indexOf(parent.firstChild.innerText);
	recherches.splice(i,1);
	var elem = document.getElementById("recherches-stockees");
	elem.removeChild(parent);
}


function selectionner_recherche(e)
{
	recherche_courante = e.innerText;
	document.getElementById("zone_saisie").value = e.innerText;
}


function init()
{
}


function rechercher_nouvelles()
{
	var saisie = document.getElementById("zone_saisie");
	var rech = saisie.value;
	saisie.value = "";
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
}


function supprimer_nouvelle(e)
{
	e.firstChild.src = "horloge15.jpg";
	e.setAttribute('onclick','sauver_nouvelle(this)');

}

//////////Nouvelles Fonctions//////////

function nouveauCookie(nom,valeur,jours) {
		/*if (jours != 0) { // Si le nombre de jours est renseigné
			let date = new Date(); // Création d'un nouvel objet Date
			let dateExpiration = date.getTime()+(jours*24*60*60*1000); // Création date expiration
			date.setTime(dateExpiration);
			let valeurExpiration = "; expires="+date.toGMTString();
		} else { // Si le nombre de jours n'est pas renseigné
			let valeurExpiration = " "; // valeurExpiration est nulle
		}
		//document.cookie = nom+"="+valeur+valeurExpiration+"; path=/";
}
