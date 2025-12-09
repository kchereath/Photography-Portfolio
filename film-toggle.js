/**
 * Film Toggle Module
 * Handles switching between Colored and Black & White film subsections
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const subsections = document.querySelectorAll('.film-subsection');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');

            // Remove active class from all buttons and subsections
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            subsections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
});
