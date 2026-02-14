const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('L\'extension Bhilal est active !');

    let disposable = vscode.commands.registerCommand('bhilal.run', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('Aucun fichier ouvert.');
            return;
        }

        const filePath = editor.document.fileName;
        if (!filePath.endsWith('.bh')) {
            vscode.window.showErrorMessage('Ce n\'est pas un fichier Bhilal (.bh).');
            return;
        }

        // Sauvegarder le fichier avant de lancer
        editor.document.save().then(() => {
            // Créer ou utiliser un terminal existant
            let terminal = vscode.window.terminals.find(t => t.name === "Bhilal Run");
            if (!terminal) {
                terminal = vscode.window.createTerminal("Bhilal Run");
            }
            terminal.show();

            // Utiliser la commande globale 'bhilal' si installée, sinon fallback sur bhilal.js
            // On peut détecter le chemin ici ou simplement tenter 'bhilal'
            terminal.sendText(`bhilal "${filePath}"`);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
