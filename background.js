let parent, child;

chrome.storage.sync.set({"data": []})
chrome.runtime.onInstalled.addListener(() => {
  parent = chrome.contextMenus.create({
    "title": "Insert text",
    "contexts": ["all"],
    "id": "parent"
  })
})

chrome.storage.onChanged.addListener(changes => {
  chrome.contextMenus.removeAll();
  parent = "";
  parent = chrome.contextMenus.create({
    "title": "Insert text",
    "contexts": ["all"],
    "id": "parent"
  })
  chrome.storage.sync.get(null, result => {
    result.data.forEach(note => {
      chrome.contextMenus.create({
        "title": note.title,
        "contexts": ["all"],
        "parentId": parent,
        "id": note.title
      })
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info);
  console.log(tab);
})