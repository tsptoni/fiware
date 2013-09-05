/*
 *     Copyright (c) 2012-2013 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of the issue-reporter widget.
 *
 *     issue-reporter is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as published
 *     by the Free Software Foundation, either version 3 of the License, or (at
 *     your option) any later version.
 *
 *     issue-reporter is distributed in the hope that it will be useful, but
 *     WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
 *     General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with issue-reporter. If not, see <http://www.gnu.org/licenses/>.
 *
 *     Linking this library statically or dynamically with other modules is
 *     making a combined work based on this library.  Thus, the terms and
 *     conditions of the GNU Affero General Public License cover the whole
 *     combination.
 *
 *     As a special exception, the copyright holders of this library give you
 *     permission to link this library with independent modules to produce an
 *     executable, regardless of the license terms of these independent
 *     modules, and to copy and distribute the resulting executable under
 *     terms of your choice, provided that you also meet, for each linked
 *     independent module, the terms and conditions of the license of that
 *     module.  An independent module is a module which is not derived from
 *     or based on this library.  If you modify this library, you may extend
 *     this exception to your version of the library, but you are not
 *     obligated to do so.  If you do not wish to do so, delete this
 *     exception statement from your version.
 *
 */

/*global MashupPlatform, StyledElements*/

(function () {
 
    "use strict";

/******************************************************************************/
/********************************* PUBLIC *************************************/
/******************************************************************************/

    var IssueReporter = function IssueReporter() {

        this.authToken = null;

        /* Context */
        MashupPlatform.widget.context.registerCallback(function (newValues) {
            if (this.form && "widthInPixels" in newValues) {
                this.form.repaint();
            }
        }.bind(this));
    };
 
    IssueReporter.prototype.init = function init() {
        var fields = {
            "led_r": {
                label: 'Red led',
                type: 'text',
                required: true
            },
            "led_g": {
                label: 'Red green',
                type: 'text',
                required: true
            },
            "led_b": {
                label: 'Blue green',
                type: 'text',
                required: true
            }
        };

        var options = {
            cancelButton: false
        };
        this.form = new StyledElements.Form(fields, options);
        this.form.addEventListener("submit", sendCommand.bind(this));

        // TODO
        this.loadingIcon = document.createElement('i');
        this.loadingIcon.className = 'icon-refresh icon-spin';
        this.form.acceptButton.buttonElement.insertBefore(this.loadingIcon, this.form.acceptButton.buttonElement.childNodes[0]);
        // TODO

        this.form.insertInto(document.body);

    };

/******************************************************************************/
/******************************** PRIVATE *************************************/
/******************************************************************************/


    var create_msg = function create_msg(msg, type) {
        var element = document.createElement('div');
        element.className = 'alert alert-block';
        if (type != null) {
            type = 'alert_' + type;
        } else {
            type = 'alert_error';
        }
        element.classList.add();
        element.textContent = msg;
        document.body.appendChild(element);
        setTimeout(function () {
            document.body.removeChild(element);
        }, 3000);
    };

    var sendCommand = function sendCommand(form, data) {

        form.disable();

        var body = JSON.stringify({
            "commandML": "<paid:command name=\"SET\"><paid:cmdParam name=\"FreeText\"><swe:Text><swe:value>FIZCOMMAND 99-" +
                data.led_r + "-" + data.led_g + "-" + data.led_b + "</swe:value></swe:Text></paid:cmdParam></paid:command>"
        });

        var url = MashupPlatform.prefs.get('idas_server') + 'RGBS:65:FA:11:0002/command';
        MashupPlatform.http.makeRequest(url, {
                contentType: 'application/json',
                postBody: body,
                onSuccess: function () {
                    create_msg('Command sent successfully', 'success');
                },
                onFailure: function () {
                    create_msg('Error reporting the issue');
                },
                onComplete: function () {
                    this.form.enable();
                }.bind(this)
            }
        );

    };

    var issueReporter = new IssueReporter();

    window.addEventListener("DOMContentLoaded", issueReporter.init.bind(issueReporter), false);
})();
