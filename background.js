chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"data": []})
  let parent = chrome.contextMenus.create({
    "title": "Insert text",
    "contexts": ["all"],
    "id": "parent"
  })
})

chrome.storage.onChanged.addListener((changes) => {
  console.log(changes);
})