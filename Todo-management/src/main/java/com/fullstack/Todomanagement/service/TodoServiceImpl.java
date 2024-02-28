package com.fullstack.Todomanagement.service;

import com.fullstack.Todomanagement.Exception.ResourceNotFoundException;
import com.fullstack.Todomanagement.modal.Todo;
import com.fullstack.Todomanagement.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;

    @Override
    public Todo addTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not able to find the Entry with id : " + id));
    }

    @Override
    public List<Todo> getAllTodo() {
        return todoRepository.findAll();
    }

    @Override
    public Todo updateTodo(Todo todo, Long id) {
        Todo old = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("unable to find the todo by Id : " + id));
        old.setTitle(todo.getTitle());
        old.setDescription(todo.getDescription());
        old.setCompleted(todo.isCompleted());
        return todoRepository.save(old);
    }

    @Override
    public String deleteTodo(Long id) {
        todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("unable to find the todo by id : " + id));
        todoRepository.deleteById(id);
        return "Todo is deleted.";
    }

    @Override
    public Todo completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("unable to find the todo by id : " + id));
        todo.setCompleted(Boolean.TRUE);
        return todoRepository.save(todo);
    }

    @Override
    public Todo inCompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("unable to find the todo by id : " + id));
        todo.setCompleted(Boolean.FALSE);
        return todoRepository.save(todo);
    }
}
