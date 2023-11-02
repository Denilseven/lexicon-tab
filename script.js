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
        return link;
    }
    buildLink(linkId, input){
        return this.links[linkId].start + input + this.links[linkId].end;
    }
}

let linksList = new LinksList();
linksList.newLink("Dictionary", "https://www.dictionary.com/browse/", ""); // dictionary.com (english dictionary)
linksList.newLink("Thesaurus", "https://www.thesaurus.com/browse/", ""); // thesaurus.com (english synonyms and antonyms)
linksList.newLink("Urban Dictionary", "https://www.urbandictionary.com/define.php?term=", ""); // urbandictionary.com (english slangs)
linksList.newLink("Dicio", "https://www.dicio.com.br/", "/"); // dicio.com.br (brazilian portuguese dictionary)
linksList.newLink("Sinônimos", "https://www.sinonimos.com.br/", "/"); // sinonimos.com.br (brazilian portuguese synonyms)
linksList.newLink("Antônimos", "https://www.antonimos.com.br/", "/"); // antonimos.com.br (brazilian portuguese antonyms)
linksList.newLink("Translate (english to portuguese)", "https://translate.google.com/?sl=en&tl=pt&text=", "&op=translate"); // Google translate word from english to portuguese
linksList.newLink("Translate (portuguese to english)", "https://translate.google.com/?sl=pt&tl=en&text=", "&op=translate"); // Google translate word from portuguese to english

// Create buttons
for (let i = 0; i < linksList.links.length; i++) {
    let newButton = document.createElement("button");
    newButton.classList.add("search-button");
    newButton.onclick = function(){search(i)};

    let textNode = document.createTextNode(linksList.links[i].name);

    newButton.appendChild(textNode);

    let containerDiv = document.querySelector(".buttons-container");
    containerDiv.appendChild(newButton);
}

function search(linkId){
    let input = document.getElementById("search-input").value;
    window.open(linksList.buildLink(linkId, input), "_self");
}
