// ************************** Fade Up Animation ************************** //
function fadeUpAnimation() {
  let fadeUpContainer = document.querySelectorAll(".fade-up");

  for (let i = 0; i < fadeUpContainer.length; i++) {
    let windowHeight    = window.innerHeight;
    let elementTop      = fadeUpContainer[i].getBoundingClientRect().top;
    let elementVisible  = 150;

    if (elementTop < windowHeight - elementVisible) {
      fadeUpContainer[i].classList.add("animate");
    }
  }
}

window.addEventListener("scroll", fadeUpAnimation);
// ************************** Fade Up Animation ************************** //