// Move the code that is responsible for compiling the input data into different data types (obj, HTML component)

const convertInputData = {
    makeJournalEntryComponent (journalEntry) {
        
        // creates section element to hold journal entries
        let section = document.createElement('section');
        section.setAttribute("id", `${journalEntry.id}`);
        
        // created h2 element for the concept
        let concept = document.createElement('h2');
        // Added concept from json file to created element
        concept.textContent = `${journalEntry.concept}`;
        concept.setAttribute("class", `conceptText`);

        // creates h3 element for the date
        let date = document.createElement('h3');
        // Added date from json file to created element
        date.textContent = `${journalEntry.date}`;
        date.setAttribute("class", `dateText`);

        // creates p elementfor the journal entry
        let entry = document.createElement('p');
        // Added entry from json file to created element
        entry.textContent = `${journalEntry.entry}`;
        entry.setAttribute("class", `entryText`);

        // creates p element for mood
        let mood = document.createElement('p');
        // Added mood from json file to created element
        mood.textContent = `${journalEntry.mood.label}`;
        mood.setAttribute("class", `moodText`);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = `Delete Entry`;
        deleteButton.setAttribute("class", `deleteButton`);


        let editButton = document.createElement('button');
        editButton.textContent = `Edit Entry`;
        editButton.setAttribute("class", `editButton`);

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
    },
    createEntryObject(inputArray) {
        return {
            date: inputArray[0].value,
            concept: inputArray[1].value,
            entry: inputArray[2].value,
            moodId: inputArray[3].value
        };
    }
};

export default convertInputData;