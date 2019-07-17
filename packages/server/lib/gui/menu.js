/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash')
const os = require('os')
const { Menu } = require('electron')
const { shell } = require('electron')

const appData = require('../util/app_data')
const open = require('../util/open')

let onLogOutClicked = function () {}

module.exports = {
  set (options = {}) {
    _.defaults(options, {
      withDevTools: false,
    })

    //# this set by modes/interactive.coffee and needs to be preserved if the menu
    //# is set again by launcher.coffee when the Electron browser is run
    if (options.onLogOutClicked) {
      ({ onLogOutClicked } = options)
    }

    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'Changelog',
            click () {
              return shell.openExternal('https://on.cypress.io/changelog')
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Manage Account',
            click () {
              return shell.openExternal('https://on.cypress.io/dashboard')
            },
          },
          {
            label: 'Log Out',
            click: onLogOutClicked,
          },
          {
            type: 'separator',
          },
          {
            label: 'View App Data',
            click () {
              return open.opn(appData.path())
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Close Window',
            accelerator: 'CmdOrCtrl+W',
            role: 'close',
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo',
          },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo',
          },
          {
            type: 'separator',
          },
          {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut',
          },
          {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy',
          },
          {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste',
          },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall',
          },
        ],
      },
      {
        label: 'Window',
        role: 'window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize',
          },
        ],
      },
      {
        label: 'Help',
        role: 'help',
        submenu: [
          {
            label: 'Support',
            click () {
              return shell.openExternal('https://on.cypress.io/support')
            },
          },
          {
            label: 'Documentation',
            click () {
              return shell.openExternal('https://on.cypress.io')
            },
          },
          {
            label: 'Download Chromium',
            click () {
              return shell.openExternal('https://on.cypress.io/chromium-downloads')
            },
          },
          {
            label: 'Report an Issue',
            click () {
              return shell.openExternal('https://on.cypress.io/new-issue')
            },
          },
        ],
      },
    ]

    if (os.platform() === 'darwin') {
      const name = 'Cypress'

      template.unshift({
        label: name,
        submenu: [
          {
            label: `About ${name}`,
            role: 'about',
          },
          {
            type: 'separator',
          },
          {
            label: 'Services',
            role: 'services',
            submenu: [],
          },
          {
            type: 'separator',
          },
          {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide',
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            role: 'hideothers',
          },
          {
            label: 'Show All',
            role: 'unhide',
          },
          {
            type: 'separator',
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            //role: "quit" ## must upgrade to latest electron
            click: (item, focusedWindow) => {
              return process.exit(0)
            },
          },
        ],
      })
    }

    if (options.withDevTools) {
      template.push(
        {
          label: 'Developer Tools',
          submenu: [
            {
              label: 'Reload',
              accelerator: 'CmdOrCtrl+R',
              click: (item, focusedWindow) => {
                if (focusedWindow) {
                  return focusedWindow.reload()
                }
              },
            },
            {
              label: 'Toggle Developer Tools',
              accelerator: (function () {
                if (os.platform() === 'darwin') {
                  return 'Alt+Command+I'
                }

                return 'Ctrl+Shift+I'

              })(),
              click: (item, focusedWindow) => {
                if (focusedWindow) {
                  return focusedWindow.toggleDevTools()
                }
              },
            },
          ],
        }
      )
    }

    const menu = Menu.buildFromTemplate(template)

    return Menu.setApplicationMenu(menu)
  },
}
