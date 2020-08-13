//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("buttonLogin").addEventListener("click", function(e){
        let imputEmail = document.getElementById("login");
        let imputPassword = document.getElementById("password");
        let email;
        let pass;

        if(imputEmail.value === ""){
            imputEmail.style.border = "2px solid red"
            imputEmail.style.borderRadius = "border-radius: 4px";
            email = false;
        }
        else{
            imputEmail.style.border = ""
            imputEmail.style.borderRadius = "";
            email = true;
        } 

        if(imputPassword.value === ""){
            imputPassword.style.border = "2px solid red"
            imputPassword.style.borderRadius = "border-radius: 4px";
            datosCompletos = false;
        }
        else{
            imputPassword.style.border = ""
            imputPassword.style.borderRadius = "";
            pass = true;

        }

        if(email && pass){
            window.location = "home.html"
        } 
    });
});