// Move the code that is responsible for creating the journal entry HTML component into this file.
/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
const entryComponent = {
    makeJournalEntryComponent (journalEntry) {
        
        // creates section element to hold journal entries
        let section = document.createElement('section');
        section.setAttribute("id", `${journalEntry.id}`);
        

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

        let deleteButton = document.createElement('button');
        deleteButton.textContent = `Delete Entry`;
        deleteButton.setAttribute("id", `${journalEntry.id}`);

        let editButton = document.createElement('button');
        editButton.textContent = `Edit Entry`;
        editButton.setAttribute("id", "editButton", `${journalEntry.id}`, );

        // Adds all elements and the text created above to the section element
        section.appendChild(concept);
        section.appendChild(date);
        section.appendChild(entry);
        section.appendChild(mood);
        section.appendChild(deleteButton);
        section.appendChild(editButton);

        // Returns new created section and the children of the element
        // console.log(section);
        
        return section;
    }
};

export default entryComponent;