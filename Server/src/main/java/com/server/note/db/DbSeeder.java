package com.server.note.db;

import com.server.note.model.Note;
import com.server.note.model.Notebook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "noteit.db.recreate", havingValue = "true")
public class DbSeeder implements CommandLineRunner {
    private NotebookRepository notebookRepository;
    private NoteRepository noteRepository;

    public DbSeeder(NotebookRepository notebookRepository, NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();

        var defaultNotebook = new Notebook("Default");
        this.notebookRepository.save(defaultNotebook);

        var quotesNotebook = new Notebook("Quotes");
        this.notebookRepository.save(quotesNotebook);

        var note = new Note("Hello","Welcome to Note It", defaultNotebook);
        this.noteRepository.save(note);

        var quoteNote = new Note("Latina Quote", "Carpe Diem", quotesNotebook);
        this.noteRepository.save(quoteNote);

        System.out.println("Init db");
    }
}
