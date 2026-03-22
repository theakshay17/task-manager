package com.akshay.studentManagement.controller;

import com.akshay.studentManagement.model.Tasks;
import com.akshay.studentManagement.service.TasksService;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private TasksService service;

    public TaskController(TasksService service) {
        this.service = service;
    }

    @PostMapping("/tasks")
    public Tasks createTask(@RequestBody Tasks task){
        return service.createTask(task);
    }

    @GetMapping("/tasks")
    public List<Tasks> getAllTasks(){
        return service.getAllTasks();
    }

    @GetMapping("/tasks/{taskId}")
    public Tasks getTaskById(@PathVariable Long taskId){
        return service.getTaskById(taskId);
    }

    @DeleteMapping("/tasks/{taskId}")
    public Task deleteTaskById(@PathVariable Long taskId){
        return service.deleteTaskById(taskId);
    }

    @PutMapping("/tasks/{taskId}")
    public Tasks updateTask(@PathVariable Long taskId, @RequestBody Tasks tasks){
        return service.updateTask(taskId, tasks);
    }
}
