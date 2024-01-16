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

        const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><a href="../updateNotes/updateNotes.html?noteId=${noteId}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt=""></div></a></div><div class="card-content">${content}</div><div class="delete-note"><img src="../../assets/delete_note.svg" alt="delete"></div>`;

        card.innerHTML = insideHtml;

        const deleteButton = card.querySelector(".delete-note");
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (confirm("Are you sure you want to delete this note?")) {
                fetch(`${apiUrl}/note/delete/${noteId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message) {
                            location.href = "/pages/dashboard/dashboard.html";
                        }
                    })
                    .catch((err) => {
                        alert("Error Deleting Note");
                        console.log(err);
                    });
            }
        });
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
    } else {
        location.href = "/";
    }
});
