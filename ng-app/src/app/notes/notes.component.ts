import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./Model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./Model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(res => {
      this.notebooks = res
    }, err => {
      alert("An error")
    });
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: "New notebook",
      id: null,
      nbOfNotes: 0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id,
          this.notebooks.push(newNotebook)
      },
      error => {
        alert("An error")
      });
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      error => {
        alert("An error")
      });
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure?")) {
      this.apiService.deleteNotebook(notebook).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        error => {
          alert("An error")
        }
      );
    }
  }

  getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res
      }, err => {
        alert("An error")
      })
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure?")) {
      this.apiService.deleteNote(note.id).subscribe(res => {
        let indexOfNote = this.notes.indexOf(note);
        this.notes.splice(indexOfNote,1)
      }, error => {
      })
    }
  }

  createNote(notebookId: string) {
    let newNote: Note = {
      id: null,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: notebookId
    };

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id,
          this.notes.push(newNote)
      },
      error => {
        alert("An error")
      }
    )
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(res => {
      this.notes = res
    }, error => {
      alert("An error")
    })

  }

  updateNote(note: Note) {
    this.apiService.saveNote(note).subscribe(
      res => {
      }, error => {
        alert("An erro")
      })
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
