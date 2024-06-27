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
  return content.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function saveToSessionStorage(listId, lines, filename) {
  let lists = JSON.parse(sessionStorage.getItem("lists")) || {};
  lists[listId] = {
    title: filename,
    lines: lines,
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
    const randomIndex = Math.floor(Math.random() * list.lines.length);
    const randomElement = list.lines[randomIndex];
    output += randomElement + " ";
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
        title: "Moods",
        lines: [
          "Joyful - Expressions of happiness, laughter, and delight.",
          "Melancholic - A sense of deep sadness or pensiveness.",
          "Triumphant - Feelings of victory and accomplishment.",
          "Fearful - Expressions of terror, anxiety, or dread.",
          "Anguished - Intense suffering or distress.",
          "Serene - Peacefulness and calm.",
          "Angry - Rage, fury, or frustration.",
          "Determined - Strong willpower and resolve.",
          "Mystical - Enigmatic, otherworldly, or magical presence.",
          "Bewildered - Confusion and disorientation.",
          "Curious - Inquisitiveness and wonder.",
          "Sorrowful - Deep sadness or grief.",
          "Enraged - Intense and uncontrollable anger.",
          "Elated - Extreme happiness and excitement.",
          "Pensive - Thoughtfulness and contemplation.",
          "Frightened - Fear and apprehension.",
          "Awe-inspired - Amazement and wonder.",
          "Betrayed - Hurt and disbelief from a betrayal.",
          "Envious - Jealousy and longing.",
          "Love-struck - Deep affection and adoration.",
        ],
      },
      list2: {
        title: "Attributes",
        lines: [
          "Elaborate Armor - Intricately designed and ornate armor pieces.",
          "Bioluminescence - Glowing parts of the body, like eyes, tattoos, or markings.",
          "Wings - Varied shapes and sizes, from delicate fairy wings to massive dragon wings.",
          "Antlers/Horns - Unique and elaborate horn structures.",
          "Unique Eye Colors - Unusual or multicolored eyes, glowing or with distinct patterns.",
          "Scales/Feathers - Different textures covering parts or the entire body.",
          "Mystical Tattoos - Glowing, moving, or enchanted tattoos and markings.",
          "Exotic Skin Tones - Colors ranging from deep blues and greens to metallic and iridescent shades.",
          "Magical Auras - Visible, ethereal auras surrounding the character.",
          "Tail - Varied in length, shape, and purpose (e.g., prehensile, decorative, or weaponized).",
          "Elongated Ears - Unusual shapes and sizes of ears, often associated with elves.",
          "Claws/Fangs - Distinct and exaggerated claws or fangs.",
          "Unique Hairstyles - Uncommon and intricate hairstyles, possibly with magical elements.",
          "Mystical Artifacts - Carrying or wearing enchanted items, like amulets, staffs, or ancient weapons.",
          "Elemental Traits - Features representing elements like fire, water, earth, or air (e.g., fiery hair, watery limbs).",
          "Runes and Symbols - Engraved or embedded runes on the skin or armor.",
          "Elaborate Jewelry - Ornate and magical jewelry pieces, like crowns, necklaces, and rings.",
          "Multiple Limbs - Extra arms, legs, or other appendages.",
          "Hybrid Features - Combining attributes from multiple species, like a centaur with dragon wings.",
          "Distinctive Clothing - Traditional or unique cultural clothing, often with an exotic or ancient appearance.",
        ],
      },
      list3: {
        title: "Races",
        lines: [
          "Human",
          "Elf",
          "Dwarf",
          "Orc",
          "Goblin",
          "Troll",
          "Dragon",
          "Halfling",
          "Fairy",
          "Gnome",
          "Giant",
          "Centaur",
          "Merfolk",
          "Vampire",
          "Werewolf",
          "Unicorn",
          "Griffin",
          "Minotaur",
          "Demon",
          "Angel",
        ],
      },
      list4: {
        title: "Occupations",
        lines: [
          "Baker - Making bread and pastries, with ovens, dough, and flour.",
          "Butcher - Cutting meat with knives, cleavers, and various cuts of meat.",
          "Shoemaker/Cobbler - Crafting shoes with leather, tools, and sewing equipment.",
          "Clothier/Tailor - Designing and sewing clothes with fabrics, needles, and patterns.",
          "Blacksmith - Forging metal with hammers, anvils, and a forge.",
          "Farmer - Working the land with crops, animals, and farming tools.",
          "Fisherman - Catching fish with nets, rods, and boats.",
          "Carpenter - Building with wood, saws, hammers, and nails.",
          "Innkeeper - Running an inn with guests, food, and drink.",
          "Merchant/Trader - Selling goods with market stalls, wagons, and various wares.",
          "Miller - Grinding grain with millstones, sacks of flour, and water or windmills.",
          "Weaver - Creating textiles with looms, threads, and yarns.",
          "Potter - Shaping clay with pottery wheels, kilns, and finished ceramics.",
          "Chandler - Making candles with wax, wicks, and molds.",
          "Brewer - Brewing beer or ale with barrels, vats, and brewing ingredients.",
          "Miner - Extracting minerals with pickaxes, carts, and mine shafts.",
          "Barman/Barmaid - Serving drinks in a tavern with mugs, bottles, and a bar counter.",
          "Shepherd - Tending sheep with a staff, flock, and open pastures.",
          "Herbalist - Gathering and using herbs with plants, remedies, and potions.",
          "Jeweler - Crafting jewelry with gems, metals, and intricate tools.",
        ],
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
    const { title, lines } = lists[listId];
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
    const { title, lines } = lists[listId];
    createColumn(listId, title);
  }
  updatePresetSelect();
});
