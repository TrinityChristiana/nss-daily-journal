/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
const makeJournalEntryComponent = (journalEntry) => {
    // creates section element to hold journal entries
    let section = document.createElement('section');

    // created h2 element for the concept
    let concept = document.createElement('h2');
    // Added concept from json file to created element
    concept.textContent = `${journalEntry.concept}`;

    // creates h3 element for the date
    let date = document.createElement('h3');
    // Added date from json file to created element
    date.textContent = `${journalEntry.date}`;

    // creates p elementfor the journal entry
    let entry = document.createElement('p');
    // Added entry from json file to created element
    entry.textContent = `${journalEntry.entry}`;

    // creates p element for mood
    let mood = document.createElement('p');
    // Added mood from json file to created element
    mood.textContent = `${journalEntry.mood}`;

    // Adds all elements and the text created above to the section element
    section.appendChild(concept);
    section.appendChild(date);
    section.appendChild(entry);
    section.appendChild(mood);

    // Returns new created section and the children of the element
    return section;
};

fetch("http://localhost:8088/journalEntries") // Fetch from the API
    .then(response => response.json())  // Parse as JSON
    .then(entries => {
        // What should happen when we finally have the array?
        entries.forEach(entry => {
            // Creates Empty array to hold journalEntry's html text
            let journalEntryHTML = [];
            // Pushes returned value from makeJournalEntryComponent for each entry to journaEntryHTML array.
            journalEntryHTML.push(makeJournalEntryComponent(entry));
            // Renders journal entry for each entry
            renderJournalEntries(journalEntryHTML);
        });
    });

/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/
const renderJournalEntries = (entries) => {
    // creates variable to hold first instance of an element with entryLog as a class
    const journalArticles = document.querySelector(".entryLog");
    
    // Appends each html text to the selected variable above.
    entries.forEach(element => {
        journalArticles.appendChild(element);
    });
};

