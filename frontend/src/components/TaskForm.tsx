import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  initialTask?: Task | null | undefined;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const task = {
      id: initialTask?.id || 0,
      title,
      description,
      completed: initialTask?.completed || false,
    };

    try {
      if (initialTask) {
        // Update an existing task
        await axios.put(`http://localhost:3001/api/tasks/${initialTask.id}`, task);
      } else {
        // Create a new task
        await axios.post('http://localhost:3001/api/tasks', task);
      }
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {initialTask? 'Update Task': 'Create Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {initialTask? 'Update Task': 'Create Task'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TaskForm;