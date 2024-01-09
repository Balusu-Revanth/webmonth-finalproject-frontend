const createNoteInput = document.querySelector(".create-note-input");

createNoteInput.addEventListener("change", (e) => {
    console.log(e.target.value);
});
