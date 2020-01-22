// Main Js File
import convertEntryData from "./convertEntryData.js";
import entriesDOM from './entriesDOM.js';
import API from './data.js';
import collectInput from './collectInput.js';
import validate from './validate.js'

const renderDOM = () => {
    document.querySelector(".entryLog").innerHTML = "";
    API.getJournalEntries().then((entries) => {
        let component = [];
        entries.forEach(entry => {
            let section = convertEntryData.makeJournalEntryComponent(entry);
            let deleteButton = section.querySelector(".deleteButton");
            let editButton = section.querySelector(".editButton");

            deleteButton.addEventListener("click", (e) => {

                deleteEntry(e.target.parentElement.id);
            });

            editButton.addEventListener("click", (e) => {
                // Shows entry values in form to edit
                entriesDOM.renderEntryInput(e);
                entriesDOM.showEditEntryButton();
                editClicked(e.target.parentElement.id);
            });
            component.push(section);
        });
        entriesDOM.renderJournalEntries(component);
    });
};
renderDOM();

const deleteEntry = (id) => {
    API.deleteJournalEntry(id)
        .then(() => renderDOM());
};

const editJournalEntry = (id) => {

    API.editJournalEntry(id)

        .then(() => renderDOM());
}

// Listen for Submit Button Click
document.getElementById("submitEntry").addEventListener("click", (e) => {
    e.preventDefault();
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
    const checkForm = validate.createFormChecker(inputArray);
    // pulls out boolean values of checkForm for conditional
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
            .then(() => {
                renderDOM();
            });

        inputArray[0].selector.focus();
    }
    const form = document.querySelector('#journal-form').reset();
});

const editClicked = (id) => {
    document.getElementById("editEntry").addEventListener("click", (e) => {
        e.preventDefault();
        entriesDOM.showSubmitEntryButton()
        let date = document.querySelector("#entry-date").value;
        let concept = document.querySelector("#concept-text").value;
        let entry = document.querySelector("#journal-entry").value;
        let mood = document.querySelector("#mood-select").value;

        API.editJournalEntry(id, {
                "date": `${date}`,
                "concept": `${concept}`,
                "entry": `${entry}`,
                "mood": `${mood}`,
            })
            .then(() => {
                renderDOM(); 
                const form = document.querySelector('#journal-form').reset();
            });
            
    });
};