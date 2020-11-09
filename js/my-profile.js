//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    storage = window.localStorage
    let userInfo = storage.getItem("userInfo")
    console.log(userInfo)
    if (userInfo != undefined) {
        userInfo = JSON.parse(userInfo)
        document.getElementById("first_name").value = userInfo.first_name
        document.getElementById("last_name").value = userInfo.last_name
        document.getElementById("age").value = userInfo.age
        document.getElementById("email").value = userInfo.email
        document.getElementById("phone").value = userInfo.phone
    } else {
        document.getElementById("first_name").value = ""
        document.getElementById("last_name").value = ""
        document.getElementById("age").value = ""
        document.getElementById("email").value = ""
        document.getElementById("phone").value = ""
    }
});

function handleSubmit() {
    let first_name = document.getElementById("first_name").value
    let last_name = document.getElementById("last_name").value
    let age = document.getElementById("age").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value

    storage = window.localStorage

    const user = {
        "first_name": first_name,
        "last_name": last_name,
        "age": age,
        "email": email,
        "phone": phone
    }

    storage.setItem("userInfo", JSON.stringify(user))
}

function handleClear() {
    storage = window.localStorage
    storage.removeItem("userInfo")
}