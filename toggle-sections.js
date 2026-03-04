const titluri = document.querySelectorAll('main h2');

titluri.forEach(function(h2){

    h2.textContent = "▼ " + h2.textContent;

    h2.addEventListener('click', function(){

        let element = this.nextElementSibling;

        while(element){

            element.classList.toggle('hidden');
            element = element.nextElementSibling;

        }

        if(this.textContent.startsWith("▼")){
            this.textContent = this.textContent.replace("▼","▶");
        } else {
            this.textContent = this.textContent.replace("▶","▼");
        }

    });

});