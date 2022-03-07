console.log("Installed!");
chrome.runtime.onMessage.addListener(
    (request, sender, sendresponse) => {
        
        console.log("request", request)
        console.log("sender", sender)
        sendresponse({done: "done"})

        let activeElement = getActiveElement(document.activeElement);
        console.log(activeElement);
    }
)

const getActiveElement = (activeElement) => {
    return activeElement
}