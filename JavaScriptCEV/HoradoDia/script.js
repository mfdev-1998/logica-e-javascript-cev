function carregar() {
    var msg = window.document.getElementById('msg')
    var img = window.document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours()
    
    msg.innerHTML = `Agora são ${hora} horas.`
    if (hora >= 0 && hora < 12) {
       //Esse é referente ao Bom Dia! 
       img.src = 'manhã.jpg'
       document.body.style.background = '#023005ff'
    } else if (hora >= 12 && hora <= 18) {
        //Esse é referente ao Boa Tarde!
        img.src = 'tarde.jpg'
        document.body.style.background = '#bd841bff'
    }else {
        //Referente ao Boa Noite!
        img.src = 'noite.jpg'
        document.body.style.background = '#6e339eff'
    }

}

