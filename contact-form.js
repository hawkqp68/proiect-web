const form = document.querySelector('form');

form.addEventListener('submit', function(event) {

    event.preventDefault(); 

    const nume = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mesaj = document.getElementById('message').value.trim();

    const feedback = document.getElementById('form-feedback');

 
    if (nume.length < 2) {
        feedback.textContent = "Nume prea scurt!";
        feedback.style.color = "red";
        return;
    }

    
    if (!email.includes('@')) {
        feedback.textContent = "Email invalid!";
        feedback.style.color = "red";
        return;
    }

    
    if (mesaj.length < 10) {
        feedback.textContent = "Mesajul trebuie să aibă cel puțin 10 caractere!";
        feedback.style.color = "red";
        return;
    }

    
    feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;
    feedback.style.color = "green";

    form.reset();
});