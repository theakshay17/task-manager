package com.akshay.studentManagement.service;

import com.akshay.studentManagement.model.Tasks;
import com.akshay.studentManagement.repository.TasksRepository;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {

    private TasksRepository repo;

    public TasksService(TasksRepository repo) {
        this.repo = repo;
    }

    public Tasks createTask(Tasks task){
        return repo.save(task);
    }

    public List<Tasks> getAllTasks(){
        return repo.findAll();
    }

    public Tasks getTaskById(Long taskId){
        return repo.findById(taskId).orElse(null);
    }

    public Task deleteTaskById(Long taskId) {
        repo.deleteById(taskId);
        return null;
    }

    public Tasks updateTask(Long taskId, Tasks updatedTask){
        Tasks task = repo.findById(taskId).orElse(null);

        if(task != null){
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setCompleted(updatedTask.isCompleted());
            return repo.save(task);
        }
        return null;
    }
}
