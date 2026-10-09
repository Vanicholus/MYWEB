// =========================================================
// ICT251 Activity 3 - Interactive features
// Author: Vanicholus Kunda
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------------------------------
    // FEATURE 1 (COMPULSORY): Contact form validation + preview
    // -----------------------------------------------------

    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const preview = document.getElementById('form-preview');

    // Simple but strict email pattern
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Validate the contact form fields.
     * Returns true if every field is valid, false otherwise.
     */
    function validateForm() {
        let ok = true;

        // Name: not empty, not just whitespace
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name (not just spaces).';
            ok = false;
        } else {
            nameError.textContent = '';
        }

        // Email: matches pattern
        if (!EMAIL_RE.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            ok = false;
        } else {
            emailError.textContent = '';
        }

        // Message: not empty, not just whitespace
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter a message (not just spaces).';
            ok = false;
        } else {
            messageError.textContent = '';
        }

        return ok;
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // keep the submission local

            if (!validateForm()) {
                preview.className = 'error';
                preview.textContent = 'Please fix the errors above.';
                return;
            }

            // Build a safe preview using textContent (never innerHTML)
            preview.className = 'success';
            preview.textContent = '';

            const title = document.createElement('p');
            title.innerHTML = '<strong>Form data validated (not sent).</strong>';

            const nameLine = document.createElement('p');
            nameLine.textContent = 'Name: ' + nameInput.value.trim();

            const emailLine = document.createElement('p');
            emailLine.textContent = 'Email: ' + emailInput.value.trim();

            const msgLine = document.createElement('p');
            msgLine.textContent = 'Message: ' + messageInput.value.trim();

            preview.append(title, nameLine, emailLine, msgLine);
        });
    }

    // -----------------------------------------------------
    // FEATURE 2: Expandable content (show/hide project details)
    // -----------------------------------------------------

    document.querySelectorAll('.toggle-details').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const details = btn.nextElementSibling;
            const isHidden = details.hasAttribute('hidden');

            if (isHidden) {
                details.removeAttribute('hidden');
                btn.textContent = 'Hide details';
                btn.setAttribute('aria-expanded', 'true');
            } else {
                details.setAttribute('hidden', '');
                btn.textContent = 'Show details';
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // -----------------------------------------------------
    // FEATURE 3: Gallery viewer (Previous / Next)
    // -----------------------------------------------------

    const galleryData = [
        { src: 'images/photo1.jpg',
          caption: 'My study space where I practise coding every day.' },
        { src: 'images/photo2.jpg',
          caption: 'A view of my university campus.' },
        { src: 'images/photo3.jpg',
          caption: 'A small project I built while learning web development.' }
    ];

    let galleryIndex = 0;
    const galleryImg = document.getElementById('gallery-img');
    const galleryCaption = document.getElementById('gallery-caption');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');

    /**
     * Show the photo at the current gallery index.
     * Updates src, alt and caption.
     */
    function showPhoto() {
        const item = galleryData[galleryIndex];
        galleryImg.src = item.src;
        galleryImg.alt = item.caption;
        galleryCaption.textContent = item.caption;
    }

    if (prevBtn && nextBtn && galleryImg) {
        prevBtn.addEventListener('click', function () {
            galleryIndex = (galleryIndex - 1 + galleryData.length) % galleryData.length;
            showPhoto();
        });
        nextBtn.addEventListener('click', function () {
            galleryIndex = (galleryIndex + 1) % galleryData.length;
            showPhoto();
        });
        showPhoto(); // initialize
    }

    // -----------------------------------------------------
    // FEATURE 4: Theme switch (light / dark)
    // -----------------------------------------------------

    const themeBtn = document.getElementById('theme-toggle');

    /**
     * Toggle `dark` class on <body> and update the button label.
     */
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        themeBtn.textContent = isDark ? 'Light theme' : 'Dark theme';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

});