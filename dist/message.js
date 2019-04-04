"use strict";
/*
Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of MDPrez.

MDPrez is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MDPrez is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with MDPrez.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["RequestPresentShow"] = 0] = "RequestPresentShow";
    MessageType[MessageType["RequestNext"] = 1] = "RequestNext";
    MessageType[MessageType["RequestPrevious"] = 2] = "RequestPrevious";
    MessageType[MessageType["ScreenUpdated"] = 3] = "ScreenUpdated";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=message.js.map