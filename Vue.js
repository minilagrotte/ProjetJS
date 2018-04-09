class Vue {
  constructor() {
    this.saisie = document.getElementById('zone_saisie'); //Zone de saisie pour rechercher les nouvelles
  }

  afficherRecherchesStocker(recherches){
      var recherche = document.getElementById("recherches-stockees");
      var nouvellesrecherches = document.getElementById("nouvelle-recherche");

      //Parcours des recherches
      for (var i = 0; i < recherches.length; i++) {
          var paragraphe = document.createElement('p');
          paragraphe.class = 'titre-recherche';

          var label = document.createElement('label');

          label.innerText = recherches[i].recherche; //La valeur du label est initialisée avec le nom de recherches[i]

          label.setAttribute('onclick','selectionner_recherche(this)');

          var im = document.createElement('img'); //Création icone croix
          im.src = "croix30.jpg";
          im.style.height = '15px';
          im.style.width = '15px';
          im.class = 'icone-croix';
          im.setAttribute('onclick','supprimer_recherche(this)');

          paragraphe.appendChild(label);
          paragraphe.appendChild(im);
          recherche.appendChild(paragraphe);
      }
      let tabAutocompletion = document.createElement('table'); //Création tableau qui stocke les propositions
      tabAutocompletion.id = 'tabAutocompletion';
      nouvellesrecherches.appendChild(tabAutocompletion);
  }

  rechercher_nouvelles() {
    var saisie = document.getElementById("zone_saisie");
    var dis =document.getElementById("wait");
    dis.style.display = "block";
    return saisie.value;
  }

  afficherResultats(json){ //Affiche toutes les nouvelles correspondantes à la saisie
    var dis =document.getElementById("wait");
    dis.style.display = "none";

    var div = document.getElementById("resultats");
    div.innerHTML = ""
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

  afficherRecherche_Courante(rech){ //Affiche de la recherche en cours
    var div = document.getElementById("resultats");
    div.innerHTML = ""
    for (var i = 0; i < rech.length; i++) {
        var paragraphe = document.createElement('p');
        paragraphe.className = "titre_result";

        var a = document.createElement('a');
        a.className = "titre_new";
        a.text = rech[i].titre;
        a.href = rech[i].url;
        a.target = "_blank";
        paragraphe.appendChild(a);

        var span1 = document.createElement('span');
        span1.className = "date_news";
        span1.innerText = rech[i].date;
        paragraphe.appendChild(span1);

        var span2 = document.createElement('span');
        span2.className = "action_news";
        span2.innerHTML = "<img src='disk15.jpg'>";
        span2.setAttribute('onclick','supprimer_nouvelle(this)');
        paragraphe.appendChild(span2);


        div.appendChild(paragraphe);
    }
  }

  sauver_nouvelle(e){ //Change l'image pour qu'elle devienne une disquette
    e.firstChild.src = "disk15.jpg";
    e.setAttribute('onclick','supprimer_nouvelle(this)');
  }

  supprimer_nouvelle(e){ //Change l'image pour qu'elle devienne une horloge
    e.firstChild.src = "horloge15.jpg";
    e.setAttribute('onclick','sauver_nouvelle(this)');
  }

  afficherRecherche(){ //Affiche la recherche ajoutée
    var elem = document.getElementById("zone_saisie");
    var recherche = document.getElementById("recherches-stockees");
    var paragraphe = document.createElement('p');
    paragraphe.class = 'titre-recherche';

    var label = document.createElement('label');
    label.innerText = elem.value;
    label.setAttribute('onclick','selectionner_recherche(this)');

    var im = document.createElement('img'); //Création icone croix
    im.src = "croix30.jpg";
    im.style.height = '15px';
    im.style.width = '15px';
    im.class = 'icone-croix';
    im.setAttribute('onclick','supprimer_recherche(this)');

    paragraphe.appendChild(label);
    paragraphe.appendChild(im);
    recherche.appendChild(paragraphe);
  }

  supprimer_recherche(e){
    var parent = e.parentElement;
    var elem = document.getElementById("recherches-stockees");
    elem.removeChild(parent);
  }

  changerRecherche(e){
    document.getElementById("zone_saisie").value = e;
  }

  getValue(){ //Renvoie la valeur de la saisie
    return this.saisie.value;
  }

  setValue(mot){ //Donne la valeur "mot" à la saisie
    this.saisie.value = mot;
  }

  autocompletion(motsAutocompletion,recherche){
    let propositions = document.getElementById('tabAutocompletion'); //Tableau contenant les propositions pour l'autocomplétion
    propositions.innerHTML = "";
    if(recherche != ""){ //Si recherche n'est pas nulle
      for (var i = 0; i < motsAutocompletion.length; i++){
          if (motsAutocompletion[i].match(recherche)){
              let mot = document.createElement('button'); //Création d'un bouton contenant la proposition pour l'autocomplétion
              let motCourant = motsAutocompletion[i];
              let saisie = this.getValue();
              mot.innerHTML = motCourant; //Le valeur du bouton 'mot' est initialisée avec la valeur de motCourant
              propositions.appendChild(mot); //Ajoute le bouton 'mot' dans l'élément 'tabAutocompletion'
              mot.setAttribute("onclick",'changerSaisie("'+motCourant+'")'); //Appel de la fonction changerSaisie() si on clique sur le bouton
          };
      }
    } else { //Si recherche est nulle
      while (motsAutocompletion.firstChild) { //On supprime les propositions pour l'autocomplétion
        motsAutocompletion.removeChild(motsAutocompletion.firstChild);
      }
    }
  }




}
