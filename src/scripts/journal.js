/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
import entryComponent from "./entryComponent.js";
import entriesDOM from './entriesDOM.js';
import API from './data.js';

API.getJournalEntries().then(function (entries) {
    let component = [];
    entries.forEach(entry => {
        component.push(entryComponent.makeJournalEntryComponent(entry));
    });

    entriesDOM.renderJournalEntries(component);
    // console.log(result);
});

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
        fetch("http://localhost:8088/journalEntries", { // Replace "url" with your API's URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        });
        date.focus();
        e.preventDefault();
    }

    e.preventDefault();
});