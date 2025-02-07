const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startGame);

function startGame() {
    fetch(`https://videogamematch.onrender.com/game/createCategories`)
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("gameCategories", JSON.stringify(data));
            window.location.href = "pages/game.html";
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
}
