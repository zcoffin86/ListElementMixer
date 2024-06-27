document.getElementById("addColumnButton").addEventListener("click", function () {
  const listId = "list" + Date.now();
  createColumn(listId, "New List");
  saveToSessionStorage(listId, []);
});

function createColumn(listId, title) {
  const columnsContainer = document.getElementById("columnsContainer");

  const columnDiv = document.createElement("div");
  columnDiv.className = "column";
  columnDiv.id = listId;

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  columnDiv.appendChild(titleElement);

  const fileButton = document.createElement("button");
  fileButton.textContent = "Pick a .txt File";
  fileButton.addEventListener("click", function () {
    fileInput.click();
  });
  columnDiv.appendChild(fileButton);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", function (event) {
    handleFileChange(event, listId);
  });
  columnDiv.appendChild(fileInput);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete List";
  deleteButton.addEventListener("click", function () {
    deleteColumn(listId);
  });
  columnDiv.appendChild(deleteButton);

  columnsContainer.appendChild(columnDiv);
}

function handleFileChange(event, listId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const parsedLines = parserFunction(content);
      saveToSessionStorage(listId, parsedLines, file.name); // Pass filename to save function
    };
    reader.readAsText(file);
  }
}

function parserFunction(content) {
  const lines = content.split(/\r?\n/);
  const parsed = [];
  let currentParent = null;

  lines.forEach((line) => {
    if (line.trim() === "") return; // Skip empty lines

    if (line.startsWith("\t")) {
      // Sub-list item
      if (currentParent) {
        currentParent.subItems.push(line.trim());
      }
    } else {
      // Main item
      currentParent = {
        item: line.trim(),
        subItems: [],
      };
      parsed.push(currentParent);
    }
  });

  return parsed;
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

function deleteColumn(listId) {
  const columnDiv = document.getElementById(listId);
  if (columnDiv) {
    columnDiv.remove();
  }

  let lists = JSON.parse(sessionStorage.getItem("lists")) || {};
  delete lists[listId];
  sessionStorage.setItem("lists", JSON.stringify(lists));
}

function loadFromSessionStorage() {
  return JSON.parse(sessionStorage.getItem("lists")) || {};
}

function generateOutput() {
  const lists = loadFromSessionStorage();
  const keys = Object.keys(lists);
  if (keys.length === 0) {
    alert("No lists loaded. Please upload some .txt files.");
    return;
  }

  let output = "";
  keys.forEach((key) => {
    const list = lists[key];
    const randomIndex = Math.floor(Math.random() * list.items.length);
    const randomElement = list.items[randomIndex];

    output += randomElement.item;

    if (randomElement.subItems.length > 0) {
      const subItemIndex = Math.floor(Math.random() * randomElement.subItems.length);
      const subItem = randomElement.subItems[subItemIndex];
      output += " " + subItem;
    }

    output += " ";
  });

  output = output.trim();

  const outputTextArea = document.getElementById("outputTextArea");
  outputTextArea.value = output;
}

function initializeLists() {
  let lists = loadFromSessionStorage();
  if (Object.keys(lists).length === 0) {
    const initialLists = {
      list1: {
        title: "List 1",
        items: parserFunction(
          "Dog\n\tChow Chow\n\tGolden Retriever\n\tBulldog\nCat\n\tCheetah\n\tShorthair\n\tPersian\nCattle\n\tDairy\n\tBeef",
        ),
      },
      list2: {
        title: "List 2",
        items: parserFunction("Apple\n\tGranny Smith\n\tFuji\n\tGala\nOrange\n\tNavel\n\tMandarin\n\tValencia"),
      },
      list3: {
        title: "List 3",
        items: parserFunction("Red\n\tCrimson\n\tScarlet\nGreen\n\tEmerald\n\tOlive\nBlue\n\tNavy\n\tCyan"),
      },
      list4: {
        title: "List 4",
        items: parserFunction(
          "Dog\n\tChow Chow\n\tGolden Retriever\n\tBulldog\nCat\n\tCheetah\n\tShorthair\n\tPersian\nCattle\n\tDairy\n\tBeef",
        ),
      },
    };

    sessionStorage.setItem("lists", JSON.stringify(initialLists));
    lists = initialLists;
  }

  return lists;
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

  // Clear existing columns
  document.getElementById("columnsContainer").innerHTML = "";

  // Create columns for the loaded preset
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

document.getElementById("generateOutputButton").addEventListener("click", generateOutput);
document.getElementById("savePresetButton").addEventListener("click", savePreset);
document.getElementById("loadPresetButton").addEventListener("click", loadPreset);
document.getElementById("deletePresetButton").addEventListener("click", deletePreset);

document.addEventListener("DOMContentLoaded", function () {
  const lists = initializeLists();
  for (const listId in lists) {
    const { title, items } = lists[listId];
    createColumn(listId, title);
  }
  updatePresetSelect();
});
