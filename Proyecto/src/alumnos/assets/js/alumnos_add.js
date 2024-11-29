document.getElementById("alumnoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
 

    const newAlumno = { id: Date.now(), nombre };
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos.push(newAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    alert("Alumno agregado exitosamente");
    location.href = "alumnos_list.html";
    this.reset();
});