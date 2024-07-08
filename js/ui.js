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

function deleteColumn(listId) {
  const columnDiv = document.getElementById(listId);
  if (columnDiv) {
    columnDiv.remove();
  }

  let lists = JSON.parse(sessionStorage.getItem("lists")) || {};
  delete lists[listId];
  sessionStorage.setItem("lists", JSON.stringify(lists));
}

function updateTitleAndHeading(presetName) {
  // Update window title and <h1> element
  document.title = `LEM - ${presetName}`;
  document.querySelector("h1").textContent = `LEM - ${presetName}`;
}

function sanitizeInput(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  // Update title and heading based on the last loaded preset
  const lastLoadedPreset = localStorage.getItem("lastLoadedPreset");
  if (lastLoadedPreset) {
    updateTitleAndHeading(sanitizeInput(lastLoadedPreset));
  } else {
    // Default title and heading if no preset is loaded
    document.title = "List Element Mixer (LEM)";
    document.querySelector("h1").textContent = "List Element Mixer (LEM)";
  }

  return lists;
}
