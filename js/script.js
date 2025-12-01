// mensaje de consola inicial
console.log('🎨 Página de Diseño Gráfico cargada correctamente!');

// preloader 
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800); 
    }
});

// navegación activa - resalta la sección actual en el menú
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// scroll suave con compensación del header fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 120;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// animaciones al hacer scroll - intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// select personalizado - dropdown con diseño custom
document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.getElementById('custom-servicio');
    const trigger = customSelect.querySelector('.custom-select__trigger');
    const options = customSelect.querySelectorAll('.custom-select__options li');
    const hiddenSelect = document.getElementById('servicio');

    // abrir y cerrar el select
    trigger.addEventListener('click', function() {
        customSelect.classList.toggle('open');
    });

    // seleccionar una opción
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // actualizar texto visible
            trigger.querySelector('span').textContent = value;
            
            // actualizar select oculto
            hiddenSelect.value = value;
            
            // marcar como seleccionado
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // cerrar el select
            customSelect.classList.remove('open');
        });
    });

    // cerrar al hacer clic fuera del select
    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
});

// arrastrar y soltar archivos
document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('archivo');
    const fileNameLabel = document.getElementById('drop-zone-file-name');

    if (!dropZone || !fileInput) return;

    // click en la zona para abrir selector de archivos
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // actualizar nombre del archivo al seleccionar
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
            fileNameLabel.textContent = fileInput.files[0].name;
        } else {
            fileNameLabel.textContent = '';
        }
    });

    // prevenir comportamiento por defecto en eventos de drag
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // agregar clase visual cuando se arrastra sobre la zona
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drop-zone--over');
        });
    });

    // quitar clase visual al salir o soltar
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drop-zone--over');
        });
    });

    // manejar el archivo soltado
    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            fileInput.files = files;
            fileNameLabel.textContent = files[0].name;
        }
    });
});

// botón volver arriba - scroll to top
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4C82D8;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopButton);

// mostrar u ocultar botón según scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.transform = 'scale(1)';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transform = 'scale(0.8)';
    }
});

// acción del botón volver arriba
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// efecto hover en botones - animación al pasar el mouse
document.querySelectorAll('button, a[href="#contacto"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// emailjs - envío del formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;
    const archivoInput = document.getElementById('archivo');
    
    // verificar si hay archivo adjunto
    let archivoInfo = 'No se adjuntó ningún archivo.';
    if (archivoInput.files && archivoInput.files[0]) {
        const file = archivoInput.files[0];
        archivoInfo = `El cliente tiene un archivo para enviar: ${file.name} (${(file.size / 1024).toFixed(2)} KB).\nPedile que te lo envíe por WhatsApp o email.`;
    }
    
    // parámetros para la plantilla de emailjs
    const templateParams = {
        nombre: nombre,
        email: email,
        servicio: servicio,
        mensaje: mensaje,
        archivo_info: archivoInfo
    };
    
    // cambiar el texto del botón mientras se envía
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // enviar el email usando emailjs
    emailjs.send('service_e4p8ynn', 'template_qfiaeii', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // mostrar mensaje de éxito
            if (archivoInput.files && archivoInput.files[0]) {
                alert('¡Mensaje enviado con éxito!\n\nPor favor, envianos tu archivo de referencia por:\n• WhatsApp: +54 341 300-5198\n• Email: contactolosleones00@gmail.com');
            } else {
                alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
            }
            
            // limpiar el formulario
            contactForm.reset();
            
            // resetear el custom select al valor por defecto
            const customSelectTrigger = document.querySelector('.custom-select__trigger span');
            if (customSelectTrigger) {
                customSelectTrigger.textContent = 'Remera';
            }
            
            // limpiar el nombre del archivo en el drop zone
            const dropZoneFileName = document.getElementById('drop-zone-file-name');
            if (dropZoneFileName) {
                dropZoneFileName.textContent = '';
            }
            
            // restaurar el botón al estado original
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // mostrar mensaje de error
            alert('Hubo un error al enviar el mensaje. Por favor, intentá de nuevo o contactanos por WhatsApp.');
            
            // restaurar el botón al estado original
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});



