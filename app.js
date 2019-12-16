const chalk = require('chalk');
const yargs = require('yargs');
const notesapi = require('./notes');

yargs.version('1.1.1')

yargs.command({
    command : 'add',
    describe : 'adding a new note',
    builder : {
        title : {
            demandOption : true,
            type : 'string',
            describe : 'Title of the note'
        },
        body : {
            demandOption : true,
            type : 'string',
            describe : 'Body of the note'
        }
    },
    handler(argv) {
        notesapi.addNote(argv.title, argv.body)
    }
});

yargs.command({
    command : 'remove',
    describe : 'removing a note',
    builder : {
        title : {
            demandOption : true,
            type : 'string',
            describe : 'Title to remove'
        }
    },
    handler(argv){
        notesapi.removeNote(argv.title)
    }
});

yargs.command({
    command : 'list',
    describe : 'Listing out all the notes',
    handler(){
        notesapi.listNotes()
    }
});

yargs.command({
    command : 'read',
    describe : 'Reading a notes',
    builder : {
        title : {
            demandOption : true,
            type : 'title',
            describe : 'Title of the note to search'
        }
    },
    handler(argv){
        notesapi.readNote(argv.title)
    }
});

yargs.parse()