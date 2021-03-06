const form = document.querySelector("form");
const api_url = "http://localhost:5000/submissions";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = formData(form);

    fetch(api_url, {
        method: "POST",
        body: JSON.stringify(fd),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
        .then(response => response.json())
        .then(log => console.log(log));
});

function formData(form) {
    const fd = new FormData(form);
    const name = fd.get("name");
    const email = fd.get("email");
    const age = fd.get("age");
    const bth_class = fd.get("bth_class");
    const food = fd.get("food") === "on";
    const event = fd.get("event");

    return {
        event,
        name,
        email,
        age,
        bth_class,
        food
    };
}