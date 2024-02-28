package com.fullstack.Todomanagement.service;

import com.fullstack.Todomanagement.dto.TodoDto;
import com.fullstack.Todomanagement.modal.Todo;

import java.util.List;

public interface TodoService {
    Todo addTodo(Todo todo);
    Todo getTodoById(Long id);
    List<Todo> getAllTodo();
    Todo updateTodo(Todo todo , Long id);
    String deleteTodo(Long id);

    Todo completeTodo(Long id);

    Todo inCompleteTodo(Long id);
}
