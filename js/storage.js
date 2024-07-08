function sanitizeInput(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

function isValidPresetName(name) {
  // Example regex: allows alphanumeric characters, spaces, and hyphens
  const regex = /^[a-zA-Z0-9\s-]+$/;
  return regex.test(name);
}

function savePreset() {
  const presetName = document.getElementById("presetNameInput").value.trim();

  if (!isValidPresetName(presetName)) {
    alert("Invalid preset name. Please use only alphanumeric characters, spaces, and hyphens.");
    return;
  }

  if (!presetName) {
    alert("Please enter a preset name.");
    return;
  }

  const sanitizedPresetName = sanitizeInput(presetName);
  const lists = loadFromSessionStorage();
  let presets = JSON.parse(localStorage.getItem("presets")) || {};
  presets[sanitizedPresetName] = lists;
  localStorage.setItem("presets", JSON.stringify(presets));

  updatePresetSelect();
  updateTitleAndHeading(sanitizedPresetName);
}

function loadPreset() {
  const presetName = document.getElementById("presetSelect").value;
  if (!presetName) {
    alert("Please select a preset to load.");
    return;
  }

  const sanitizedPresetName = sanitizeInput(presetName);
  const presets = JSON.parse(localStorage.getItem("presets")) || {};
  if (!presets[sanitizedPresetName]) {
    alert("Preset not found.");
    return;
  }

  const lists = presets[sanitizedPresetName];
  localStorage.setItem("lastLoadedPreset", sanitizedPresetName);
  sessionStorage.setItem("lists", JSON.stringify(lists));

  document.getElementById("columnsContainer").innerHTML = "";

  for (const listId in lists) {
    const { title, items } = lists[listId];
    createColumn(listId, sanitizeInput(title));
  }

  updateTitleAndHeading(sanitizedPresetName);
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
