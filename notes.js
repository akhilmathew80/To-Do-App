const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your Notes. . . '
}

//Add Notes
const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    //FILTER method will search for every data while FIND function will stop when a match is found, therefore returns a single value.
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    saveNotes(notes)
    console.log(chalk.green('New note added!'))
    }
    else{
        console.log(chalk.red('Note title already taken!'))
    }
   
}

//Remove Notes
const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length)
    {
        console.log(chalk.green('Note removed successfully!'))
    }
    else{
        console.log(chalk.red('Note does not exist'))
    }
    saveNotes(notesToKeep)
}

//List Notes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

//Read Notes
const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if(!noteToRead){
        console.log(chalk.red('No note found!'))
    }
    else{
        console.log(chalk.green('Note Title: '+ noteToRead.title))
        console.log('Body: '+ noteToRead.body)
    }
}

//Save Notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//Load Notes
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const parse = JSON.parse(dataJSON)
        return(parse)
    }
    catch(e){
        return[]
    }
   
}

//Exporting functions
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}