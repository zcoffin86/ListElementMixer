document.getElementById("addColumnButton").addEventListener("click", function () {
  const listId = "list" + Date.now();
  createColumn(listId, "New List");
  saveToLocalStorage(listId, []);
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
      saveToLocalStorage(listId, parsedLines, file.name); // Pass filename to save function
    };
    reader.readAsText(file);
  }
}

function parserFunction(content) {
  return content.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function saveToLocalStorage(listId, lines, filename) {
  let lists = JSON.parse(localStorage.getItem("lists")) || {};
  lists[listId] = {
    title: filename, // Store filename as title
    lines: lines,
  };
  localStorage.setItem("lists", JSON.stringify(lists));

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
  // Remove column from the page
  const columnDiv = document.getElementById(listId);
  if (columnDiv) {
    columnDiv.remove();
  }

  // Remove list from local storage
  let lists = JSON.parse(localStorage.getItem("lists")) || {};
  delete lists[listId];
  localStorage.setItem("lists", JSON.stringify(lists));
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("lists")) || {};
}

function generateOutput() {
  const lists = loadFromLocalStorage();
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

  // Trim trailing space
  output = output.trim();

  // Update textarea with generated output
  const outputTextArea = document.getElementById("outputTextArea");
  outputTextArea.value = output;
}

// Event listener for generate output button
document.getElementById("generateOutputButton").addEventListener("click", generateOutput);

// Load columns from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const lists = loadFromLocalStorage();
  for (const listId in lists) {
    const { title, lines } = lists[listId];
    createColumn(listId, title);
  }
});
