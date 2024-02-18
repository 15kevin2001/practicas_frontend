function showLoginForm() {
    window.location.href = 'login.html';
}

function login() {
    // Obtener valores de los campos de usuario y contraseña
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validar que ambos campos estén completos
    if (username === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Simular una verificación de credenciales (en un entorno real, esto debería ser manejado en el servidor)
    if (username === "usuario" && password === "contraseña") {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        // Aquí podrías redirigir al usuario a la página principal o realizar otras acciones necesarias después del inicio de sesión.
    } else {
        alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    }
}