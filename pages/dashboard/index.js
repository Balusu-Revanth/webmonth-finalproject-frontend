const cardContainer = document.querySelector(".card-container");

const cardData = [
    {
        heading: "heading1",
        content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis nisi illo fuga nulla exercitationem. Veniam eius maiores sit optio doloremque omnis doloribus, dolorum eum accusamus at asperiores consequatur, commodi sed nihil debitis, voluptatibus aperiam? Deleniti nisi placeat, aut harum excepturi consequatur, quisquam vel totam et dolorum dolore, quasi quae voluptate.",
        id: 1,
    },
    { heading: "heading1", content: "lorem ipsum", id: 2 },
    { heading: "heading1", content: "lorem ipsum", id: 3 },
    { heading: "heading1", content: "lorem ipsum", id: 4 },
    { heading: "heading1", content: "lorem ipsum", id: 5 },
    { heading: "heading1", content: "lorem ipsum", id: 6 },
    { heading: "heading1", content: "lorem ipsum", id: 7 },
];

const createNotes = (array) => {
    array.forEach((cardObj) => {
        const { heading, content, id } = cardObj;

        const card = document.createElement("div");
        card.classList.add("card");
        card.id = id;

        const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><div class="edit-note"><img src="../../assets/edit-note.svg" alt=""></div></div><div class="card-content">${content}</div>`;

        card.innerHTML = insideHtml;

        cardContainer.appendChild(card);
    });
};

createNotes(cardData);

const body = document.querySelector("body");

window.addEventListener("load", () => {
    body.classList.add("visible");
});
