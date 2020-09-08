//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carInfoArray
var commentsArray
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let user = window.localStorage.getItem("user");
            user = JSON.parse(user);
            carInfoArray = resultObj.data
            showCarInfo(user.idSelected);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data
            showComments();
        }
    });
});

function showCarInfo(id) {

    let indicators = ''

    let carruselContent = ''

    for (let i = 0; i < carInfoArray.images.length; i++) {

        carruselContent += ` <div class="carousel-item ${(i == 0) ? 'active' : ''}">
                            <img class="d-block w-100" src="` + carInfoArray.images[i] + `" alt="Third slide">
                            </div>`
        indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" ${(i == 0) ? 'class="active"' : ''}></li>`

    }

    document.getElementById('sold').innerHTML = 'Vendidos: ' + carInfoArray.soldCount
    document.getElementById('category').innerHTML = 'Categoria: ' + carInfoArray.category
    document.getElementById('nameInfo').innerHTML = carInfoArray.name
    document.getElementById('descriptionInfo').innerHTML = carInfoArray.description
    document.getElementById('carCarrousel').innerHTML = carruselContent
    document.getElementById('indicators').innerHTML = indicators
}

function showComments() {
    let commentContent = document.getElementById('comments').innerHTML

    for (let i = 0; i < commentsArray.length; i++) {

        let puntuacion = ''
        for (let j = 1; j <= 5; j++) {
            puntuacion += `<span class="fa fa-star ${(j <= commentsArray[i].score) ? 'checked' : ''}"></span>`
        }

        commentContent += `<div class="row container"">
        <div class="container" >
            <div class="card card-white post">
                <div class="post-heading">
                    <div class="float-left image">
                        <img src="./img/user-img.png" class="img-circle avatar" alt="user profile image">
                    </div>
                    <div class="float-left meta">
                        <div class="title h5">
                            <a href="#"><b>` + commentsArray[i].user + `</b></a>
                            <div id="score">
                            ` + puntuacion + `</div>

                        </div>
                    </div>
                </div>
                <div class="post-description">
                    <p>` + commentsArray[i].description + `</p>

                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById('comments').innerHTML = commentContent
}
/* {
    "name": "Chevrolet Onix Joy",
    "description": "Potenciá tu actitud con Onix Joy que, además de destacarse por su diseño juvenil y moderno, te ofrecé una óptima autonomía, un desempeño equilibrado y el máximo confort interior. \u003cbr\u003eYa sea un viaje largo o un simple paseo por la ciudad, el confort es uno de los puntos fuertes del Onix. Esta versión incluye aire acondicionado, asientos tapizados en tela y gran espacio interior que te garantiza el máximo confort.",
    "cost": 13500,
    "currency": "USD",
    "soldCount": 14,
    "category": "Autos",
    "images": [
        "img/prod1.jpg",
        "img/prod1_1.jpg",
        "img/prod1_2.jpg",
        "img/prod1_3.jpg",
        "img/prod1_4.jpg"
    ],
    "relatedProducts": [1, 3]
} */