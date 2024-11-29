const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const loadOptions = () => {
    const alumnos = getLocalData("alumnos");
    const materias = getLocalData("materias");

    const alumnoSelect = document.getElementById("alumno");
    const materiaSelect = document.getElementById("materia");

    alumnoSelect.innerHTML = '<option value="" disabled selected>Selecciona un alumno</option>';
    materiaSelect.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';

    alumnos.forEach(alumno => {
        const option = document.createElement("option");
        option.value = alumno.id;
        option.textContent = alumno.nombre;
        alumnoSelect.appendChild(option);
    });

    materias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia;
        option.textContent = materia;
        materiaSelect.appendChild(option);
    });
};

const loadAsignacionesTabla = () => {
    const asignaciones = getLocalData("asignaciones");
    const alumnos = getLocalData("alumnos");
    const tabla = document.getElementById("asignacionesTabla");

    tabla.innerHTML = "";

    asignaciones.forEach(asignacion => {
        const alumno = alumnos.find(a => a.id === parseInt(asignacion.alumnoId, 10));
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${asignacion.alumnoId}</td>
            <td>${alumno ? alumno.nombre : "Desconocido"}</td>
            <td>${asignacion.materia}</td>
            <td></td>
        `;
        let lastTd = row.querySelector("td:last-child");
        let input = document.createElement("input");
        input.type = "number";
        input.name = "calificacion"; 
        input.placeholder = "Calificación del 1 al 10"; 
        input.min = "0"; 
        input.max = "10";
        input.step = "0.1";
        input.className = "input-calificacion";

        // Validación del input
        input.addEventListener("input", () => {
            let value = parseFloat(input.value);
            if (value > 12) {
                alert("El número ingresado no puede ser mayor a 10.");
                input.value = ""; 
            } else if (value < 0) {
                input.value = "0";
            } else if (value > 10) {
                input.value = "10";
            }
        });

        // Guardar calificación en localStorage
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const asignaciones = getLocalData("asignaciones");
                const index = asignaciones.findIndex(
                    a => a.alumnoId === asignacion.alumnoId && a.materia === asignacion.materia
                );

                if (index !== -1) {
                    asignaciones[index].calificacion = input.value || null;
                    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
                    const isConfirmed = confirm("Calificación registrada");
                    if (isConfirmed) {
                        if (asignacion.calificacion) {
                            input.value = asignacion.calificacion;
                            input.disabled = true; 
                        }
                    }
                }
            
            }
        });

        lastTd.appendChild(input);

        tabla.appendChild(row);
    });
};

document.getElementById("assignForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const alumnoId = document.getElementById("alumno").value;
    const materia = document.getElementById("materia").value;

    if (!alumnoId || !materia) {
        alert("Por favor selecciona un alumno y una materia.");
        return;
    }

    let asignaciones = getLocalData("asignaciones");

    asignaciones.push({ alumnoId, materia });
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));

    alert("Materia asignada correctamente.");
    this.reset();
    loadAsignacionesTabla(); 
});

loadOptions();
loadAsignacionesTabla();
