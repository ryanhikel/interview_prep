import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  Container,
  ListItemButton,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTask, setOpenTask] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3001/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  },[tasks]);

  const handleTaskClick = (taskId: number) => {
    setOpenTask(openTask === taskId? null: taskId);
  };

  const handleEditClick = (task: Task) => {
    onEdit(task);
  };

  const handleDeleteClick = (taskId: number) => {
    onDelete(taskId);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      {tasks? (
        <List>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItemButton onClick={() => handleTaskClick(task.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={task.title} />
                {openTask === task.id? <ExpandLess />: <ExpandMore />}
              </ListItemButton>
              <Collapse in={openTask === task.id} timeout="auto" unmountOnExit>
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText secondary={task.description} />
                </ListItem>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      ): (
        <Typography variant="body1">Loading tasks...</Typography>
      )}
    </Container>
  );
};

export default TaskList;