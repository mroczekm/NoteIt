package com.server.note.db;

import com.server.note.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotebookRepository extends JpaRepository<Notebook, UUID> {
}
