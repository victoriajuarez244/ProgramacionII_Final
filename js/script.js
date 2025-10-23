// Preloader simple 
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Detectar dispositivo móvil para ajustes específicos
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor performance
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = el.style.transition.replace(/\d+\.?\d*s/g, '0.2s');
    });
}
