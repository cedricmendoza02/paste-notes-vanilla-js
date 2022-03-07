let parent, child;


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"data": []}) // initialize data to an empty array
  parent = chrome.contextMenus.create({
    "title": "Insert text",
    "contexts": ["all"],
    "id": "parent"
  })
})

chrome.storage.onChanged.addListener(changes => {
  chrome.contextMenus.removeAll(); // removes all context menus
  parent = ""; 

  // re-create the context menus
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
  console.log("tab", tab);
  console.log("info", info);
  chrome.tabs.sendMessage(tab.id, {target: info.menuItemId}, response => {
    console.log(response.done);
  })
})