# Tampermonkey Discogs Util

A Tampermonkey script to enhance the Discogs website with useful features, including bulk editing, label highlighting, and advanced filtering.

## Features

- **Label Highlighting**: Automatically highlights record labels on Discogs pages based on their quality (e.g., "poor", "fair", "good", "very good").
- **Customizable Labels**: A dashboard to customize which labels are highlighted and their associated quality.
- **Bulk Editing**: Edit multiple items in your collection at once.
- **Advanced Filtering**: Filter releases on artist pages and wantlists.
- **Auto-collapsing Panel**: The control panel automatically collapses on pages where it's not needed.

## Installation

1.  Install a user script manager, such as [Tampermonkey](https://www.tampermonkey.net/).
2.  Install the script from the [dist/index.js](./dist/index.js) file in this repository.

## Usage

1.  Navigate to [Discogs](https://www.discogs.com).
2.  A new panel will appear on the right side of the screen.
3.  To configure the script, you will need a Discogs Personal Access Token. You can generate one in your Discogs settings under **Developers** > **Generate new token**.
4.  Enter the token in the panel to authenticate.

### Customizing Highlighted Labels

1.  Click the cog icon in the panel header to open the dashboard.
2.  Add, edit, or remove labels from the quality categories.
3.  Click "Save" to store your custom selections.

## Development

This project is built with React and TypeScript.

To get started:

1.  Clone the repository.
2.  Run `npm install` to install the dependencies.
3.  Run `npm run build` to build the script. The output will be in the `dist` folder.
4.  Run `npm run typecheck` to check for TypeScript errors.
