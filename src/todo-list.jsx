import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./use-local-storage";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todolist", []);
  const handleAddNewTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: uuidv4(), text: newTodo, done: false }]);
    setNewTodo("");
  };
  const handleToggleTodo = (todoToToggle) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoToToggle.id) {
          return {
            ...todoToToggle,
            done: !todoToToggle.done,
          };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ✅ Todo List
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddNewTodo}
          sx={{ display: "flex", gap: 2, mb: 3 }}
        ><TextField
            label="Add a new todo"
            variant="outlined"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Box>
        {/* Todo List */}
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                bgcolor: "background.paper",
                mb: 1,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Checkbox
                checked={todo.done}
                onChange={() => handleToggleTodo(todo)}
              />
              <ListItemText
                primary={todo.text}
                sx={{
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "gray" : "inherit",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoList;
