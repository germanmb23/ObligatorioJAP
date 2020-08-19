//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("buttonLogin").addEventListener("click", function(e) {
        let imputEmail = document.getElementById("login");
        let imputPassword = document.getElementById("password");
        let email;
        let pass;

        if (imputEmail.value === "") {
            imputEmail.classList.add("invalid")
            email = false;
        } else {
            imputEmail.classList.remove("invalid")
            email = true;
        }

        if (imputPassword.value === "") {
            imputPassword.classList.add("invalid")
            pass = false;
        } else {
            imputPassword.classList.remove("invalid");
            pass = true;
        }


        if (email && pass) {
            storage = window.localStorage;
            storage.setItem("user", JSON.stringify({ email: imputEmail.value }));
            window.location = "home.html"
        }
    });
});