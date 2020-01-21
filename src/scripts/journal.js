// API.then(entries => {
//     // What should happen when we finally have the array?
//     entries.forEach(entry => {
//         // Creates Empty array to hold journalEntry's html text
//         let journalEntryHTML = [];
//         // Pushes returned value from makeJournalEntryComponent for each entry to journaEntryHTML array.
//         journalEntryHTML.push(makeJournalEntryComponent(entry));
//         // Renders journal entry for each entry
//         renderJournalEntries(journalEntryHTML);
//     });
// })

/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
// objectWithGetterMethod.methodToGetData().then(renderJournalEntries(null));
API.getJournalEntries().then(function(entries) {
    let component = [];
    entries.forEach(entry => {
        component.push(makeJournalEntryComponent(entry));
    });
    
    renderJournalEntries(component);
    // console.log(result);
});