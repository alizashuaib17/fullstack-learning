alert=('welcome!');
const themeButton = document.querySelector("#theme-btn");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

const form = document.querySelector("#contact-form");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;

    if (name === "" || email === "" || message === "") {
        document.querySelector("#thank-you").textContent =
            "Please fill all fields.";
    } else {
        document.querySelector("#thank-you").textContent =
            `Thank you, ${name}!`;
    }
});

const addSkillButton = document.querySelector("#add-skill-btn");

addSkillButton.addEventListener("click", function () {

    let skill = document.querySelector("#new-skill").value;

    if (skill !== "") {

        let newItem = document.createElement("li");

        newItem.textContent = skill;

        document.querySelector("#skills-list").appendChild(newItem);
    }
});