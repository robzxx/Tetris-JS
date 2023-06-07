//import {timer} from './timer';

window.onload = function() {
	const LARGEUR_GRILLE = 14;  // Nombre de cases en largeur
    const HAUTEUR_GRILLE = 28;  // Nombre de cases en hauteur
    const CARREAU = 20;	        // Taille en pixels d'une case de la grille
    var canvas;                 // Un canvas est un élément HTML dans lequel on peut dessiner des formes
    var ctx;
	
	// Position de la forme sur la grille
	var X_INITIAL = 5;
	var Y_INITIAL = -2;
    var formX = X_INITIAL;
    var formY = Y_INITIAL;

	// Numéro de la forme (du tableau "forme") à afficher 
    function NumRand(){
        return Math.floor(Math.random() * 7);
    }

    // Donner un chiffre random pour faire apparaitre les formes au hasard
	var numForme = NumRand();
	// Sélection de la version de la forme à afficher (différentes rotations possibles)
    var rotation = 0;
    
	// Tableau de définition des formes
    // Utilisation des objets au lieux de faire des tableaux

/*
    const form = {
        shape : [[],[],[]],
        rotation : 0,
        x : 0,
        y : 0,
    };
*/

    var forme = Array();
    forme[0]= [ // Forme 1 (J)
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ],
        [	// rotation 2
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,1],
            [0,1,0],
            [0,1,0]
        ]
    ];

    forme[1]= [ // Forme 1 (L)
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [1,0,0]
        ],
        [	// rotation 1
            [1,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [	// rotation 2
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ]
    ]; 

	forme[2] = [ // Forme 2 (z à l'envers)
        [   // rotation 0
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ]  
    ];

    forme[3] = [ // Forme 3 (Z)
        [   // rotation 0
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [	// rotation 1
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ]  
    ];

    forme[4] = [    //Forme 4 (carré)
        [   // rotation 0
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0]
        ]
    ];

    forme[5] = [    //Forme 5 (Barre)
        [   // Rotation 0
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],

        [   // Rotation 1
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ]
    ];

    forme[6] = [    // Petit T
        [	// rotation 0
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [	// rotation 2
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [	// rotation 3
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ]
    ];

/*
    var level = Array()
    level[0] = ctx.fillStyle = "#FFFFFF" // créer un tableau pour que dans chaque level les formes aient des couleurs différentes (pour plutard)
    // A compléter avec les autres formes    
*/	
    // drawForme()
	//   Dessine une forme à l'écran 
	//   Variable utilisées :
	//		numForme : numéro de la forme à afficher (tableau forme)
	//		rotation : version de la forme à afficher (tableau forme[numForme])
	//		formX : Position horizontale de la forme sur la grille
	//		formY : Position verticale de la forme sur la grille
    function drawForme() {
		for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1) {
                    ctx.fillStyle = "blue"; // Couleur du contour de la forme
                    ctx.fillRect((formX + x) * CARREAU, (formY + y) * CARREAU, CARREAU, CARREAU); // Contour de la forme
                    ctx.fillStyle = "#000000"; // Couleur de remplissage de la forme
                    ctx.fillRect((formX + x) * CARREAU + 1, (formY + y) * CARREAU + 1, CARREAU - 2, CARREAU - 2); // Remplissage de la forme
                }
            }
        }
    }
    
    function refreshCanvas() {
            ctx.clearRect(0,0,LARGEUR_GRILLE * CARREAU, HAUTEUR_GRILLE * CARREAU);  //canvas
            formY++;
            drawForme();
    }

    // inti()
	// Initialisation du canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = LARGEUR_GRILLE * CARREAU;
        canvas.height = HAUTEUR_GRILLE * CARREAU;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);  // Ajoute le canvas à la page html
        ctx = canvas.getContext('2d');
    }

    init();

    /*
    function collision(){
        if (formX == canvas.width || formY == canvas.height) {
            ctx.clearRect(0,0,LARGEUR_GRILLE * CARREAU, HAUTEUR_GRILLE * CARREAU) + forme;
            refreshCanvas();
        }
    }   
    */

	// Gestion des évènements clavier
    // Faire tourner la forme

    window.addEventListener("keydown", function(event) {
        var key = event.key;
        switch(key) {
            case 'ArrowUp':  // flèche haut => rotation horaire de la forme
                temp = rotation;
                rotation++;
                if(rotation >  forme[numForme].length - 1) rotation = 0; // Dès que la forme atteint sa rotation max elle revient à la première
                //if(collision()) rotation = temp;
                refreshCanvas();
                break;

                case 'ArrowDown':  // flèche bas => permet de descendre la forme
                formY++;
                refreshCanvas();
                break;

                case 'ArrowLeft':  // flèche de gauche => permet de déplacer la forme vers la gauche
                formX--
                refreshCanvas();
                break;

                case 'ArrowRight':  // flèche de droite => permet de déplacer la flêche vers la droite
                formX++;
                refreshCanvas();
                break;
        }
      }, true);

/*
    // Gestion des points
    var points = 0
    const button_start = document.getElementById("start")
    var timer = document.getElementById("timer")

    window.addEventListener("click", function(event){
        event.preventDefault();
        points = 0
    })
*/
    // REDIRECTION HOME PAGE

    const url = document.getElementById('return');

    url.addEventListener("click", function(event){
        event.preventDefault();
        location.href = "index.html";
    })

    const timerElement = document.getElementById('timer');
    const pointsElement = document.getElementById('pts');

    document.getElementById('start').addEventListener("click", function(event) {
        event.preventDefault();
        var points = 0
        if (formY ==- 24){
            points = points + 50
            timerElement.innerText = `${points}` 
        }
        drawForme();
        refreshCanvas();
        setInterval(refreshCanvas, 1000); // le temps est en millisecondes
    })
}