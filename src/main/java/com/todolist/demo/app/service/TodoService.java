package com.todolist.demo.app.service;

import com.todolist.demo.app.model.TodoItem;
import com.todolist.demo.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<TodoItem> findAll() {
        return todoRepository.findAll();
    }

    public Optional<TodoItem> findById(Long id) {
        return todoRepository.findById(id);
    }

    public TodoItem save(TodoItem todoItem) {
        return todoRepository.save(todoItem);
    }

    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }
}
