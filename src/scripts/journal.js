/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
import entryComponent from "./entryComponent.js";
import entriesDOM from './entriesDOM.js';
import API from './data.js';
import collectInput from './collectInput.js';
import validate from './validate.js'

const renderDOM = () => {
    document.querySelector(".entryLog").innerHTML = "";
    API.getJournalEntries().then((entries) => {
        let component = [];
        entries.forEach(entry => {
            let section = entryComponent.makeJournalEntryComponent(entry);
            // document.getElementById("");
            // let deleteButton = 
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
};

// const createFormChecker = (formElement) => {
//     let boolean = !(/\S/.test(formElement.value));
//     let value = formElement.value;
//     return {
//         boolean: boolean,
//         value: value
//     };
// };

const createEntryObject = (inputArray) => {
    console.log(inputArray);
    return {
        date: inputArray[0].value,
        concept: inputArray[1].value,
        entry: inputArray[2].value,
        mood: inputArray[3].value
    };
};


// Listen for Submit Button Click
document.getElementById("submitEntry").addEventListener("click", (e) => {
    e.preventDefault();
    const inputArray = [];

    // collect form values
    const dateObj = collectInput.getInputValues("#entry-date", "date");
    inputArray.push(dateObj);

    const conceptObj = collectInput.getInputValues("#concept-text", "concept");
    inputArray.push(conceptObj);

    const entryObj = collectInput.getInputValues("#journal-entry", "entry");
    inputArray.push(entryObj);

    const moodObj = collectInput.getInputValues("#mood-select", "mood");
    inputArray.push(moodObj);

    const checkForm = validate.createFormChecker(inputArray);   
    
    const formHasSpaces = checkForm[1];
    const formIsEmpty = checkForm[2];

    // console.log(dateObj, conceptObj, entryObj, moodObj);
    

    if (formHasSpaces) {
        alert("Please enter in all information");
        e.preventDefault();
    } else if (!formIsEmpty) {
        const newJournalEntry = createEntryObject(inputArray);
        console.log(newJournalEntry);
        // Use `fetch` with the POST method to add your entry to your API

        e.preventDefault();

        API.saveJournalEntry(newJournalEntry) /* post */
            /* .then(get) */
            .then(() => {
                renderDOM();
            });
        inputArray[0].selector.focus();

    }

    
});