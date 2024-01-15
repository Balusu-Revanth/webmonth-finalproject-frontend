const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

const updateNoteButton = document.querySelector(".update-note-button");

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

fetch(`${apiUrl}/note/getnotebyid/${noteId}`, {
    method: "GET",
    headers: {
        authorization: token,
    },
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.message) {
            const { heading, content } = data.data[0];
            document.querySelector(".update-note-heading").value = heading;
            document.querySelector(".update-note-input").value = content;
        }
    })
    .catch((err) => {
        alert("Error Fetching Note");
        console.log(err);
    });

updateNoteButton.addEventListener("click", () => {
    const heading = document.querySelector(".update-note-heading").value;
    const content = document.querySelector(".update-note-input").value;
    if (token) {
        fetch(`${apiUrl}/note/update/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({
                heading,
                content,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message) {
                    location.href = "/pages/dashboard/dashboard.html";
                }
            })
            .catch((err) => {
                alert("Error Updating Note");
                console.log(err);
            });
    }
});
