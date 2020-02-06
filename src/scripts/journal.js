// Main Js File
import convertEntryData from "./convertEntryData.js";
import entriesDOM from './entriesDOM.js';
import API from './data.js';
import collectInput from './collectInput.js';
import validate from './validate.js'

let clickedID;
let backUpdateArray = JSON.parse(sessionStorage.getItem(`backupData`));
// sessionStorage.removeItem(`entry-data`);
let entries = JSON.parse(sessionStorage.getItem(`entry-data`));

let eventHandler = (id) => {
    console.log(id);
    event.preventDefault();
    // const id = event.target.parentNode.id;
    const inputArray = createCheckBooleans();
    const checkForm = validate.createFormChecker(inputArray);
    const formHasSpaces = checkForm[1];
    const formIsEmpty = checkForm[2];

    let date = document.querySelector("#entry-date").value;
    let concept = document.querySelector("#concept-text").value;
    let entry = document.querySelector("#journal-entry").value.trim();
    let mood = document.querySelector("#mood-select").value;

    if (formHasSpaces /* || entry.value == undefined */ ) {
        alert("Please enter in all information");
        e.preventDefault();
    } else if (!formIsEmpty) {
        entriesDOM.showSubmitEntryButton();
        const editedEntryObj = {
            "date": `${date}`,
            "concept": `${concept}`,
            "entry": `${entry}`,
            "mood": `${mood}`,
        };
        API.editJournalEntry(id, editedEntryObj)
            .then(() => {
                renderDOM(true);
                document.querySelector('#journal-form').reset();

            })
            .catch(() => {
                console.log("eventhander");
                backUpData(Number(id), editedEntryObj);
            });
    }
};

const renderDOM = (hasUpdated, wasEdited) => {
    if (hasUpdated && wasEdited) {
        console.log(backUpdateArray);
        composeDOM(backUpdateArray);
    } else if (hasUpdated || entries == null) {
        API.getJournalEntries()
            .then(data => {
                // Have it update jsonfile with backup data if ther eis some!!!
                if (backUpdateArray !== null) {

                    sessionStorage.setItem(`entry-data`, JSON.stringify(backUpdateArray));
                    sessionStorage.removeItem(`backupData`);

                } else {

                    sessionStorage.setItem(`entry-data`, JSON.stringify(data));

                }

                entries = JSON.parse(sessionStorage.getItem(`entry-data`));
                composeDOM(entries);

            });
    } else {
        console.log("composing");
        if (backUpdateArray == null) {
            entries = JSON.parse(sessionStorage.getItem(`entry-data`));
        } else {
            entries = backUpdateArray;
        }

        composeDOM(entries);
        const editEntryButton = document.getElementById("editEntry");
        editEntryButton.addEventListener("click", () => {

            eventHandler(clickedID)
        });
    }

};
const composeDOM = (entries) => {
    document.querySelector(".entryLog").innerHTML = "";
    let component = [];
    entries.forEach(entry => {
        let section = convertEntryData.makeJournalEntryComponent(entry);
        let deleteButton = section.querySelector(".deleteButton");
        let editButton = section.querySelector(".editButton");
        component.push(section);
        deleteButton.addEventListener("click", (e) => {

            deleteEntry(e.target.parentElement.id);
        });
        editButton.addEventListener("click", (e) => {
            // Shows entry values in form to edit
            entriesDOM.renderEntryInput(e);
            entriesDOM.showEditEntryButton();
            clickedID = event.target.parentNode.id;
        });

    });

    entriesDOM.renderJournalEntries(component);

};

renderDOM(false);

const deleteEntry = (id) => {
    API.deleteJournalEntry(id)
        .then(() => renderDOM(true))
        .catch(error => {
            console.log(error);
            alert("Entries cannot be deleted at this time");
        });
};

const createCheckBooleans = () => {
    const inputArray = [];

    // collect form values in an Obj
    const dateObj = collectInput.getInputValues("#entry-date", "date");
    const conceptObj = collectInput.getInputValues("#concept-text", "concept");
    const entryObj = collectInput.getInputValues("#journal-entry", "entry");
    const moodObj = collectInput.getInputValues("#mood-select", "mood");

    // Pushes obj to array
    inputArray.push(dateObj);
    inputArray.push(conceptObj);
    inputArray.push(entryObj);
    inputArray.push(moodObj);

    // checks form to see if any fields are empty or filled with spaces

    return inputArray;
    // pulls out boolean values of checkForm for conditional

}

// Listen for Submit Button Click
document.getElementById("submitEntry").addEventListener("click", (e) => {
    e.preventDefault();

    const inputArray = createCheckBooleans();
    const checkForm = validate.createFormChecker(inputArray);
    const formHasSpaces = checkForm[1];
    const formIsEmpty = checkForm[2];
    if (formHasSpaces) {
        alert("Please enter in all information");
        e.preventDefault();
    } else if (!formIsEmpty) {
        const newJournalEntry = convertEntryData.createEntryObject(inputArray);

        e.preventDefault();

        API.saveJournalEntry(newJournalEntry) /* post */
            /* .then(get) */
            .then(() => renderDOM(true))

        inputArray[0].selector.focus();
        document.querySelector('#journal-form').reset();
    }

});

const backUpData = (id, editedEntryObj) => {
    console.log(id);
    if (backUpdateArray == null) {
        backUpdateArray = [];
        entries.forEach(element => {
            backUpdateArray.push(element);
        });
        sessionStorage.setItem(`backupData`, JSON.stringify(entries));
    } else {
        if (typeof id == "number") {
            console.log("this");
            editedEntryObj.id = id;
            backUpdateArray.forEach((element, index) => {
                if (id == element.id) {
                    backUpdateArray[index] = editedEntryObj;
                }
            });
        } else {

        }

        sessionStorage.setItem(`backupData`, JSON.stringify(backUpdateArray));
        console.log(backUpdateArray);
        renderDOM(true, true);
    }

};

let moodFilter = document.forms["mood-filter-form"].getElementsByTagName("input");

for (let i = 0; i < moodFilter.length; i++) {
    moodFilter[i].addEventListener("click", () => {
        document.querySelector(".entryLog").innerHTML = "";
        // const entryData = sessionStorage.getItem(`entry-data`);
        const data = JSON.parse(sessionStorage.getItem(`entry-data`));
        const filterBy = moodFilter[i].value;
        const moodFiltered = data.filter(entry => {
            if (entry.mood == filterBy) return entry;
        });

        let component = [];
        console.log(moodFiltered);
        composeDOM(moodFiltered);
    });



}



document.getElementById("searchBox").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        const data = JSON.parse(sessionStorage.getItem(`entry-data`));
        const searchKeyword = document.getElementById("searchBox").value;
        let idCollection = [];
        for (const prop in data) {
            for (const value of Object.values(data[prop])) {
                const valueStr = JSON.stringify(value).toLowerCase();
                
                if (typeof value != "number" && valueStr.includes(searchKeyword.toLowerCase())) {

                    idCollection.push(data[prop].id);
                }
            }
        }
        idCollection = new Set(idCollection);
        const searchFiltered = data.filter(entry => {
            let equal = false;
            idCollection.forEach((id) => {
                if (entry.id == id) equal = true;
            });

            if (equal == true) return entry;

        });

console.log(searchFiltered);


        composeDOM(searchFiltered);
        // console.log(data);
    }
})