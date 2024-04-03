// Datos de ejemplo
const metodologias = [
    { id: 1, nombre: 'Metodología A' },
    { id: 2, nombre: 'Metodología B' },
    { id: 3, nombre: 'Metodología C' },
  ];
  
  const errores = [
    { id: 1, nombre: 'Error 1', descripcion: 'Descripción del error 1' },
    { id: 2, nombre: 'Error 2', descripcion: 'Descripción del error 2' },
    { id: 3, nombre: 'Error 3', descripcion: 'Descripción del error 3' },
  ];
  
  let archivos = [];
  let mediciones = [];
  
  // Mostrar/ocultar secciones
  const archivosSection = document.getElementById('archivosSection');
  const medicionesSection = document.getElementById('medicionesSection');
  const showArchivos = document.getElementById('showArchivos');
  const showMediciones = document.getElementById('showMediciones');
  
  showArchivos.addEventListener('click', () => {
    archivosSection.classList.remove('hidden');
    medicionesSection.classList.add('hidden');
    renderizarArchivos();
  });
  
  showMediciones.addEventListener('click', () => {
    medicionesSection.classList.remove('hidden');
    archivosSection.classList.add('hidden');
    renderizarMediciones();
  });
  
  // Formulario de archivos
  const archivoForm = document.getElementById('archivoForm');
  const metodologiaSelect = document.getElementById('metodologia');
  const subdivisionInput = document.getElementById('subdivision');
  const nombreInput = document.getElementById('nombre');
  const fechaInput = document.getElementById('fecha');
  
  archivoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoArchivo = {
      metodologiaId: parseInt(metodologiaSelect.value),
      subdivision: parseInt(subdivisionInput.value),
      nombre: nombreInput.value,
      fecha: fechaInput.value,
    };
    archivos.push(nuevoArchivo);
    renderizarArchivos();
    archivoForm.reset();
  });
  
  // Formulario de mediciones
  const medicionForm = document.getElementById('medicionForm');
  const metodologiaMedicionSelect = document.getElementById('metodologiaMedicion');
  const numMedidasInput = document.getElementById('numMedidas');
  const errorSelect = document.getElementById('error');
  
  medicionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaMedicion = {
      metodologiaId: parseInt(metodologiaMedicionSelect.value),
      numMedidas: parseInt(numMedidasInput.value),
      errorId: parseInt(errorSelect.value),
    };
    mediciones.push(nuevaMedicion);
    renderizarMediciones();
    medicionForm.reset();
  });
  
  // Renderizar archivos
  function renderizarArchivos() {
    const archivoTableBody = document.querySelector('#archivoTable tbody');
    archivoTableBody.innerHTML = '';
  
    metodologias.forEach((metodologia) => {
      const option = document.createElement('option');
      option.value = metodologia.id;
      option.textContent = metodologia.nombre;
      metodologiaSelect.appendChild(option);
    });
  
    archivos.forEach((archivo, index) => {
      const row = document.createElement('tr');
  
      const metodologiaCell = document.createElement('td');
      const metodologiaNombre = metodologias.find((metodologia) => metodologia.id === archivo.metodologiaId)?.nombre || '';
      metodologiaCell.textContent = metodologiaNombre;
      row.appendChild(metodologiaCell);
  
      const subdivisionCell = document.createElement('td');
      subdivisionCell.textContent = archivo.subdivision;
      row.appendChild(subdivisionCell);
  
      const nombreCell = document.createElement('td');
      nombreCell.textContent = archivo.nombre;
      row.appendChild(nombreCell);
  
      const fechaCell = document.createElement('td');
      fechaCell.textContent = archivo.fecha;
      row.appendChild(fechaCell);
  
      const accionesCell = document.createElement('td');
      const editarBtn = document.createElement('button');
      editarBtn.textContent = 'Editar';
      editarBtn.addEventListener('click', () => editarArchivo(index));
      accionesCell.appendChild(editarBtn);
  
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.addEventListener('click', () => eliminarArchivo(index));
      accionesCell.appendChild(eliminarBtn);
  
      row.appendChild(accionesCell);
      archivoTableBody.appendChild(row);
    });
  }
  
  function editarArchivo(index) {
    const archivo = archivos[index];
    metodologiaSelect.value = archivo.metodologiaId;
    subdivisionInput.value = archivo.subdivision;
    nombreInput.value = archivo.nombre;
    fechaInput.value = archivo.fecha;
  
    const submitBtn = archivoForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Actualizar';
    submitBtn.removeEventListener('click', editarArchivo);
    submitBtn.addEventListener('click', () => actualizarArchivo(index));
  }
  
  function actualizarArchivo(index) {
    const nuevoArchivo = {
      metodologiaId: parseInt(metodologiaSelect.value),
      subdivision: parseInt(subdivisionInput.value),
      nombre: nombreInput.value,
      fecha: fechaInput.value,
    };
    archivos[index] = nuevoArchivo;
    renderizarArchivos();
    archivoForm.reset();
    const submitBtn = archivoForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Guardar';
    submitBtn.removeEventListener('click', actualizarArchivo);
    submitBtn.addEventListener('click', archivoForm.submit);
  }
  
  function eliminarArchivo(index) {
    archivos.splice(index, 1);
    renderizarArchivos();
  }
  
  // Renderizar mediciones
  function renderizarMediciones() {
    const medicionTableBody = document.querySelector('#medicionTable tbody');
    medicionTableBody.innerHTML = '';
  
    metodologias.forEach((metodologia) => {
      const option = document.createElement('option');
      option.value = metodologia.id;
      option.textContent = metodologia.nombre;
      metodologiaMedicionSelect.appendChild(option);
    });
  
    errores.forEach((error) => {
      const option = document.createElement('option');
      option.value = error.id;
      option.textContent = error.nombre;
      errorSelect.appendChild(option);
    });
  
    mediciones.forEach((medicion, index) => {
      const row = document.createElement('tr');
  
      const metodologiaCell = document.createElement('td');
      const metodologiaNombre = metodologias.find(
        (metodologia) => metodologia.id === medicion.metodologiaId
      )?.nombre || '';
      metodologiaCell.textContent = metodologiaNombre;
      row.appendChild(metodologiaCell);
  
      const numMedidasCell = document.createElement('td');
      numMedidasCell.textContent = medicion.numMedidas;
      row.appendChild(numMedidasCell);
  
      const errorCell = document.createElement('td');
      const errorNombre = errores.find(
        (error) => error.id === medicion.errorId
      )?.nombre || '';
      errorCell.textContent = errorNombre;
      row.appendChild(errorCell);
  
      const accionesCell = document.createElement('td');
      const editarBtn = document.createElement('button');
      editarBtn.textContent = 'Editar';
      editarBtn.addEventListener('click', () => editarMedicion(index));
      accionesCell.appendChild(editarBtn);
  
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.addEventListener('click', () => eliminarMedicion(index));
      accionesCell.appendChild(eliminarBtn);
  
      row.appendChild(accionesCell);
      medicionTableBody.appendChild(row);
    });
  }
  
  function editarMedicion(index) {
    const medicion = mediciones[index];
    metodologiaMedicionSelect.value = medicion.metodologiaId;
    numMedidasInput.value = medicion.numMedidas;
    errorSelect.value = medicion.errorId;
  
    const submitBtn = medicionForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Actualizar';
    submitBtn.removeEventListener('click', editarMedicion);
    submitBtn.addEventListener('click', () => actualizarMedicion(index));
  }
  
  function actualizarMedicion(index) {
    const nuevaMedicion = {
      metodologiaId: parseInt(metodologiaMedicionSelect.value),
      numMedidas: parseInt(numMedidasInput.value),
      errorId: parseInt(errorSelect.value),
    };
    mediciones[index] = nuevaMedicion;
    renderizarMediciones();
    medicionForm.reset();
    const submitBtn = medicionForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Guardar';
    submitBtn.removeEventListener('click', actualizarMedicion);
    submitBtn.addEventListener('click', medicionForm.submit);
  }
  
  function eliminarMedicion(index) {
    mediciones.splice(index, 1);
    renderizarMediciones();
  }
  
  // Inicializar la aplicación
  renderizarArchivos();
  renderizarMediciones();