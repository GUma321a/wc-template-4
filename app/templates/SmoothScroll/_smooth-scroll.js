// ************************** Smooth Scroll ************************** //
const smoothLinks = document.querySelectorAll('.smooth-scroll[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}
// ************************** Smooth Scroll ************************** //