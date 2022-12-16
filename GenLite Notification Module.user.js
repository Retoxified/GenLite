// ==UserScript==
// @name         GenLite Notification Module
// @namespace    GenLite/Notifications
// @version      1.0.0
// @description  Exposes global functionality for displaying browser notifications
// @author       Xortrox#0001, Puls3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=genfanad.com
// @match        https://play.genfanad.com/play/
// @license MIT
// ==/UserScript==

(async function() {
    /**
     * Example usage:
     * const icon = 'https://www.google.com/s2/favicons?sz=64&domain=genfanad.com';
     * await window.genliteNotification.notify('GenLite Notification', 'GenLite has loaded!', icon);
     */
    class GenLiteNotificationPlugin {
        async init() {
            console.log('[GenLiteNotificationPlugin]: Loaded.');

            // setTimeout(() => {
            //     const icon = 'https://www.google.com/s2/favicons?sz=64&domain=genfanad.com';
            //     window.genliteNotification.notify('GenLite Notification', 'GenLite has loaded!', icon);
            // }, 3000);
            await this.askPermission();
        }

        /** Should always be awaited before you use notifications. */
        askPermission() {
            return this.hasPermission();
        }

        notify(title, text, icon) {
            this.hasPermission().then(function (result) {
                if (result === true) {
                    let popup = new window.Notification(title, { body: text, icon: icon });
                    popup.onclick = function () {
                        window.focus();
                    }
                }
            });
        }

        hasPermission() {
            return new Promise(function (resolve) {
                if ('Notification' in window) {
                    if (window.Notification.permission === 'granted') {
                        resolve(true);
                    } else {
                        window.Notification.requestPermission().then(function (permission) {
                            if (permission === 'granted') {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    }
                } else {
                    resolve(true);
                }
            });
        }

    }

    window.genliteNotification = new GenLiteNotificationPlugin();
    await window.genliteNotification.init();
})();