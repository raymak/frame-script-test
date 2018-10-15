ChromeUtils.import("resource://gre/modules/Services.jsm");
const showPanel = (extensionUrl) => {
	const contentURL = `${extensionUrl}privileged/fsLoadTest/content`;
	const frameScriptUrl = (`${contentURL}/frame-script.js?${Math.random()}`);

	const win = Services.wm.getEnumerator("navigator:browser").getNext();

    const panel = win.document.createElement("panel");
    panel.setAttribute("id", "fs-test-panel");
    panel.setAttribute("class", "no-padding-panel");
    panel.setAttribute("type", "arrow");
    panel.setAttribute("noautofocus", true);
    panel.setAttribute("noautohide", true);
    panel.setAttribute("flip", "slide");
    panel.setAttribute("level", "parent");
    panel.setAttribute("position", "bottomcenter topright");

    const panelSize = {height: 200, width: 200};

    const embeddedBrowser = win.document.createElement("browser");
    embeddedBrowser.setAttribute("id", "fs-test-browser");
    embeddedBrowser.setAttribute("src", `${contentURL}/panel.html`);
    embeddedBrowser.setAttribute("type", "content");
    embeddedBrowser.setAttribute("disableglobalhistory", "true");
    embeddedBrowser.setAttribute("flex", "1");

    panel.appendChild(embeddedBrowser);
    win.document.getElementById("mainPopupSet").appendChild(panel);

    const panelContent = win.document.getAnonymousElementByAttribute(panel, "class", "panel-arrowcontent");

    panelContent.style.height = `${panelSize.height}px`;
    panelContent.style.width = `${panelSize.width}px`;

    // seems that messageManager only available when browser is attached
    embeddedBrowser.messageManager.loadFrameScript(frameScriptUrl, false);

    const burgerButton = win.document.getElementById("PanelUI-menu-button");
    const popAnchor = win.document.getAnonymousElementByAttribute(burgerButton, "class", "toolbarbutton-icon");

    panel.openPopup(popAnchor, "", 0, 0, false, false);

    embeddedBrowser.messageManager.sendAsyncMessage("load");
}

this.fsLoadTest = class extends ExtensionAPI {
	getAPI(context) {
   	const	extensionUrl = context.extension.getURL();

		return {
			fsLoadTest: {
				start() {
					console.log("starting");
					showPanel(extensionUrl);
				}
			}
		}
	}
};