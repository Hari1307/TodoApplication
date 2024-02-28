package com.fullstack.Todomanagement.repository;

import com.fullstack.Todomanagement.modal.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
