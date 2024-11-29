const getMaterias = () => JSON.parse(localStorage.getItem('materias')) || [];
const saveMaterias = (materias) => localStorage.setItem('materias', JSON.stringify(materias));

const addMateriaForm = document.getElementById('addMateriaForm');
if (addMateriaForm) {
  addMateriaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const materiaInput = document.getElementById('materia');
    const nuevaMateria = materiaInput.value.trim();

    if (!nuevaMateria) {
      alert('Por favor, ingresa un nombre para la materia.');
      return;
    }

    const materias = getMaterias();

    if (materias.includes(nuevaMateria)) {
      alert('La materia ya fue registrada.');
      return;
    }

    materias.push(nuevaMateria);
    saveMaterias(materias);

    materiaInput.value = ''; // Limpiar el campo de entrada
    alert('Materia agregada correctamente');
  });
}

const materiasList = document.getElementById('materiasList');
if (materiasList) {
  const materias = getMaterias();

  if (materias.length === 0) {
    materiasList.innerHTML = '<li>No hay materias registradas.</li>';
  } else {
    materias.forEach((materia, index) => {
      const li = document.createElement('li');
      li.textContent = materia;

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('buttons');

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => {
        const nuevoNombre = prompt('Actualiza el nombre de la materia:', materia)?.trim();

        if (nuevoNombre && nuevoNombre !== materia) {
          if (materias.includes(nuevoNombre)) {
            alert('La materia ya está registrada.');
          } else {
            materias[index] = nuevoNombre;
            saveMaterias(materias);
            location.reload();
          }
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.classList.add('delete');
      deleteBtn.addEventListener('click', () => {
        const materiasActualizadas = materias.filter((_, i) => i !== index);
        saveMaterias(materiasActualizadas);
        location.reload();
      });

      buttonsContainer.appendChild(editBtn);
      buttonsContainer.appendChild(deleteBtn);
      li.appendChild(buttonsContainer);
      materiasList.appendChild(li);
    });
  }
}
