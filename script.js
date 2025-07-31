// TODO: add "restore default options" button/"link"
// TODO: right clicking edits options
// TODO: fix edge-case of creating empty options
// TODO: add a favicon

const SEARCH_WORD_FORMAT = "LEXICON";

const DEFAULT_OPTION_NAMES = [
    "Dictionary",
    "Thesaurus",
    "Urban Dict.",
];
const DEFAULT_OPTION_LINKS = [
    `https://www.dictionary.com/browse/${SEARCH_WORD_FORMAT}`,
    `https://www.thesaurus.com/browse/${SEARCH_WORD_FORMAT}`,
    `https://www.urbandictionary.com/define.php?term=${SEARCH_WORD_FORMAT}`,
];

let optionNames = [];
let optionLinks = [];

/* CODE STARTS */

{
    const localSave = localStorage.getItem("localOptions");
    if (localSave == null)
        restoreDefaultOptions();
    else {
        const parsedSaveObject = JSON.parse(localSave);
        optionNames = parsedSaveObject.names;
        optionLinks = parsedSaveObject.links;
    }
}

updateDisplay();
hideCreateMenu();

document.getElementById("search-input").focus();

/* FUNCTION DEFINITIONS */

function getOptionIndex(name) {
    for (let i = 0; i < optionNames.length; i++) {
        if (optionNames[i] == name)
            return i; // return the index if the option exists
    }
    return optionNames.length; // return an empty index at the end if it doesn't exist 
}

function addOption(name, link) {
    const optionIndex = getOptionIndex(name);
    optionNames[optionIndex] = name;
    optionLinks[optionIndex] = link;
}

function removeOption(name) {
    const optionIndex = getOptionIndex(name);
    optionNames.splice(optionIndex, 1);
    optionLinks.splice(optionIndex, 1);
}

function removeAllOptions() {
    optionNames = [];
    optionLinks = [];
}

function restoreDefaultOptions() {
    removeAllOptions();
    for (let i = 0; i < DEFAULT_OPTION_NAMES.length; i++)
        addOption(DEFAULT_OPTION_NAMES[i], DEFAULT_OPTION_LINKS[i]);
    localStorage.clear();
}

function updateDisplay() {
    const previousButtons = document.getElementsByClassName("search-button");
    while(previousButtons.length > 0) {
        previousButtons[0].remove();
    }
    optionNames.forEach(optionName => {
        createButtonElement(optionName)
    });
}

function createButtonElement(optionName) {
    const newButton = document.createElement("button");
    newButton.classList.add("search-button");
    newButton.onclick = function() { search(optionLinks[getOptionIndex(optionName)]) };
    newButton.oncontextmenu = function() {
        removeOption(optionName);
        saveToLocalStorage();
        updateDisplay();
        return false;
    };
    
    const textNode = document.createTextNode(optionName);
    newButton.appendChild(textNode);
    
    const containerDiv = document.querySelector("#options-holder");
    const createButton = containerDiv.querySelector("#open-create-menu");
    containerDiv.insertBefore(newButton, createButton);
    return newButton;
}

function addOptionFromMenu() {
    const nameElement = document.getElementById("option-name-input");
    const linkElement = document.getElementById("option-link-input");

    addOption(nameElement.value, linkElement.value);
    nameElement.value = "";
    linkElement.value = "";
}

function showCreateMenu() {
    const menuElement = document.getElementById("create-option-menu");
    menuElement.style.display = "flex";
}

function hideCreateMenu() {
    const menuElement = document.getElementById("create-option-menu");
    menuElement.style.display = "none";
}

function saveToLocalStorage() {
    const optionsObject = { names: optionNames, links: optionLinks };
    const serializedOptionsObject = JSON.stringify(optionsObject);
    localStorage.setItem("localOptions", serializedOptionsObject);
    return serializedOptionsObject;
}

function search(optionLink) {
    const inputElement = document.getElementById("search-input");
    let link = optionLink.replace(SEARCH_WORD_FORMAT, inputElement.value); // build the link
    window.open(link, "_self");
    return link;
}
