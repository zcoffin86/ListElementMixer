document.getElementById("addColumnButton").addEventListener("click", function () {
  const listId = "list" + Date.now();
  createColumn(listId, "New List");
  saveToSessionStorage(listId, []);
});

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
  initializeOutput();
});
