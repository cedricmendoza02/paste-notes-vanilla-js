console.log("Installed!");
let activeElement;

chrome.runtime.onMessage.addListener(
    (request, sender, sendresponse) => {
        
        console.log("request", request)
        console.log("sender", sender)
        sendresponse({done: "done"})

        activeElement = getActiveElement(document.activeElement);
        chrome.storage.sync.get(null, (result) => {
            let note = result.data.find(element => element.title === request.target)
            activeElement.value += note.content;
        })
    }
)

const getActiveElement = (activeElement) => {
    return activeElement.contentWindow.document.activeElement
}