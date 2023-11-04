class Option{
    constructor(name, start, end){
        this.name = name;
        this.start = start;
        this.end = end;
    }
}

class OptionsList{
    constructor(){
        this.options = [];
    }
    createOption(name, start, end){
        let option = new Option(name, start, end);
        this.options.push(option);

        return option;
    }
    removeOption(name){
        for (let i = 0; i < this.options.length; i++) {
            const element = this.options[i];
            if (element.name == name){
                this.options.splice(i, 1);
                return element;
            }
        }
        return undefined;
    }
    removeAll(){
        const prevOptions = this.option;
        this.options = [];
        return prevOptions;
    }
}

function buildLink(optionId, input){
    const selectedOption = optionsList.options[optionId];
    let link = selectedOption.start + input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + selectedOption.end;
    return link;
}

function saveToLocalStorage(){
    const serializedOptionsList = JSON.stringify(optionsList);
    localStorage.setItem("savedOptions", serializedOptionsList);
    return serializedOptionsList;
}

function refreshDisplay(){
    let prevButtons = document.getElementsByClassName("search-button");
    while(prevButtons.length > 0){
        prevButtons[0].remove();
    }

    for (let i = 0; i < optionsList.options.length; i++) {
        let newButton = document.createElement("button");
        newButton.classList.add("search-button");
        newButton.onclick = function(){search(i)};
        newButton.oncontextmenu = function(){
            optionsList.options.splice(i, 1);
            saveToLocalStorage();
            refreshDisplay();
            return false;
        }
        
        let textNode = document.createTextNode(optionsList.options[i].name);
        newButton.appendChild(textNode);
        
        let containerDiv = document.querySelector(".buttons-container");
        let createButton = containerDiv.querySelector("#open-create-menu");
        containerDiv.insertBefore(newButton, createButton);
    }
}

function search(optionId){
    let input = document.getElementById("search-input").value;
    window.open(buildLink(optionId, input), "_self");
}

function showMenu(menuId){
    const menu = document.getElementById(menuId);
    menu.style.display = "flex";
}

function hideMenu(menuId){
    const menu = document.getElementById(menuId);
    menu.style.display = "none";
}

function createNewOptionFromMenu(){
    const name = document.getElementById("option-name-input");
    const start = document.getElementById("option-start-input");
    const end = document.getElementById("option-end-input");

    let option = new Option(name.value, start.value, end.value);
    optionsList.options.push(option);

    name.value = "";
    start.value = "";
    end.value = "";
    saveToLocalStorage();
    refreshDisplay();
    hideMenu("create-option-menu");
}

/* CODE STARTS */

let optionsList = new OptionsList();

const save = localStorage.getItem("savedOptions");
if (save == null){
    optionsList.createOption("Dictionary", "https://www.dictionary.com/browse/", "");
    optionsList.createOption("Thesaurus", "https://www.thesaurus.com/browse/", "");
    optionsList.createOption("Urban Dictionary", "https://www.urbandictionary.com/define.php?term=", "");
    saveToLocalStorage();
}
else {
    optionsList = JSON.parse(save);
}

refreshDisplay();
hideMenu("create-option-menu");
