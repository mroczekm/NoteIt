package com.server.note.db;

import com.server.note.model.Note;
import com.server.note.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {
    List<Note> findAllByNotebook(Notebook notebook);
}
