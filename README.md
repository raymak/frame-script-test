This script tests if the frame script loaded into a \<browser\> can access the document of the page it's been loaded in.

Just run the addon and observe the panel that automatically opens after two seconds. You will see one of two messages:

1. "The frame script has successfully accessed this.", which means that the frame script successfully accessed the dom element in the page.
2. "The frame script has failed to access this.", which means that the frame script was not able to access the page document.

In case 1, clicking the button should send a "button was clicked" message to the console.
