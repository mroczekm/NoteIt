package com.server.note.api;

import com.server.note.Mapper;
import com.server.note.api.viewmodel.NoteViewModel;
import com.server.note.db.NoteRepository;
import com.server.note.db.NotebookRepository;
import com.server.note.model.Note;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
public class NoteController {
    private NoteRepository noteRepository;
    private NotebookRepository notebookRepository;
    private Mapper mapper;

    public NoteController(NoteRepository noteRepository, NotebookRepository notebookRepository, Mapper mapper) {
        this.noteRepository = noteRepository;
        this.notebookRepository = notebookRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public List<NoteViewModel> all() {
        var notes = this.noteRepository.findAll();

        var notesViewModel = notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());

        return notesViewModel;
    }

    @GetMapping("byId/{id}")
    public NoteViewModel byId(@PathVariable String id){
        var note = this.noteRepository.findById(UUID.fromString(id)).orElse(null);

        if (note == null){
            throw new EntityNotFoundException();
        }

        var noteViewModel = this.mapper.convertToNoteViewModel(note);

        return noteViewModel;
    }

    @GetMapping("/byNotebook/{notebookId}")
    public List<NoteViewModel> byNotebook(@PathVariable String notebookId){
        List<Note> notes = new ArrayList<>();

        var notebook = this.notebookRepository.findById(UUID.fromString(notebookId));
        if (notebook.isPresent()){
            notes = this.noteRepository.findAllByNotebook(notebook.get());
        }

        var noteViewModel = notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());

        return noteViewModel;
    }

    @PostMapping
    public Note save(@RequestBody NoteViewModel noteCreateViewModel, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        var noteEntity = this.mapper.convertToNoteEntity(noteCreateViewModel);

        this.noteRepository.save(noteEntity);

        return noteEntity;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        this.noteRepository.deleteById(UUID.fromString(id));
    }

}
