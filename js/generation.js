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
  saveLastOutput(output);
}

function initializeOutput() {
  const lastOutput = getLastOutput();
  const outputTextArea = document.getElementById("outputTextArea");
  if (lastOutput) {
    outputTextArea.value = lastOutput;
  } else {
    generateOutput();
  }
}
