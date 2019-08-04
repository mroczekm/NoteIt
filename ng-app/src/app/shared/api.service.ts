import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../notes/Model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Note} from "../notes/Model/note";

@Injectable()
export class ApiService {
  private BASE_URL = window["cnfApiBaseUrl"] + "/api";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks`;
  private DELETE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks\\`;
  private SEND_FEEDBACK_ULR = `${this.BASE_URL}\\feedback`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTE_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;

  constructor(private http: HttpClient) {
  }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postNotebook(notebook: Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK, notebook);
  }

  postFeedback(feedback: FeedbackViewModel) :Observable<any>{
    return this.http.post(this.SEND_FEEDBACK_ULR, feedback);
  }

  deleteNotebook(notebook: Notebook): Observable<any> {
    return this.http.delete(this.DELETE_UPDATE_NOTEBOOK + notebook.id);
  }

  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebook(notebookId: string): Observable<Note[]>{
    return this.http.get<Note[]>(this.NOTE_BY_NOTEBOOK_URL + notebookId);
  }

  saveNote(note: Note): Observable<Note>{
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE,note);
  }
  deleteNote(noteId: string): Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + noteId);
  }
}
