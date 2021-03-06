/*
`showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
    let startIndex = page * 9 - 9;
    let endIndex = page * 9;
    let studentList = document.querySelector(".student-list");

    // Removes any existing student items that might have been displayed previously
    studentList.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            let studentItem = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>
       `;
            studentList.insertAdjacentHTML("beforeend", studentItem);
        }
    }
}

/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
    let numOfpages = Math.ceil(list.length / 9);

    let linkList = document.querySelector(".link-list");

    // Removes any existing pagination buttons that might have been displayed previously
    linkList.innerHTML = "";

    for (let i = 1; i <= numOfpages; i++) {
        let button = `
      <li>
      <button type="button">${i}</button>
      </li>
      `;
        linkList.insertAdjacentHTML("beforeend", button);
    }

    // Adds "active" class to first button
    let firstButton = document.querySelector("button:first-of-type");
    firstButton.className = "active";

    // Adds "active" class to button that is click and removes "active" class from previously active button
    linkList.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            let activeButton = document.querySelector(".active");

            activeButton.className = "";
            e.target.className = "active";
            showPage(list, e.target.textContent);
        } else {
            return;
        }
    });
}

/*
`addSearchComponent` function
This function will create and insert a search bar
*/

function addSearchComponent() {
    let header = document.querySelector("header");
    let searchBar = `
   <label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button id="submit" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
   `;

    header.insertAdjacentHTML("beforeend", searchBar);
}

/*
`searchFunction` function
This function will perform a search and display match items
*/

function searchFunction(searchInput, array) {
    let header = document.querySelector("header");
    let noResults = document.querySelector(".no-results");
    let matchedItems = [];

    for (let i = 0; i < array.length; i++) {
        noResults.style.display = "none";
        if (
            searchInput.value.length != 0 &&
            (array[i].name.first
                .toLowerCase()
                .includes(searchInput.value.toLowerCase()) ||
                array[i].name.last
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase()))
        ) {
            matchedItems.push(array[i]);
        }
    }

    if (matchedItems.length === 0) {
        noResults.style.display = "block";
    }

    showPage(matchedItems, 1);
    addPagination(matchedItems);
}
showPage(data, 1);
addPagination(data);
addSearchComponent();
const search = document.querySelector("#search");
const submit = document.querySelector("#submit");

/**
 * Event listeners for buttons - Invokes search function in the body of the callbacks in the event listeners below
 */

/* submit listener */
submit.addEventListener("click", (event) => {
    event.preventDefault();

    searchFunction(search, data);
});

/* submit listener */
search.addEventListener("keyup", () => {
    searchFunction(search, data);
});
