console.log("frame script loaded");

addMessageListener("load", {
	receiveMessage(message) {
		console.log("message received:", message);
		content.addEventListener("load", load);
	}
});

const load = () => {
	content.document.getElementById("label").textContent = "The frame script has successfully accessed this.";
  content.document.getElementById("btn").addEventListener("click", () => {
    console.log("button was clicked");
  });
}