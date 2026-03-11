const acum=new Date();
     const ora=acum.getHours();
     const Header=document.querySelector('header p');

     if(ora>=6 && ora<=11){
        Header.textContent="Bună dimineața!";
        }else if(ora>=12 && ora<=18){
            Header.textContent="Bună ziua!";
        }else {
            Header.textContent="Bună seara!";
        }