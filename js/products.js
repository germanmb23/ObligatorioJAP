const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT_UP = "Up";
const ORDER_BY_PROD_COUNT_DOWN = "Down";
const ORDER_BY_PROD_RELEVANCE = "Relevance";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var search = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT_DOWN) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT_UP) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return 1; }
            if (aCount < bCount) { return -1; }
            return 0;
        });

    } else if (criteria === ORDER_BY_PROD_RELEVANCE) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });

    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let product = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) && ((search == undefined) || (search != undefined && product.name.toLowerCase().indexOf(search) != -1))) {

            htmlContentToAppend += `

            <div class="col-md-4" onClick="setProductId(` + i + `)">
            <div class="card mb-4 shadow-sm">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <div class="card-body">
                    <h4>` + product.name + `</h4>
                    <p class="card-text">` + product.description + `</p>
                    <div class="d-flex justify-content-between align-items-center">
                    ` + product.cost + " " + product.currency + `
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                </div>
            </div>
        </div>
            `
        }

        document.getElementById("grid_items").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCountUp").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT_UP);
    });


    document.getElementById("sortByCountDown").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT_DOWN);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("searchBar").value = "";


        minCount = undefined;
        maxCount = undefined;
        search = undefined;
        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });
});

document.getElementById("searchBar").addEventListener("input", function() {
    search = document.getElementById("searchBar").value.toLowerCase();
    showProductsList();
});

function setProductId(id) {
    storage = window.localStorage;
    storage.setItem("idSelected", JSON.stringify({ selectedProductId: id }));
    window.location = "product-info.html"
}