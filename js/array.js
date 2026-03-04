const lista = document.querySelectorAll("#education li");

let educatie = [];

lista.forEach(function(item){
    educatie.push(item.textContent);
});

console.log(educatie);


let filtru1 = educatie.filter(function(e){
    return e.includes("2024");
});

console.log(filtru1);


let filtru2 = educatie.filter(function(e){
    return e.includes("Liceu");
});

console.log(filtru2);


let primeleCuvinte = educatie.map(function(e){
    return e.split(" ")[0];
});

console.log(primeleCuvinte);


let total = educatie.reduce(function(suma, e){

    let ani = e.match(/\d{4}/g);

    if(ani.length == 2){
        return suma + (ani[1] - ani[0]);
    }

    return suma;

}, 0);

console.log("Total ani de studiu:", total);