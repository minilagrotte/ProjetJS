class Modele {
  constructor() {
                                        //////Initialisation des Attributs de l'objet
    this.local = localStorage;                  // Pour le stockage localStorage
    this.recherche_courante = "" ;              // La recherche taper dans la barre de saisie
    this.recherche_courante_news = [];          // Les recherche que l'utilisateur souhaite garder
    this.jours = 1000;                          // nb de jours que le cookies est gardé
    this.recherches = this.getStorage('recherches');    //recupere les objets Recherche
    this.motsAutocompletion = this.getStorage('motsAutocompletion');  //recupere la liste des mots déjà taper

  }
              // Recupère un Liste d'objet contenu dans le localStorage à partir de sa clé (chaine de caractère) : rech
  getStorage(rech){
    var recup = [];
    if (this.local.getItem(rech)) { //S'il n'a rien dans le local de la clé renvoyer une Liste vide
      recup = JSON.parse(this.local.getItem(rech));
    }
    return recup;
  }

            // Remet a zero la liste de recherche_courante
  remise_a_zeroRechercheNews(){
    this.recherche_courante_news = [] ;
  }

  getRecherches(){
    return this.recherches;
  }
  setRecherche_courante(r){
    this.recherche_courante = r ;
  }
                                      // Récupère la réponse PHP puis appel la fonction correspondante
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
                            // Ajoute une nouvelle au recherche_courante_news, si cette nouvelle n'est pas déjà dedans
  sauver_nouvelle(e){
    var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
    var i = 0;
    var trouver = false;
    while (!trouver && i<this.recherche_courante_news.length){
        if (this.recherche_courante_news[i].titre == nouvelle.titre) {  // Nouvelle trouvé : sortir de la boucle
            trouver = true;
        }
        i++;
    }
    if (!trouver) {                                                     // Si on ne la pas trouver, l'ajouter
        this.recherche_courante_news.push(nouvelle);
    }
  }

  supprimer_nouvelle(e){                    // Supprime la nouvelle si elle est contenu dans recherche_courante_news
    var nouvelle = new Nouvelle(e.parentElement.firstChild.text,e.parentElement.childNodes[1].innerText,e.parentElement.firstChild.href);
    var i = 0;
    var trouver = false;
    while (!trouver && i<this.recherche_courante_news.length) {
        if (this.recherche_courante_news[i].titre == nouvelle.titre) {
            trouver = true;
        }else{
          i++;
        }
    }
    if (trouver) {
        this.recherche_courante_news.splice(i,1);
    }
  }
                // Ajoute une recherche si non presente dans le storage
  ajouter_recherche(){
    var i =0;
    var trouver = false;
    if (this.recherche_courante) {
      while(i<this.recherches.length && !trouver){
        if (this.recherches[i].recherche == this.recherche_courante) {
          trouver = true;
          this.recherches[i].nouvelles = this.recherche_courante_news;
        }else{
          i++;
        }
      }
      if (!trouver) {
        var r = new Recherche(this.recherche_courante,this.recherche_courante_news);
        this.recherches.push(r);
      }
      this.local.setItem("recherches",JSON.stringify(this.recherches));
    }else{
      trouver = true;
    }

    return trouver ;
  }
            // Supprime une recherche si présente dans le Storage
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
      if (trouver) {
        this.recherches.splice(i,1);
        this.local.setItem("recherches",JSON.stringify(this.recherches));
      }

  }
          // Selectionne une recherche par son nom et retourne sa liste de nouvelle
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
    if (!trouver) {                                   // Si Non trouver alors les recherche_courante_news sont vide et
      this.recherche_courante_news = [];              // on retourne une liste vide
      return [];
    }else{                                            //Sinon
      this.recherche_courante_news = this.recherches[i].nouvelles; // les recherche_courante_news prennent pour valeur les nouvelles de la recherche
      return this.recherches[i];                        // on retourne la liste de nouvelle asocier a la recherche
    }

  }

                              // ajout au mots completion, le nouveau mot a ajouter s'il n'est pas déjà présent
  setMotsAutocompletion(mot){
    if(mot != ""){
      let trouver = false;
      var i = 0;
      while(i<this.motsAutocompletion.length && !trouver) {
        if (this.motsAutocompletion[i] == mot){           // le mot est déjà dans le Storage donc on sort de la boucle et
            trouver = true;                               // on ne l'ajoute pas
        }else{
          i++;
        }
      }

      if (!trouver){                                    // Si n'est pas trouver , on l'ajoute puis mise a jour du STORAGE
        this.motsAutocompletion.push(mot);
        this.local.setItem("motsAutocompletion",JSON.stringify(this.motsAutocompletion));
      }
    }
  }

  getMotsAutocompletion(){
    return this.motsAutocompletion;
  }
}
