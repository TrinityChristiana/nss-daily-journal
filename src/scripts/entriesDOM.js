// Move the code that is responsible for modifying the DOM into this file.


/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/

const entriesDOM = {
    renderJournalEntries(entries) {
        // creates variable to hold first instance of an element with entryLog as a class
        const journalArticles = document.querySelector(".entryLog");
        // Appends each html text to the selected variable above.
        entries.forEach(element => {
            journalArticles.appendChild(element);
        });
    },
    renderEntryInput(e) {
        const currentSection = e.target.parentElement;
        const date = document.querySelector("#entry-date");
        const concept = document.querySelector("#concept-text");
        const entry = document.querySelector("#journal-entry");
        const mood = document.querySelector("#mood-select");

        date.value = currentSection.querySelector(".dateText").textContent;
        concept.value = currentSection.querySelector(".conceptText").textContent;
        entry.value = currentSection.querySelector(".entryText").textContent;
        mood.value = currentSection.querySelector(".moodText").textContent;
    },
    showEditEntryButton() {
        let editEntryButton = document.querySelector("#editEntry");
        let submitEntryButton = document.querySelector("#submitEntry");
        editEntryButton.classList.remove("toggle-button");
        submitEntryButton.classList.add("toggle-button");
    },
    showSubmitEntryButton() {
        let editEntryButton = document.querySelector("#editEntry");
        let submitEntryButton = document.querySelector("#submitEntry");
        editEntryButton.classList.add("toggle-button");
        submitEntryButton.classList.remove("toggle-button");
    },
    clearInput() {
        
    }
};

export default entriesDOM;