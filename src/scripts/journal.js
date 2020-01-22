/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
import entryComponent from "./entryComponent.js";
import entriesDOM from './entriesDOM.js';
import API from './data.js';

const renderDOM = () => {
    document.querySelector(".entryLog").innerHTML = "";
    API.getJournalEntries().then((entries) => {
        let component = [];
        entries.forEach(entry => {
            // let section = entryComponent.makeJournalEntryComponent(entry);
            document.getElementById("");
            let deleteButton = 
            section.addEventListener("click", (e) => {
                deleteEntry(e.currentTarget.id);
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
}

const createFormChecker = (formElement) => {
    let boolean = !(/\S/.test(formElement.value));
    let value = formElement.value;
    return {
        boolean: boolean,
        value: value
    }
};

const createEntryObject = (date, concept, entry, mood) => {
    return {
        date: date,
        concept: concept,
        entry: entry,
        mood: mood
    };
};


// Invoke the factory function, passing along the form field values





// Listen for Submit Button Click
document.getElementById("submitEntry").addEventListener("click", (e) => {
    let checkForm = [];

    // collect form values
    let date = document.querySelector("#entry-date");
    let dateValue = document.querySelector("#entry-date").value;
    checkForm.push(createFormChecker(date));

    let concept = document.querySelector("#concept-text");
    let conceptValue = document.querySelector("#concept-text").value;
    checkForm.push(createFormChecker(concept));

    let entry = document.querySelector("#journal-entry");
    let entryValue = document.querySelector("#journal-entry").value;
    checkForm.push(createFormChecker(entry));

    let mood = document.querySelector("#mood-select");
    let moodValue = document.querySelector("#mood-select").value;
    checkForm.push(createFormChecker(mood));

    let formHasSpaces = checkForm.some(element => element.boolean === true);
    let formIsEmpty = checkForm.some(element => element.value === "");

    if (formHasSpaces) {
        alert("Please enter in all information");
        e.preventDefault();
    } else if (!formIsEmpty) {
        const newJournalEntry = createEntryObject(dateValue, conceptValue, entryValue, moodValue);

        // Use `fetch` with the POST method to add your entry to your API

        e.preventDefault();

        API.saveJournalEntry(newJournalEntry) /* post */
            /* .then(get) */
            .then(() => {
                renderDOM();
            });
        date.focus();

    }

    e.preventDefault();
});