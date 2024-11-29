const users = [
    { username: "alumno1", password: "12345" },
    { username: "alumno2", password: "password" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(user => user.username === username && user.password === password);

    const errorMessage = document.getElementById("errorMessage");
    if (user) {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        window.location.href = "/login/redireccion.html";
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        errorMessage.style.display = "block";
    }
});