    var pts = document.getElementById("pts");
    var pointsAug = 0;

    if(forme[numForme][rotation][y] == HAUTEUR_GRILLE) {
        pointsAug = pointsAug + 50;
        pts = pointsAug;
    }
    pts.innerText = `${pts}` // Affichage en HTML