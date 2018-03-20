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
