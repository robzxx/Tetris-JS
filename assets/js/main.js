const url = document.getElementById("play");

url.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "tetris-normal.html";
})

const url_2 = document.getElementById("playtimer");

url_2.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "tetris-timer.html";
})


/*
const liens = document.getElementById("play");
const liensArray = Array.from(liens);
liensArray.map(liens => liens.addEventListener("click" , function(event){
    event.preventDefault();
    location.href= "tetris.html";
    //location.replace("https://youtube.com") // TEST
    //location.replace remplace la page alors que location.href redirige la page
}));
*/