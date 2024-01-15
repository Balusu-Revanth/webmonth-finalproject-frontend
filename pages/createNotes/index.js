const createNoteButton = document.querySelector(".create-note-button");

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

createNoteButton.addEventListener("click", () => {
    const heading = document.querySelector(".create-note-heading").value;
    const content = document.querySelector(".create-note-input").value;
    if (token) {
        fetch(`${apiUrl}/note/add`, {
            method: "POST",
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
                alert("Error Creating Note");
                console.log(err);
            });
    }
});
