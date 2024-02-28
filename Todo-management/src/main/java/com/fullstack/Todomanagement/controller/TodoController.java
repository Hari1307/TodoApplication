package com.fullstack.Todomanagement.controller;

import com.fullstack.Todomanagement.Exception.ResourceNotFoundException;
import com.fullstack.Todomanagement.modal.Todo;
import com.fullstack.Todomanagement.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@AllArgsConstructor
@CrossOrigin("http://127.0.0.1:4000/")
public class TodoController {
    private TodoService todoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("add")
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.addTodo(todo), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("get/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("getAll")
    public ResponseEntity<List<Todo>> getAllTodo() {
        return new ResponseEntity<>(todoService.getAllTodo(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo, @PathVariable Long id) {
        return new ResponseEntity<>(todoService.updateTodo(todo, id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.deleteTodo(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/complete/{id}")
    public ResponseEntity<Todo> completeTodo(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.completeTodo(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/inComplete/{id}")
    public ResponseEntity<Todo> inCompleteTodo(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.inCompleteTodo(id));
    }


    // here this method is getting executed if anywhere in the service method some method is throwing this Exception ,
    // this controller method will handle that exception and throw the message that we have given in the service
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
