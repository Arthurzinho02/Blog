const msg = document.querySelector('.js-msg');

function autenticar(event){
        event.preventDefault()
        const email= event.target[0].value
        const password = event.target[1].value

        if (email === "teachercadu@gmail.com" && password === "euamoaleticia"){
            location.href = "/interface/pag2.html"
        }
        else{
            msg.classList.add("active");
            setTimeout(() => {
                msg.classList.remove("active");
              }, 3000);
        }
    }