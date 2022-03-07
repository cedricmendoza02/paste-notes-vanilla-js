window.addEventListener("click", e => {
    console.log(e);
})

const titleInput = document.querySelector("input");
const contentInput = document.querySelector("textarea");
const listContainer = document.querySelector("ul");
const moveUpBtn = document.querySelector("[move-up-btn]");
const moveDownBtn = document.querySelector("[move-down-btn]");
const saveBtn = document.querySelector("[save-btn]");

// Displays the list. Fires whenever chrome storage changes
const displayList = () => {
    fetchData()
    .then(data => {
        if(data.length < 1) return;
        listContainer.innerHTML = '';
        data.forEach(note => {
            let li = document.createElement("li");
            li.classList.add('note');
            li.setAttribute("selected", false);
            li.innerText = note.title;
            listContainer.append(li);
        })
    })
}

// move the active note up a level
const moveUp = () => {
    if(titleInput.value === "") return;
    let target = titleInput.value;
    findTargetIndex(target)
    .then(index => {
        fetchData()
        .then(data => {
            if(index === 0) return;
            let temp = data[index - 1] // get item before
            data[index - 1] = data[index]
            data[index] = temp;
            chrome.storage.sync.set({"data": data}, () => displayList())
        })
    })
}

// move the active note down a level
const moveDown = () => {
    if(titleInput.value === "") return;
    let target = titleInput.value;
    findTargetIndex(target)
    .then(index => {
        fetchData()
        .then(data => {
            if(index === data.length - 1) return;
            let temp = data[index + 1] // get item after
            data[index + 1] = data[index]
            data[index] = temp;
            chrome.storage.sync.set({"data": data}, () => displayList())
        })
    })
}

// save input contents to the list and chrome storage
const save = (e) => {
    e.preventDefault();
    if(titleInput.value === "") return;
    fetchData()
    .then(data => {
        chrome.storage.sync.set({"data": [...data, 
            {
                "title": titleInput.value,
                "content": contentInput.value
            }]})
        return fetchData();
    })
    .then(result => {
        displayList();
        titleInput.value = "";
        contentInput.value = "";
    })
}

// fetches data from chrome storage
const fetchData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, result => resolve(result.data))
    })
}

const findTargetIndex = (target) => {
    let targetIndex = -1;
    let result = fetchData()
    .then(data => {
        let targetIndex;
        data.some((note, i) => {
            if(note.title === target) {
                targetIndex = i;
                return true;
            }
            return false;
        })
        return new Promise((resolve, reject) => resolve(targetIndex));
    })
    return result;
}

// Clicking an existing note, populates the input fields with the data stored
const setActive = (e) => {
    const targetType = e.type;
    const target = targetType == "input" ? e.target.value : e.target.innerText;
    findTargetIndex(target)
    .then(index => {
        if(index === -1) return;
        document.querySelectorAll('.note').forEach((note,i) => {
            note.setAttribute("selected", false);
            if(i === index) {
                note.setAttribute("selected", true);
            }
        })
        
        let data = fetchData();
        data.then(result => {
            titleInput.value = result[index].title;
            contentInput.value = result[index].content;
        }).catch(err => console.log("Updating title input"));
    })
}

displayList();
listContainer.addEventListener("click", setActive);
titleInput.addEventListener("input", setActive);
moveUpBtn.addEventListener("click", moveUp);
moveDownBtn.addEventListener("click", moveDown);
saveBtn.addEventListener("click", save);