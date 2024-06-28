# List Element Mixer

List Element Mixer is a tool designed to help illustrators generate ideas for whimsical fantasy scenes. It takes input lists and generates a string using random elements from each list, making it easier to come up with unique and creative concepts for illustrations.

## Purpose

The initial use-case of this application is to generate ideas for illustrations in a whimsical fantasy setting. The illustrations focus on animals or fantasy species (such as those from Dungeons and Dragons or the Lord of the Rings) somewhat anthropomorphized by wearing human attire and/or performing human tasks. This tool was developed to assist illustrators in brainstorming and creating these imaginative scenes.

## Features

- **Multi-list Management**: Create and manage multiple lists of items, including sub-lists for more granular selection.
- **File Upload**: Load lists from text files formatted with main items and sub-items indented with a tab character.
- **Random Output Generation**: Generate random combinations of items from each list.
- **Presets**: Save the current lists as presets and load them later, with each tab maintaining its own lists independently.
- **Pre-loaded Lists**: Four pre-loaded lists to help you get started, designed to inspire whimsical fantasy scenes.
- **Centralized Preset Repository**: All tabs can access and save presets to a central repository.
- **Feature Suggestions and Issue Reporting**: Link to GitHub Issues page for feature suggestions and bug reports.

## Development Process

The entire project source code was written by ChatGPT from user prompts. This approach has its challenges and unique aspects:

- **Prompt Engineering**: Communicating detailed requirements to ChatGPT to generate the necessary HTML, CSS, and JavaScript code.
- **Iterative Refinement**: Making incremental updates and improvements to the code based on ongoing feedback and new requirements.
- **Handling Curveballs**: Managing occasional inconsistencies, such as unexpected changes or breaking updates in the generated code.
- **Collaboration**: Combining human creativity and AI-generated code to build a functional and user-friendly tool.

## Getting Started

To get started with List Element Mixer:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/zcoffin86/ListElementMixer.git
   cd ListElementMixer
   ```

2. **Open the HTML File**:
   Open `index.html` in your preferred web browser.

3. **Use the Tool**:

   - Click "Add List" to create a new list column.
   - Use the "Pick a .txt File" button to load items into the list. The format of the .txt file should have main items on separate lines and sub-items indented with a tab character.

   Example format:

   ```plaintext
   Unicorn
       (Celestial)
       (Midnight)
   Dragon
       (Fire-breathing)
       (Ice-breathing)
   Phoenix
       (Flame)
       (Ashen)
   ```

4. **Generate Output**:
   Click "Generate Output" to randomly select an item from each list and combine them into a single output string.

5. **Manage Presets**:
   Use the "Save Preset" button to save your current lists configuration. Load a saved preset using the "Load Preset" button and delete presets with the "Delete Preset" button.

## Contributing

We welcome contributions to improve List Element Mixer. To contribute:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Create a Branch**:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**: Submit your pull request on GitHub.

## Feature Suggestions and Issue Reporting

If you have ideas for new features or encounter any issues, please visit our [GitHub Issues page](https://github.com/zcoffin86/ListElementMixer/issues) to submit your suggestions or report problems.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to my illustrator friend for inspiring the creation of this tool, and to ChatGPT for generating the initial codebase.

Happy mixing and may your illustrations be full of whimsy and fantasy!
