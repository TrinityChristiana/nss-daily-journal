// Move the code that is responsible for modifying the DOM into this file.


/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/

const entriesDOM = {
    renderJournalEntries (entries) {
        // creates variable to hold first instance of an element with entryLog as a class
        const journalArticles = document.querySelector(".entryLog");
        
        // Appends each html text to the selected variable above.
        entries.forEach(element => {
            journalArticles.appendChild(element);
        });
    }
}

export default entriesDOM;
