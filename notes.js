const fs = require('fs')
const chalk = require('chalk')

var getNotes = () =>{
    return 'Your Notes...';
}

/* 
describe : Function to add a note. Duplicate title are not allowed
arguments : title, boby
*/
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => note.title === title )
    
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added!"))
    }
    else{
        console.log(chalk.red.inverse(`Note with the title ${title} already exist`))
    }
}

/* 
describe : To remove a note from the list. If the note is not found, an error wil be logged
argument : Title of the note to be removed
 */

const removeNote = (title) => {
    const notes = loadNotes()
    const unmatchedNotes = notes.filter((note) => note.title !== title)
    
    if(unmatchedNotes.length === notes.length){
        console.log(chalk.red.inverse(`Note with title "${title}" not found`))
    }
    else{
        saveNotes(unmatchedNotes)
        console.log(chalk.green.inverse(`Note with title "${title}" removed!`))
    }    
}

/* 
describe : List all the notes title
*/
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green("Your Notes"))
    notes.forEach(note => {
        console.log(chalk.magenta(note.title))
    });
}


const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find( (note) => note.title === title)

    if(note){
        console.log(chalk.magenta(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found"))
    }
}


/* 
describe : Function to load notes from notes.json file
*/
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const notesJSON = dataBuffer.toString()
        return JSON.parse(notesJSON)
    } catch (error) {
        return []
    }
}

/* 
describe : Function to save the notes array to notes.json file
*/
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
};