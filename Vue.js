class Vue {
  constructor() {

  }

  afficherRecherchesStocker(recherches){
      var recherche = document.getElementById("recherches-stockees");
      var nouvellesrecherches = document.getElementById("nouvelle-recherche");

      for (var i = 0; i < recherches.length; i++) {
          var paragraphe = document.createElement('p');
          paragraphe.class = 'titre-recherche';

          var label = document.createElement('label');

          label.innerText = recherches[i].recherche;

          label.setAttribute('onclick','selectionner_recherche(this)');

          var im = document.createElement('img');
          im.src = "croix30.jpg";
          im.class = 'icone-croix';
          im.setAttribute('onclick','supprimer_recherche(this)');

          paragraphe.appendChild(label);
          paragraphe.appendChild(im);
          recherche.appendChild(paragraphe);
      }
      let tabAutocompletion = document.createElement('table');
      tabAutocompletion.id = 'tabAutocompletion';
      nouvellesrecherches.appendChild(tabAutocompletion);
  }

  rechercher_nouvelles() {
    var saisie = document.getElementById("zone_saisie");
    var dis =document.getElementById("wait");
    dis.style.display = "block";
    return saisie.value;
  }

  afficherResultats(json){
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

  afficherRecherche_Courante(rech){
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

  sauver_nouvelle(e){
    e.firstChild.src = "disk15.jpg";
    e.setAttribute('onclick','supprimer_nouvelle(this)');
  }

  supprimer_nouvelle(e){
    e.firstChild.src = "horloge15.jpg";
    e.setAttribute('onclick','sauver_nouvelle(this)');
  }

  afficherRecherche(){
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
  }

  supprimer_recherche(e){
    var parent = e.parentElement;
    var elem = document.getElementById("recherches-stockees");
    elem.removeChild(parent);
  }

  changerRecherche(e){
    document.getElementById("zone_saisie").value = e;
  }

}
