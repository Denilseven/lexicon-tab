class BaseLink {
    constructor(name, start, end){
        this.name = name;
        this.start = start;
        this.end = end;
    }
}

class LinksList {
    constructor(){
        this.links = [];
    }
    newLink(name, start, end){
        let link = new BaseLink(name, start, end);
        this.links.push(link);

        let linksList_serialized = JSON.stringify(linksList);
        localStorage.setItem("savedLinks", linksList_serialized);

        return link;
    }
    removeLink(name){
        for (let i = 0; i < this.links.length; i++) {
            const element = this.links[i];
            if (element.name == name){
                this.links.splice(i, 1);
                return element;
            }
        }
        return undefined;
    }
    removeAll(){
        const prevLinks = this.links;
        this.links = [];
        return prevLinks;
    }
    buildLink(linkId, input){
        return this.links[linkId].start + input.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + this.links[linkId].end;
    }
}

function search(linkId){
    let input = document.getElementById("search-input").value;
    window.open(linksList.buildLink(linkId, input), "_self");
}

function refreshDisplay(){
    let currentButtons = document.getElementsByClassName("search-button");
    while(currentButtons.length > 0){
        currentButtons[0].remove();
    }

    let savedLinks = localStorage.getItem("savedLinks");
    for (let i = 0; i < savedLinks.length; i++) {
        let newButton = document.createElement("button");
        newButton.classList.add("search-button");
        newButton.onclick = function(){search(i)};
        let textNode = document.createTextNode(linksList.links[i].name);
        newButton.appendChild(textNode);
        let containerDiv = document.querySelector(".buttons-container");
        containerDiv.appendChild(newButton);
    }
}

let linksList = new LinksList();

linksList.newLink("Dictionary", "https://www.dictionary.com/browse/", ""); // dictionary.com (english dictionary)
linksList.newLink("Thesaurus", "https://www.thesaurus.com/browse/", ""); // thesaurus.com (english synonyms and antonyms)
linksList.newLink("Urban Dictionary", "https://www.urbandictionary.com/define.php?term=", ""); // urbandictionary.com (english slangs)

refreshDisplay();
