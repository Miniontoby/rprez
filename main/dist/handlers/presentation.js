"use strict";
/*
Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of RPrez.

RPrez is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

RPrez is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with RPrez.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequestExitShow = exports.handleRequestPresentShow = exports.handleRequestReloadPresentation = exports.handleRequestLoadPresentation = void 0;
const message_1 = require("../common/message");
const project_1 = require("../project");
const windows_1 = require("../windows");
const server_1 = require("../server");
async function loadPresentation(filename) {
    console.log(`Loading presentation at ${filename}`);
    let presentationProject;
    try {
        presentationProject = await (0, project_1.loadProject)(filename);
    }
    catch (err) {
        // TODO: display error in the UI
        console.error(err);
        return;
    }
    (0, project_1.setSlideNumber)(Math.min(presentationProject.slides.length - 1, (0, project_1.getSlideNumber)()));
    const message = {
        type: message_1.MessageType.ProjectLoaded,
        project: presentationProject
    };
    (0, server_1.sendMessageToManager)(message);
}
let currentProjectFile = '';
async function handleRequestLoadPresentation(loadMessage) {
    currentProjectFile = loadMessage.filename;
    await loadPresentation(currentProjectFile);
}
exports.handleRequestLoadPresentation = handleRequestLoadPresentation;
async function handleRequestReloadPresentation() {
    await loadPresentation(currentProjectFile);
}
exports.handleRequestReloadPresentation = handleRequestReloadPresentation;
function handleRequestPresentShow(presentMessage) {
    console.log('Starting presentation');
    for (const monitorId in presentMessage.screenAssignments) {
        // eslint-disable-next-line no-prototype-builtins
        if (!presentMessage.screenAssignments.hasOwnProperty(monitorId)) {
            continue;
        }
        const screenAssignment = presentMessage.screenAssignments[monitorId];
        if (!screenAssignment) {
            throw new Error('Internal Error: screenAssignment is unexepctedly undefined');
        }
        const display = (0, windows_1.getDisplayForId)(parseInt(monitorId, 10));
        console.log(`Opening ${message_1.MonitorViews[screenAssignment]} view on monitor ` +
            `${monitorId} (${display.bounds.width}x${display.bounds.height})`);
        (0, windows_1.createPresentationWindow)(screenAssignment, display.bounds.x, display.bounds.y, presentMessage.developerMode);
        setTimeout(project_1.sendSldeUpdatedMessage, 1000);
    }
}
exports.handleRequestPresentShow = handleRequestPresentShow;
function handleRequestExitShow() {
    console.log('Exiting presentation');
    (0, windows_1.closePresentationWindows)();
}
exports.handleRequestExitShow = handleRequestExitShow;
//# sourceMappingURL=presentation.js.map