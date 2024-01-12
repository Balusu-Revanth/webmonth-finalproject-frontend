const body = document.querySelector('body');
const signInsSignUpButton = document.querySelector('.sign-in-sign-up');

window.addEventListener('load', () => {
    body.classList.add("visible")
});

signInsSignUpButton.addEventListener('click', (e) => {
    location.href = './pages/signInsignUp/authenticate.html';
});
