import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../notes/Model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";

@Injectable()
export class ApiService {
  private BASE_URL = "http://localhost:8082/api/";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks`;
  private DELETE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks\\`;
  private SEND_FEEDBACK_ULR = `${this.BASE_URL}\\feedback`;

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
}
