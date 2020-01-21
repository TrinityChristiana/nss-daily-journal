// Move the code that deals with getting the data into this file.

// fetch("http://localhost:8088/journalEntries") // Fetch from the API
//     .then(response => response.json())  // Parse as JSON
//     .then(entries => {
//         // What should happen when we finally have the array?
//         entries.forEach(entry => {
//             // Creates Empty array to hold journalEntry's html text
//             let journalEntryHTML = [];
//             // Pushes returned value from makeJournalEntryComponent for each entry to journaEntryHTML array.
//             journalEntryHTML.push(makeJournalEntryComponent(entry));
//             // Renders journal entry for each entry
//             renderJournalEntries(journalEntryHTML);
//         });
//     });

const API = {
    getJournalEntries () {
        return fetch("http://localhost:8088/journalEntries")
            .then(response => response.json());
    }
};