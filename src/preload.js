const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example function to send messages to the main process
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  // Example function to receive messages from the main process
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  // Additional functions as needed
});
