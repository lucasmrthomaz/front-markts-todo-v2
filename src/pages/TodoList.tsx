import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoListComponent from '../components/TodoListComponent';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'DONE';
  createdAt: Date;
}

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="static" className="bg-orange-500">
        <Toolbar>
          <ShoppingCart className="mr-2" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MARKTS
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogOut />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="py-8">
        <TodoListComponent todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default TodoList;