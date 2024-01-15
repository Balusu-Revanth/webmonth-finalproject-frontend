const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
    localStorage.removeItem("jwt");
    location.href = "/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
    location.href = "/pages/createNotes/createNotes.html";
});

const createNotes = (array) => {
    cardContainer.innerHTML = "";

    array.forEach((cardObj) => {
        const { heading, content, noteId } = cardObj;

        const card = document.createElement("div");
        card.classList.add("card");
        card.id = noteId;

        const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><a href="../updateNotes/updateNotes.html?noteId=${noteId}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt=""></div></a></div><div class="card-content">${content}</div>`;

        card.innerHTML = insideHtml;

        cardContainer.appendChild(card);
    });
};

const body = document.querySelector("body");

window.addEventListener("load", () => {
    body.classList.add("visible");
    if (token) {
        fetch(`${apiUrl}/note/getallnotes`, {
            method: "GET",
            headers: {
                authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                cardData = data.data;
                createNotes(cardData);
            })
            .catch((err) => {
                alert("Error Fetching Data");
                console.log(err);
            });
    }
});
