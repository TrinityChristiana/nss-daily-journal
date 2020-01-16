/*
    Define the keys and value for a JavaScript object that
    represent
    s a journal entry about what you learned today
*/
const journalEntries = [
    {
        date: "07/24/2018",
        concept: "Array methods",
        entry: "We learned about 4 different array methods today. forEach made sense, but the others still confuse me.",
        mood: "Ok"
    },
    {
        date: "08/24/2018",
        concept: "Arrays with objects",
        entry: "We learned about 4 different obj methods today. forEach made sense, but the others still confuse me.",
        mood: "Ok"
    },
    {
        date: "09/24/2018",
        concept: "Object methods",
        entry: "We learned about 4 different array different today. forEach made sense, but the others still confuse me.",
        mood: "Ok"
    },
];


/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
const makeJournalEntryComponent = (journalEntry) => {
    let section = document.createElement('section');

    let concept = document.createElement('h2');
    concept.textContent = `${journalEntry.concept}`;

    let date = document.createElement('h3');
    date.textContent = `${journalEntry.date}`;

    let entry = document.createElement('p');
    entry.textContent = `${journalEntry.entry}`;

    let mood = document.createElement('p');
    mood.textContent = `${journalEntry.mood}`;

    
    section.appendChild(concept);
    section.appendChild(date);
    section.appendChild(entry);
    section.appendChild(mood);

    // Create your own HTML structure for a journal entry
    return section;
};

let journalEntryHTML = [];

// Runs makeournalEntryComponent on each journalEntry
journalEntries.forEach(element => {
    journalEntryHTML.push(makeJournalEntryComponent(element));
});

// A new "virtual" document fragment to contain components
const fragment = document.createDocumentFragment();
/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/
const renderJournalEntries = (entries) => {
    journalEntryHTML.forEach(element => {
       fragment.appendChild(element);
    });
};

// Invoke the render function
renderJournalEntries(journalEntryHTML);

const journalArticles = document.querySelector(".entryLog").appendChild(fragment);
