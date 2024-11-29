let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

function renderTable() {
    const tableBody = document.getElementById("alumnosTable");
    tableBody.innerHTML = "";
    alumnos.forEach(alumno => {
    const row = document.createElement("tr");
        row.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>
                <div class="actions">
                    <button class="edit" onclick="editAlumno(${alumno.id})">Editar</button>
                    <button class="delete" onclick="deleteAlumno(${alumno.id})">Eliminar</button>
                    <button class="assign" onclick="assignMaterias(${alumno.id})">Asignar</button>
                </div>
            </td>
            `;
        tableBody.appendChild(row);
    });
}

renderTable();

function deleteAlumno(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
        alumnos = alumnos.filter(a => a.id != id);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        renderTable();
    }
}

function editAlumno(id) {
    alert(`Función para editar al alumno con ID: ${id}`);
}

function assignMaterias() {
    location.href = "/materias/materias_add.html";
}