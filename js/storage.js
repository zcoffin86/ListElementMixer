function saveToSessionStorage(listId, parsedLines, filename) {
  let lists = JSON.parse(sessionStorage.getItem("lists")) || {};
  lists[listId] = {
    title: filename,
    items: parsedLines,
  };
  sessionStorage.setItem("lists", JSON.stringify(lists));

  // Update the title of the column after saving
  const columnDiv = document.getElementById(listId);
  if (columnDiv) {
    const titleElement = columnDiv.querySelector("h3");
    if (titleElement) {
      titleElement.textContent = filename; // Update title to filename
    }
  }
}

function loadFromSessionStorage() {
  return JSON.parse(sessionStorage.getItem("lists")) || {};
}

function savePreset() {
  const presetName = document.getElementById("presetNameInput").value.trim();
  if (!presetName) {
    alert("Please enter a preset name.");
    return;
  }

  const lists = loadFromSessionStorage();
  let presets = JSON.parse(localStorage.getItem("presets")) || {};
  presets[presetName] = lists;
  localStorage.setItem("presets", JSON.stringify(presets));

  updatePresetSelect();
}

function loadPreset() {
  const presetName = document.getElementById("presetSelect").value;
  if (!presetName) {
    alert("Please select a preset.");
    return;
  }

  const presets = JSON.parse(localStorage.getItem("presets")) || {};
  if (!presets[presetName]) {
    alert("Preset not found.");
    return;
  }

  const lists = presets[presetName];
  sessionStorage.setItem("lists", JSON.stringify(lists));

  document.getElementById("columnsContainer").innerHTML = "";

  for (const listId in lists) {
    const { title, items } = lists[listId];
    createColumn(listId, title);
  }
}

function deletePreset() {
  const presetName = document.getElementById("presetSelect").value;
  if (!presetName) {
    alert("Please select a preset to delete.");
    return;
  }

  let presets = JSON.parse(localStorage.getItem("presets")) || {};
  if (!presets[presetName]) {
    alert("Preset not found.");
    return;
  }

  delete presets[presetName];
  localStorage.setItem("presets", JSON.stringify(presets));

  updatePresetSelect();
}

function updatePresetSelect() {
  const presetSelect = document.getElementById("presetSelect");
  presetSelect.innerHTML = '<option value="">Select Preset</option>';

  const presets = JSON.parse(localStorage.getItem("presets")) || {};
  for (const presetName in presets) {
    const option = document.createElement("option");
    option.value = presetName;
    option.textContent = presetName;
    presetSelect.appendChild(option);
  }
}

function saveLastOutput(output) {
  localStorage.setItem("lastOutput", output);
}

function getLastOutput() {
  return localStorage.getItem("lastOutput") || "";
}
