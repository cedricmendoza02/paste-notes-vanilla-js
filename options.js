const titleInput = document.querySelector("input");
const contentInput = document.querySelector("textarea");
const listContainer = document.querySelector("ul");
const moveUpBtn = document.querySelector("[move-up-btn]");
const moveDownBtn = document.querySelector("[move-down-btn]");

const testData = [
    {
        "title": "Item 1",
        "content": "I am Item 1"
    },
    {
        "title": "Item 2",
        "content": "I am Item 2"
    },
    {
        "title": "Item 3",
        "content": "I am Item 3"
    },
];

const displayList = () => {
    listContainer.innerHTML = '';
    testData.forEach(note => {
        let li = document.createElement("li");
        li.innerText = note.title;
        listContainer.append(li);
    })
}

const moveUp = () => {
    if(titleInput.value === "") return;
    let target = titleInput.value;
    let targetIndex = findTargetIndex(target);
    if(targetIndex === 0) return;
    let temp = testData[targetIndex - 1] // get item before
    testData[targetIndex - 1] = testData[targetIndex]
    testData[targetIndex] = temp;
    displayList();
}

const moveDown = () => {
    if(titleInput.value === "") return;
    let target = titleInput.value;
    let targetIndex = findTargetIndex(target);
    if(targetIndex === testData.length - 1) return;
    let temp = testData[targetIndex + 1] // get item after
    testData[targetIndex + 1] = testData[targetIndex]
    testData[targetIndex] = temp;
    displayList();

}

const findTargetIndex = (target) => {
    let targetIndex = -1;
    testData.some((note, i) => {
        if(note.title === target) {
            targetIndex = i;
            return true;
        }
        return false;
    })
    return targetIndex;
}

const setActive = (e) => {
    const target = e.type == "input" ? e.target.value : e.target.innerText;
    let targetIndex = findTargetIndex(target);
    if(targetIndex === -1) return;
    titleInput.value = testData[targetIndex].title;
    contentInput.value = testData[targetIndex].content;
}

displayList();
listContainer.addEventListener("click", setActive);
titleInput.addEventListener("input", setActive);
moveUpBtn.addEventListener("click", moveUp);
