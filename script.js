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
        title: "Species",
        items: parserFunction(
          "Badger\n\t(European Badger)\n\t(Honey Badger)\nFox\n\t(Red Fox)\n\t(Arctic Fox)\nDragon\n\t(Fire Dragon)\n\t(Ice Dragon)\nOwl\n\t(Barn Owl)\n\t(Snowy Owl)\nWolf\n\t(Gray Wolf)\n\t(Dire Wolf)\nHobbit\nElf\nTroll\nGoblin\n",
        ),
      },
      list2: {
        title: "Occupations",
        items: parserFunction(
          "Carpenter\n\t(Woodworker)\n\t(Furniture Maker)\nBlacksmith\n\t(Armorer)\n\t(Farrier)\nBaker\n\t(Pastry Chef)\n\t(Bread Maker)\nTailor\n\t(Seamstress)\n\t(Fashion Designer)\nAlchemist\n\t(Potion Maker)\n\t(Herbalist)\nMerchant\n\t(Shopkeeper)\n\t(Trader)\nHunter\n\t(Archer)\n\t(Trapper)\nWizard\n\t(Sorcerer)\n\t(Enchanter)\n",
        ),
      },
      list3: {
        title: "Actions/Emotions",
        items: parserFunction(
          "Frustrated\n\t(Annoyed)\n\t(Irritated)\nHappy\n\t(Joyful)\n\t(Content)\nCurious\n\t(Inquisitive)\n\t(Wondering)\nAngry\n\t(Furious)\n\t(Enraged)\nSad\n\t(Melancholy)\n\t(Tearful)\nExcited\n\t(Thrilled)\n\t(Enthusiastic)\nScared\n\t(Terrified)\n\t(Apprehensive)\nBored\n\t(Disinterested)\n\t(Uninspired)\nConfused\n\t(Bewildered)\n\t(Puzzled)\nDetermined\n\t(Resolute)\n\t(Persistent)\n",
        ),
      },
      list4: {
        title: "Locations",
        items: parserFunction(
          "Forest\n\t(Enchanted Forest)\n\t(Dark Forest)\nVillage\n\t(Small Hamlet)\n\t(Busy Marketplace)\nCastle\n\t(Throne Room)\n\t(Dungeon)\nMountain\n\t(Snowy Peak)\n\t(Rocky Trail)\nRiver\n\t(Serene Bank)\n\t(Raging Rapids)\nCave\n\t(Crystal Cavern)\n\t(Underground Lair)\nDesert\n\t(Sand Dunes)\n\t(Oasis)\nSeashore\n\t(Rocky Coastline)\n\t(Sandy Beach)\nMeadow\n\t(Flower Field)\n\t(Grassy Plain)\nStore\n\t(General Store)\n\t(Magic Shop)\n",
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
