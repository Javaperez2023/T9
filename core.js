document.addEventListener("DOMContentLoaded", function() {
  // Elementos para manejo de Excel y guardado en localStorage
  const excelFileInput = document.querySelector(".file-upload");
  const btnSaveExcel = document.getElementById("btn-saveExcel");
  const btnDeleteExcel = document.getElementById("btn-deleteExcel");
  
  // Elementos del formulario básico
  const reloj = document.querySelector(".clock");
  const inputId = document.querySelector(".input-id");
  const inputRut = document.querySelector(".input-rut");
  const inputName = document.querySelector(".input-name");
  const inputPhone1 = document.querySelector(".input-phone1");
  const inputPhone2 = document.querySelector(".input-phone2");
  const inputOnt = document.querySelector(".input-ont");
  const inputOlt = document.querySelector(".input-olt");
  const inputNodo = document.querySelector(".input-nodo");
  const inputAddress = document.querySelector(".input-address");
  
  // Elementos para Internet
  const checkboxInternetRojo = document.querySelector(".checkbox-internet-rojo");
  const selectInternetRojo = document.querySelector(".select-internet-rojo");
  const checkboxInternetVerde = document.querySelector(".checkbox-internet-verde");
  const selectInternetVerde = document.querySelector(".select-internet-verde");
  const checkboxInternetBase = document.querySelector(".checkbox-internet-base");
  const selectInternetBase = document.querySelector(".select-internet-base");
  
  // Elementos para Tv
  const checkboxTvRojo = document.querySelector(".checkbox-tv-rojo");
  const selectTvRojo = document.querySelector(".select-tv-rojo");
  const checkboxTvVerde = document.querySelector(".checkbox-tv-verde");
  const selectTvVerde = document.querySelector(".select-tv-verde");
  const checkboxTvBase = document.querySelector(".checkbox-tv-base");
  const selectTvBase = document.querySelector(".select-tv-base");
  // Nuevos elementos para Tv: Tv Go y Tv Go +
  const checkboxTvGo = document.querySelector(".checkbox-tv-go");
  const selectTvGo = document.querySelector(".select-tv-go");
  const checkboxTvGoPlus = document.querySelector(".checkbox-tv-go-plus");
  const selectTvGoPlus = document.querySelector(".select-tv-go-plus");
  
  // Elementos para Teléfono (solo Rojo y Verde)
  const checkboxPhoneRojo = document.querySelector(".checkbox-phone-rojo");
  const selectPhoneRojo = document.querySelector(".select-phone-rojo");
  const checkboxPhoneVerde = document.querySelector(".checkbox-phone-verde");
  const selectPhoneVerde = document.querySelector(".select-phone-verde");
  
  // Área de salida y botones
  const textareaObs = document.querySelector(".textarea-obs");
  const btnCopy = document.querySelector(".btn-copy");
  const btnGenerate = document.querySelector(".btn-generate");
  const btnClear = document.querySelector(".btn-clear");
  
  // Elemento para mostrar los códigos relacionados
  const codigoDisplay = document.querySelector(".codigo-display");
  
  // Variable para almacenar datos del Excel (array de arrays)
  let excelData = null;
  
  // Actualizar reloj
  function updateClock() {
    const now = new Date();
    reloj.value = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  // Manejo de archivo Excel
  excelFileInput.addEventListener("change", handleFile, false);
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("Datos del Excel:", excelData);
    };
    reader.readAsArrayBuffer(file);
  }
  
  // Guardar datos del Excel en localStorage
  btnSaveExcel.addEventListener("click", function() {
    if (!excelData) {
      alert("Por favor, sube un archivo Excel primero.");
      return;
    }
    const extractedData = {};
    excelData.forEach(row => {
      if (row.length >= 2) {
        extractedData[row[0]] = row[1];
      }
    });
    console.log("Datos extraídos:", extractedData);
    localStorage.setItem("datosExcel", JSON.stringify(extractedData));
    alert("¡Datos guardados en Local Storage!");
  });
  
  // Borrar datos del Excel y todas las llamadas (llamada1, llamada2, etc.)
  btnDeleteExcel.addEventListener("click", function() {
    localStorage.removeItem("datosExcel");
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith("llamada")) {
        localStorage.removeItem(key);
      }
    }
    alert("¡Datos borrados del Local Storage!");
  });
  
  // Función para mostrar/ocultar selects al marcar checkboxes
  function toggleSelect(select, checkbox) {
    select.style.display = checkbox.checked ? "block" : "none";
    if (!checkbox.checked) select.value = "";
    updateCombined();
  }
  
  // Función para desmarcar todos los demás checkboxes y ocultar sus selects
  function uncheckOthers(currentCheckbox) {
    const checkboxes = [
      checkboxInternetRojo, checkboxInternetVerde, checkboxInternetBase,
      checkboxTvRojo, checkboxTvVerde, checkboxTvBase, checkboxTvGo, checkboxTvGoPlus,
      checkboxPhoneRojo, checkboxPhoneVerde
    ];
    
    checkboxes.forEach(chk => {
      if(chk !== currentCheckbox) {
        chk.checked = false;
        // Ocultar el select correspondiente
        if(chk === checkboxInternetRojo) {
          selectInternetRojo.style.display = "none";
          selectInternetRojo.value = "";
        }
        if(chk === checkboxInternetVerde) {
          selectInternetVerde.style.display = "none";
          selectInternetVerde.value = "";
        }
        if(chk === checkboxInternetBase) {
          selectInternetBase.style.display = "none";
          selectInternetBase.value = "";
        }
        if(chk === checkboxTvRojo) {
          selectTvRojo.style.display = "none";
          selectTvRojo.value = "";
        }
        if(chk === checkboxTvVerde) {
          selectTvVerde.style.display = "none";
          selectTvVerde.value = "";
        }
        if(chk === checkboxTvBase) {
          selectTvBase.style.display = "none";
          selectTvBase.value = "";
        }
        if(chk === checkboxTvGo) {
          selectTvGo.style.display = "none";
          selectTvGo.value = "";
        }
        if(chk === checkboxTvGoPlus) {
          selectTvGoPlus.style.display = "none";
          selectTvGoPlus.value = "";
        }
        if(chk === checkboxPhoneRojo) {
          selectPhoneRojo.style.display = "none";
          selectPhoneRojo.value = "";
        }
        if(chk === checkboxPhoneVerde) {
          selectPhoneVerde.style.display = "none";
          selectPhoneVerde.value = "";
        }
      }
    });
  }
  
  // Actualizar la salida combinada (servicios) y mostrar códigos relacionados
  function updateCombined() {
    let services = [];
    let extraDetails = "";
    const storedDataStr = localStorage.getItem("datosExcel");
    let storedData = storedDataStr ? JSON.parse(storedDataStr) : {};
    
    // Internet
    if (checkboxInternetRojo.checked && selectInternetRojo.value && selectInternetRojo.selectedIndex > 0) {
      let key = "internetRojo" + selectInternetRojo.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Internet Rojo: ${selectInternetRojo.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxInternetVerde.checked && selectInternetVerde.value && selectInternetVerde.selectedIndex > 0) {
      let key = "internetVerde" + selectInternetVerde.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Internet Verde: ${selectInternetVerde.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxInternetBase.checked && selectInternetBase.value && selectInternetBase.selectedIndex > 0) {
      let key = "internetBase" + selectInternetBase.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Internet Base: ${selectInternetBase.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    
    // Tv
    if (checkboxTvRojo.checked && selectTvRojo.value && selectTvRojo.selectedIndex > 0) {
      let key = "tvRojo" + selectTvRojo.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Tv Rojo: ${selectTvRojo.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxTvVerde.checked && selectTvVerde.value && selectTvVerde.selectedIndex > 0) {
      let key = "tvVerde" + selectTvVerde.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Tv Verde: ${selectTvVerde.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxTvBase.checked && selectTvBase.value && selectTvBase.selectedIndex > 0) {
      let key = "tvBase" + selectTvBase.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Tv Base: ${selectTvBase.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxTvGo.checked && selectTvGo.value && selectTvGo.selectedIndex > 0) {
      let key = "tvGo" + selectTvGo.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Tv Go: ${selectTvGo.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxTvGoPlus.checked && selectTvGoPlus.value && selectTvGoPlus.selectedIndex > 0) {
      let key = "tvGoPlus" + selectTvGoPlus.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Tv Go +: ${selectTvGoPlus.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    
    // Teléfono
    if (checkboxPhoneRojo.checked && selectPhoneRojo.value && selectPhoneRojo.selectedIndex > 0) {
      let key = "telefonoRojo" + selectPhoneRojo.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Teléfono Rojo: ${selectPhoneRojo.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    if (checkboxPhoneVerde.checked && selectPhoneVerde.value && selectPhoneVerde.selectedIndex > 0) {
      let key = "telefonoVerde" + selectPhoneVerde.selectedIndex;
      let valor = storedData[key] || "";
      services.push(`Teléfono Verde: ${selectPhoneVerde.value}`);
      extraDetails += `Cliente indica ${valor}\n`;
    }
    
    const combined = [
      `DATE: ${reloj.value}`,
      `ID: ${inputId.value.trim()}`,
      `RUT: ${inputRut.value.trim()}`,
      `NOMBRE: ${inputName.value.trim()}`,
      `FONO: ${inputPhone1.value.trim()} / ${inputPhone2.value.trim()}`,
      `ONT: ${inputOnt.value.trim()}`,
      `OLT: ${inputOlt.value.trim()}`,
      `TARJETA: ${inputNodo.value.trim()}`,
      `DIRECCIÓN Y NODO: ${inputAddress.value.trim()}`,
      "OBS:",
      extraDetails.trim()
    ].filter(Boolean).join("\n");
    
    textareaObs.value = combined;
    autoResize(textareaObs);
    updateCodigoDisplay();
  }
  
  // Función para actualizar el <p> que muestra los códigos relacionados
  function updateCodigoDisplay() {
    let codigoInfo = "";
    const storedDataStr = localStorage.getItem("datosExcel");
    let storedData = storedDataStr ? JSON.parse(storedDataStr) : {};
    
    // Definimos para cada grupo un offset para que los códigos sean secuenciales
    const servicesList = [
      { checkbox: checkboxInternetRojo, select: selectInternetRojo, offset: 0 },
      { checkbox: checkboxInternetVerde, select: selectInternetVerde, offset: 7 },
      { checkbox: checkboxInternetBase, select: selectInternetBase, offset: 14 },
      { checkbox: checkboxTvRojo, select: selectTvRojo, offset: 21 },
      { checkbox: checkboxTvVerde, select: selectTvVerde, offset: 28 },
      { checkbox: checkboxTvBase, select: selectTvBase, offset: 35 },
      { checkbox: checkboxTvGo, select: selectTvGo, offset: 42 },
      { checkbox: checkboxTvGoPlus, select: selectTvGoPlus, offset: 49 },
      { checkbox: checkboxPhoneRojo, select: selectPhoneRojo, offset: 56 },
      { checkbox: checkboxPhoneVerde, select: selectPhoneVerde, offset: 63 }
    ];
    
    servicesList.forEach(service => {
      if (service.checkbox.checked && service.select.value && service.select.selectedIndex > 0) {
        const effectiveIndex = service.offset + service.select.selectedIndex;
        const codeKey = "codigo" + effectiveIndex;
        const codeValue = storedData[codeKey] || "";
        codigoInfo += `Tipificación:\n\n${codeValue}\n`;
      }
    });
    
    codigoDisplay.innerText = codigoInfo;
  }
  
  // Función para copiar al portapapeles y guardar la OBS en localStorage
  function copiar() {
    navigator.clipboard.writeText(textareaObs.value)
      .then(() => {
        alert("¡Copiado al portapapeles!");
        guardarOBS();
      })
      .catch(err => console.error("Error al copiar: ", err));
  }
  
  // Guarda la OBS actual en localStorage usando la siguiente clave disponible (llamada1, llamada2, …)
  function guardarOBS() {
    let num = 1;
    while (localStorage.getItem("llamada" + num) !== null) {
      num++;
    }
    localStorage.setItem("llamada" + num, textareaObs.value);
    console.log(`OBS guardada en "llamada${num}"`);
  }
  
  // Función para generar y descargar el Excel
  function generarExcel() {
    let data = [];
    let i = 1;
    while (true) {
      const key = "llamada" + i;
      const value = localStorage.getItem(key);
      if (value === null) break;
      data.push([key, value]);
      i++;
    }
    
    if (data.length === 0) {
      alert("No hay datos de OBS guardados para generar el Excel.");
      return;
    }
    
    const ws = XLSX.utils.aoa_to_sheet([["Llamada", "OBS"], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Llamadas");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llamadas.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Ajuste automático del tamaño del textarea
  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  // Función para limpiar todos los campos (sin afectar el localStorage)
  function limpiarCampos() {
    inputId.value = "";
    inputRut.value = "";
    inputName.value = "";
    inputPhone1.value = "";
    inputPhone2.value = "";
    inputOnt.value = "";
    inputOlt.value = "";
    inputNodo.value = "";
    inputAddress.value = "";
    
    const checkboxes = [
      checkboxInternetRojo, checkboxInternetVerde, checkboxInternetBase,
      checkboxTvRojo, checkboxTvVerde, checkboxTvBase, checkboxTvGo, checkboxTvGoPlus,
      checkboxPhoneRojo, checkboxPhoneVerde
    ];
    const selects = [
      selectInternetRojo, selectInternetVerde, selectInternetBase,
      selectTvRojo, selectTvVerde, selectTvBase, selectTvGo, selectTvGoPlus,
      selectPhoneRojo, selectPhoneVerde
    ];
    
    checkboxes.forEach(checkbox => checkbox.checked = false);
    selects.forEach(select => { 
      select.style.display = "none"; 
      select.value = "";
    });
    
    textareaObs.value = "";
    updateCodigoDisplay();
  }
  
  // Asignar eventos a los inputs
  inputId.addEventListener("input", updateCombined);
  inputRut.addEventListener("input", updateCombined);
  inputName.addEventListener("input", updateCombined);
  inputPhone1.addEventListener("input", updateCombined);
  inputPhone2.addEventListener("input", updateCombined);
  inputOnt.addEventListener("input", updateCombined);
  inputOlt.addEventListener("input", updateCombined);
  inputNodo.addEventListener("input", updateCombined);
  inputAddress.addEventListener("input", updateCombined);
  
  // Eventos para Internet
  checkboxInternetRojo.addEventListener("change", () => { 
    if(checkboxInternetRojo.checked) {
      uncheckOthers(checkboxInternetRojo);
    }
    toggleSelect(selectInternetRojo, checkboxInternetRojo);
  });
  checkboxInternetVerde.addEventListener("change", () => { 
    if(checkboxInternetVerde.checked) {
      uncheckOthers(checkboxInternetVerde);
    }
    toggleSelect(selectInternetVerde, checkboxInternetVerde);
  });
  checkboxInternetBase.addEventListener("change", () => { 
    if(checkboxInternetBase.checked) {
      uncheckOthers(checkboxInternetBase);
    }
    toggleSelect(selectInternetBase, checkboxInternetBase);
  });
  selectInternetRojo.addEventListener("change", updateCombined);
  selectInternetVerde.addEventListener("change", updateCombined);
  selectInternetBase.addEventListener("change", updateCombined);
  
  // Eventos para Tv
  checkboxTvRojo.addEventListener("change", () => { 
    if(checkboxTvRojo.checked) {
      uncheckOthers(checkboxTvRojo);
    }
    toggleSelect(selectTvRojo, checkboxTvRojo);
  });
  checkboxTvVerde.addEventListener("change", () => { 
    if(checkboxTvVerde.checked) {
      uncheckOthers(checkboxTvVerde);
    }
    toggleSelect(selectTvVerde, checkboxTvVerde);
  });
  checkboxTvBase.addEventListener("change", () => { 
    if(checkboxTvBase.checked) {
      uncheckOthers(checkboxTvBase);
    }
    toggleSelect(selectTvBase, checkboxTvBase);
  });
  checkboxTvGo.addEventListener("change", () => { 
    if(checkboxTvGo.checked) {
      uncheckOthers(checkboxTvGo);
    }
    toggleSelect(selectTvGo, checkboxTvGo);
  });
  checkboxTvGoPlus.addEventListener("change", () => { 
    if(checkboxTvGoPlus.checked) {
      uncheckOthers(checkboxTvGoPlus);
    }
    toggleSelect(selectTvGoPlus, checkboxTvGoPlus);
  });
  selectTvRojo.addEventListener("change", updateCombined);
  selectTvVerde.addEventListener("change", updateCombined);
  selectTvBase.addEventListener("change", updateCombined);
  selectTvGo.addEventListener("change", updateCombined);
  selectTvGoPlus.addEventListener("change", updateCombined);
  
  // Eventos para Teléfono
  checkboxPhoneRojo.addEventListener("change", () => { 
    if(checkboxPhoneRojo.checked) {
      uncheckOthers(checkboxPhoneRojo);
    }
    toggleSelect(selectPhoneRojo, checkboxPhoneRojo);
  });
  checkboxPhoneVerde.addEventListener("change", () => { 
    if(checkboxPhoneVerde.checked) {
      uncheckOthers(checkboxPhoneVerde);
    }
    toggleSelect(selectPhoneVerde, checkboxPhoneVerde);
  });
  selectPhoneRojo.addEventListener("change", updateCombined);
  selectPhoneVerde.addEventListener("change", updateCombined);
  
  // Botones
  btnCopy.addEventListener("click", copiar);
  btnGenerate.addEventListener("click", generarExcel);
  btnClear.addEventListener("click", limpiarCampos);
  
  autoResize(textareaObs);

  // -------------------------------
  // Código del temporizador integrado desde temp.html
  const totalTime = 120000; // 2 minutos en milisegundos
  let remainingTime = totalTime;
  let timerState = "idle";  // Estados: "idle", "running", "paused"
  let lastTimestamp = null;
  let alert30Triggered = false; // Controla la alerta a 30 segundos
  let alert15Triggered = false; // Controla la alerta a 15 segundos

  // Función para reproducir sonido personalizado
  function playCustomSound() {
    const audio = new Audio("alerta.mp3"); // Asegúrate de que "alerta.mp3" esté en la ruta correcta
    audio.volume = 0.02; // Ajusta el volumen al 50%
    audio.play();
    }


  // Función para actualizar el favicon con el mismo color que el fondo
  function updateFavicon(color) {
    let favicon = document.getElementById("dynamic-favicon");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.id = "dynamic-favicon";
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    // Crear un canvas de 32x32 para el favicon
    const faviconCanvas = document.createElement("canvas");
    faviconCanvas.width = 32;
    faviconCanvas.height = 32;
    const faviconCtx = faviconCanvas.getContext("2d");
    faviconCtx.fillStyle = color;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);
    favicon.href = faviconCanvas.toDataURL("image/png");
  }

  function handleTimerClick() {
    if (timerState === "idle") {
      timerState = "running";
      lastTimestamp = performance.now();
      // Reiniciar alertas al iniciar
      alert30Triggered = false;
      alert15Triggered = false;
    } else if (timerState === "running") {
      timerState = "paused";
    } else if (timerState === "paused") {
      timerState = "running";
      remainingTime = totalTime;
      lastTimestamp = performance.now();
      // Reiniciar alertas al reiniciar
      alert30Triggered = false;
      alert15Triggered = false;
    }
  }

  function drawCountdown(timeRemaining) {
    const elapsed = totalTime - timeRemaining;
    const progress = elapsed / totalTime;
    const startColor = { r: 119, g: 221, b: 119 }; // Verde pastel
    const endColor = { r: 255, g: 105, b: 97 };    // Rojo pastel
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
    const bgColor = `rgb(${r}, ${g}, ${b})`;

    // Actualiza el favicon para que tenga el mismo color
    updateFavicon(bgColor);

    if (ctx) {
      // Actualiza el canvas con el color interpolado
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Actualiza el fondo de la página (body) con el mismo color
      document.body.style.backgroundColor = bgColor;

      const seconds = Math.ceil(timeRemaining / 1000);
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const timeText = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      ctx.font = "40px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(timeText, canvas.width / 2, canvas.height / 2);
    }
  }

  function updateTimer(timestamp) {
    if (timerState === "running") {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      remainingTime -= delta;
      if (remainingTime < 0) remainingTime = 0;

      // Reproducir alerta sonora al alcanzar 30 segundos
      if (!alert30Triggered && remainingTime <= 30000) {
        playCustomSound();
        alert30Triggered = true;
      }
      // Reproducir alerta sonora al alcanzar 15 segundos
      if (!alert15Triggered && remainingTime <= 15000) {
        playCustomSound();
        alert15Triggered = true;
      }
    }
    drawCountdown(remainingTime);
    requestAnimationFrame(updateTimer);
  }

  const canvas = document.getElementById("countdownCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const pipButton = document.getElementById("pipButton");
  const pipVideo = document.getElementById("pipVideo");

  if (canvas) {
    canvas.addEventListener("click", handleTimerClick);
  }
  if (pipVideo) {
    pipVideo.addEventListener("click", handleTimerClick);
  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "<") {
      handleTimerClick();
    }
  });
  if (pipButton && pipVideo && canvas) {
    // Crear un stream a partir del canvas (30 fps)
    const stream = canvas.captureStream(30);
    pipVideo.srcObject = stream;
    pipVideo.play();

    pipButton.addEventListener("click", async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          pipButton.textContent = "Desacoplar";
        } else {
          const pipWindow = await pipVideo.requestPictureInPicture();
          pipButton.textContent = "Acoplar";
          if (pipWindow && pipWindow.resizeTo) {
            pipWindow.resizeTo(100, 50);
          }
        }
      } catch (error) {
        console.error("Error al cambiar el modo PiP:", error);
      }
    });
  }

  requestAnimationFrame(updateTimer);
  // -------------------------------
});
