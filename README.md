# LiveUpdate Tester

This project is a Vue 3 application designed to test live updates using the `@disguise-one/vue-liveupdate` library. It allows users to subscribe to object properties and view live updates in real-time.

## Features

- Subscribe to object properties and view their live updates.
- Add and remove objects dynamically.
- Built with Vue 3 and Vite for fast development.
- Autocomplete for property subscriptions

## Plugin installation

To use the pre-built plugin, download the latest release from [the releases page](https://github.com/disguise-one/Designer_Plugin-Live_Update/releases) and unzip the plugin to the `plugins` folder of your running project. The plugin will be available in the plugin launcher inside Designer, and via `http://localhost/` in the web-based plugin launcher.

## Prerequisites

- [Docker](https://www.docker.com/) installed and running.
- [Visual Studio Code](https://code.visualstudio.com/) with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/disguise-one/Designer_Plugin-Live_Update.git
cd Designer_Plugin-Live_Update
```

### Open in VS Code

1. Open the project folder in VS Code.
2. When prompted, click **Reopen in Container**. If not prompted, press `F1`, type `Dev Containers: Reopen in Container`, and select it.

### Run the Application

1. Once the container is built and running, open a terminal in VS Code.
2. Start the development server:
   ```bash
   npm run serve
   ```
3. Open your browser and navigate to `http://localhost:5173?director=localhost:80`. This assumes Designer is running on localhost at port 80.

## Project Structure

- **`src/components`**: Contains Vue components for managing subscriptions.
- **`src/App.vue`**: Main application component.

## Notes

- The `@disguise-one/vue-liveupdate` library is used to handle live updates. Ensure you have access to the required GitHub repository if using a private package.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
