class Modele {
  constructor() {
    if (localStorage.getItem('recherches')) {
      this.recherches = JSON.parse(localStorage.getItem('recherches'));
    }else{
      this.recherches = [] ;
    }
    this.recherche_courante = "" ;
    this.recherche_courante_news = [];
    this.jours = 1000;
    if (localStorage.getItem('motsAutocompletion')) {
      this.motsAutocompletion = JSON.parse(localStorage.getItem('motsAutocompletion'));
    }else{
      this.motsAutocompletion = [];
    }
    console.log("Mots disponibles pour l'autocomplétion :")
    console.log(this.motsAutocompletion);
  }


  remise_a_zeroRechercheNews(){
    this.recherche_courante_news = [] ;
  }

  getRecherches(){
    return this.recherches;
  }
  setRecherche_courante(r){
    this.recherche_courante = r ;
  }

  ajax_get_request(callback,url,sync){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
                                if ((xhr.readyState ==4) && (xhr.status == 200)) {
                                    callback(xhr.responseText);
                                }
                             };
    xhr.open("GET",url,sync);
    xhr.send();
  }

  sauver_nouvelle(e){
    var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
    var i = 0;
    var trouver = false;
    while (!trouver && i<this.recherche_courante_news.length) {
        if (this.recherche_courante_news[i].titre == nouvelle.titre) {
            trouver = true;
        }
        i++;
    }
    if (!trouver) {
        this.recherche_courante_news.push(nouvelle);
    }
  }

  supprimer_nouvelle(e){
    var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
    var i = 0;
    var trouver = false;
    console.log(this.recherche_courante_news);
    console.log(this.recherche_courante);
    while (!trouver && i<this.recherche_courante_news.length) {
        if (this.recherche_courante_news[i].titre == nouvelle.titre) {
            trouver = true;
        }
        if (!trouver) {
            i++;
        }
    }
    if (trouver) {
        this.recherche_courante_news.splice(i,1);
    }
  }

  ajouter_recherche(){
    var i =0;
    var trouver = false;
    if (this.recherche_courante) {
      while(i<this.recherches.length && !trouver){
        if (this.recherches[i].recherche == this.recherche_courante) {
          trouver = true;
          this.recherches[i].nouvelles = this.recherche_courante_news;
        }
        i++;
      }
      if (!trouver) {
        var r = new Recherche(this.recherche_courante,this.recherche_courante_news);
        this.recherches.push(r);
      }
      localStorage.setItem("recherches",JSON.stringify(this.recherches));
    }else{
      trouver = true;
    }

    return trouver ;
  }

  supprimer_recherche(e){
      var i = 0 ;
      var trouver = false;
      while(!trouver && i<this.recherches.length){
        if (this.recherches[i].recherche == e) {
          trouver = true;
        }else{
          i++;
        }
      }
      this.recherches.splice(i,1);
      localStorage.setItem("recherches",JSON.stringify(this.recherches));
  }

  selectionner_recherche(e){
    this.recherche_courante = e;
    var i = 0;
    var trouver = false;
    while(i<this.recherches.length && !trouver){
      if (this.recherches[i].recherche == e) {
        trouver = true;
      }else{
        i++;
      }
    }
    this.recherche_courante_news = this.recherches[i].nouvelles;
    return this.recherches[i];
  }

  setMotsAutocompletion(mot){
    if(mot != ""){
      let trouver = false;
      for (var i = 0; i < this.motsAutocompletion.length; i++) {
        if (this.motsAutocompletion[i] == mot){
            trouver = true;
        }
      }

      if (!trouver){
        this.motsAutocompletion.push(mot);
        localStorage.setItem("motsAutocompletion",JSON.stringify(this.motsAutocompletion));
        console.log("Ajout du mot "+mot+ " dans 'motsAutocompletion'");
        console.log("'motsAutocompletion' vaut maintenant : "+this.motsAutocompletion);
      }
    }
  }
}
