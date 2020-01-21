/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
import entryComponent from "./entryComponent.js"
API.getJournalEntries().then(function(entries) {
    let component = [];
    entries.forEach(entry => {
        component.push(entryComponent.makeJournalEntryComponent(entry));
    });
    
    entriesDOM.renderJournalEntries(component);
    // console.log(result);
});