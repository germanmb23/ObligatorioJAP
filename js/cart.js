//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showItems(resultObj.data);
        }
    });
});

function showItems(itemsArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < itemsArray.articles.length; i++) {
        let item = itemsArray[i];

        htmlContentToAppend += `
                <a  class="list-group-item list-group-item-action" onClick="" style="margin-left: auto; margin-right: auto; position: relative;">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + itemsArray.articles[i].src + `" alt=" + product.description + " class="img-thumbnail">
                        </div>
                        
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + itemsArray.articles[i].name + `</h4>
                            </div>
                            <div class="row" style="height: 120px">
                            <div class="col align-self-center">
                            <p class="mb-1" style="font-size: 20px;">` + itemsArray.articles[i].unitCost + " " + itemsArray.articles[i].currency + `</p>
                            </div> 
                            <div class="col align-self-center" style="justify-content: right; display: grid;">
                                Cantidad
                            </div>   
                            <div class="col align-self-center">
                            <input type="number" id="cant${i}" class="mb-1 align-self-center" style="width:100px" value=${itemsArray.articles[i].count} min="0" onChange="calcSubTotal(${itemsArray.articles[i].unitCost}, ${i})">
                            </div>
                            <div class="col align-self-center" style="justify-content: right; display: grid;">
                            Subtotal:
                            </div> 
                            <div class="col align-self-center subtotal" id="subtotal${i}" style="justify-content: left; display: grid;">
                            ${itemsArray.articles[i].unitCost * itemsArray.articles[i].count}
                            </div> 
                        </div>
                            </div>
                        
                    </div>
                </a>
            `

        document.getElementById('itemsList').innerHTML = htmlContentToAppend;
    }
    calcTotal()
}

function calcSubTotal(cost, id, currency) {
    let subtotal = document.getElementById('cant' + id).value
    document.getElementById('subtotal' + id).innerHTML = subtotal * cost
    calcTotal()
}

function calcTotal() {
    let elements = document.getElementsByClassName("subtotal")
    let total = 0
    for (let index = 0; index < elements.length; index++) {
        total += Number(elements[index].innerHTML);
    }
    document.getElementById('total').innerHTML = "Total: " + total + ' $'
}