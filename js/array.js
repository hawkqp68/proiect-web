const lista = document.querySelectorAll("#education li");

const educatie = Array.from(lista).map(function(el){
    return el.textContent;
});

console.log(educatie);


const filtru2024 = educatie.filter(function(e){
    return e.includes("2024");
});

console.log(filtru2024);


const filtruLiceu = educatie.filter(function(e){
    return e.includes("Liceu");
});

console.log(filtruLiceu);


const primulCuvant = educatie.map(function(e){
    return e.split(" ")[0];
});

console.log(primulCuvant);


const ani = educatie.map(function(e){
    const nr = e.match(/\d{4}/g);

    if(nr.length == 2){
        return nr[1] - nr[0];
    }

    return 0;
});

const total = ani.reduce(function(s, x){
    return s + x;
}, 0);

console.log("Total ani de studiu:", total);