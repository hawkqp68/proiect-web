const toggleBTN = document.getElementById('theme-toggle');

toggleBTN.addEventListener('click', function(e) {

    e.preventDefault();

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        toggleBTN.textContent = '☀️ Light Mode';
    } else {
        toggleBTN.textContent = ' 🌙 Dark Mode';
    }

});