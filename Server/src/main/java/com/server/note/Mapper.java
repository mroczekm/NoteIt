package com.server.note;

import com.server.note.api.viewmodel.NotebookViewModel;
import com.server.note.api.viewmodel.NoteViewModel;
import com.server.note.db.NotebookRepository;
import com.server.note.model.Note;
import com.server.note.model.Notebook;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Mapper {
    private NotebookRepository notebookRepository;

    public Mapper(NotebookRepository notebookRepository) {
        this.notebookRepository = notebookRepository;
    }

    public NoteViewModel convertToNoteViewModel(Note entity){
        var viewModel= new NoteViewModel();
        viewModel.setTitle(entity.getTitle());
        viewModel.setId(entity.getId().toString());
        viewModel.setLastModifiedOn(entity.getLastModifiedOn());
        viewModel.setText(entity.getText());
        viewModel.setNotebookId(entity.getNotebook().getId().toString());

        return viewModel;
    }

    public Note convertToNoteEntity(NoteViewModel viewModel) {
        var notebook = this.notebookRepository.findById(UUID.fromString(viewModel.getNotebookId())).get();
        var entity = new Note(UUID.fromString(viewModel.getId()), viewModel.getTitle(), viewModel.getText(), notebook);

        return entity;
    }

    public NotebookViewModel convertToNotebookViewModel(Notebook entity) {
        var viewModel = new NotebookViewModel();
        viewModel.setId(entity.getId().toString());
        viewModel.setName(entity.getName());
        viewModel.setNbNotes(entity.getNotes().size());

        return viewModel;
    }

    public Notebook convertToNotebookEntity(NotebookViewModel viewModel) {
/*        if(viewModel.getId() == null){
            viewModel.setId(UUID.randomUUID().toString());
        }*/
        var entity = new Notebook(viewModel.getId(), viewModel.getName());

        return entity;
    }
}
