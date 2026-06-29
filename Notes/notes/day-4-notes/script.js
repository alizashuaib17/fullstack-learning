let users = [];

async function fetchUsers() {

    try {

        document.querySelector("#loading").textContent = "Loading...";

        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        let data = await response.json();

        users = data;

        displayUsers(users);

        document.querySelector("#loading").textContent = "";

    }

    catch(error) {

        document.querySelector("#loading").textContent =
            "Failed to load users";

    }

}

function displayUsers(usersList) {

    let container = document.querySelector("#users-container");

    container.innerHTML = "";

    usersList.forEach(user => {

        container.innerHTML += `
            <div class="card">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.address.city}</p>
            </div>
        `;

    });

}

document.querySelector("#search")
.addEventListener("input", function() {

    let searchText = this.value.toLowerCase();

    let filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText)
    );

    displayUsers(filteredUsers);

});

fetchUsers();