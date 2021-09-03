let searchInputElement = document.getElementById("searchInput");
let searchResultsContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendOfResult(result, uniqueId) {
    let listId = "li" + uniqueId;
    let {
        name,
        birth_date,
        top_work,
        work_count
    } = result;
    if (birth_date === undefined) {
        birth_date = "No Birth date";
    } else {
        birth_date = birth_date;
    }
    if (top_work === undefined) {
        top_work = "No Top Work";
    } else {
        top_work = top_work;
    }
    if (work_count === undefined) {
        work_count = "No Total Books";
    } else {
        work_count = work_count;
    }

    let searchListElement = document.createElement("li");
    searchListElement.id = listId;
    searchListElement.classList.add("author-list-item-container");
    searchResultsContainer.appendChild(searchListElement);

    let nameContainer = document.createElement("div");
    nameContainer.classList.add("author-name-container", "d-flex", "flex-row");
    searchListElement.appendChild(nameContainer);

    let nameElement = document.createElement("label");
    nameElement.classList.add("author-name-styling");
    nameElement.textContent = name;
    nameContainer.appendChild(nameElement);

    let angleUpIconContainer = document.createElement("div");
    angleUpIconContainer.classList.add("icon-container");
    nameContainer.appendChild(angleUpIconContainer);

    let angleDownIcon = document.createElement("i");
    angleDownIcon.classList.add("fas", "fa-angle-down", "angle-icon");
    angleUpIconContainer.appendChild(angleDownIcon);

    let angleUpIcon = document.createElement("i");
    angleUpIcon.classList.add("fas", "fa-angle-up", "angle-icon");

    let detailsContainer = document.createElement('div');
    let authorDetailsId = "author" + uniqueId;
    detailsContainer.id = authorDetailsId;

    angleDownIcon.onclick = function() {
        detailsContainer.classList.remove('d-none');
        detailsContainer.classList.add('author-name-styling', 'author-details-styling');
        detailsContainer.textContent = "Author Details";


        let unOrderedList = document.createElement("ul");
        unOrderedList.classList.add("inside-list-element");
        detailsContainer.appendChild(unOrderedList);

        let birthDateElement = document.createElement("li");
        birthDateElement.textContent = "Birth Date: " + birth_date;
        unOrderedList.appendChild(birthDateElement);

        let topWorkElement = document.createElement("li");
        topWorkElement.textContent = "Top Work: " + top_work;
        unOrderedList.appendChild(topWorkElement);

        let totalBooksElement = document.createElement("li");
        totalBooksElement.textContent = "Total Books: " + work_count;
        unOrderedList.appendChild(totalBooksElement);

        searchListElement.appendChild(detailsContainer);
        angleUpIconContainer.removeChild(angleDownIcon);
        angleUpIconContainer.appendChild(angleUpIcon);

    };

    angleUpIcon.onclick = function() {
        let removeContainer = document.getElementById(authorDetailsId);
        removeContainer.classList.add('d-none');
        angleUpIconContainer.removeChild(angleUpIcon);
        angleUpIconContainer.appendChild(angleDownIcon);
    };
}

function displaySearchResult(docs) {
    spinnerEl.classList.add("d-none");
    for (let i = 0; i < docs.length; i++) {
        createAndAppendOfResult(docs[i], i);
    }
}

function searchResults(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let searchEnteredValue = searchInputElement.value;
        searchResultsContainer.textContent = "";

        let url = "https://openlibrary.org/search/authors.json?q=" + searchEnteredValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    docs
                } = jsonData;
                if (docs.length !== 0) {
                    displaySearchResult(docs);
                }
            });
    }
}
searchInputElement.addEventListener('keydown', searchResults);