import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { ShoppingCart, Plus, Trash2, LogOut, Edit} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'DONE';
  createdAt: Date;
}

type StatusFilter = 'ALL' | 'TODO' | 'DONE';

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleOpenDialog = (todo?: TodoItem) => {
    if (todo) {
      setEditingTodo(todo);
      setFormTitle(todo.title);
      setFormDescription(todo.description);
    } else {
      setEditingTodo(null);
      setFormTitle('');
      setFormDescription('');
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTodo(null);
    setFormTitle('');
    setFormDescription('');
  };

  const handleSaveItem = () => {
    if (formTitle.trim()) {
      if (editingTodo) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingTodo.id
              ? {
                  ...todo,
                  title: formTitle,
                  description: formDescription,
                }
              : todo
          )
        );
      } else {
        setTodos([
          ...todos,
          {
            id: Date.now(),
            title: formTitle,
            description: formDescription,
            status: 'TODO',
            createdAt: new Date(),
          },
        ]);
      }
      handleCloseDialog();
    }
  };

  const handleDeleteItem = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'TODO' ? 'DONE' : 'TODO' }
          : todo
      )
    );
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredTodos = todos.filter((todo) => 
    statusFilter === 'ALL' ? true : todo.status === statusFilter
  );

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
        <Paper elevation={3} className="p-6">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h5" component="h1">
              Minha lista de mercado
            </Typography>
            <Box className="flex gap-4 items-center">
              <FormControl size="small" className="min-w-[120px]">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                >
                  <MenuItem value="ALL">ALL</MenuItem>
                  <MenuItem value="TODO">TODO</MenuItem>
                  <MenuItem value="DONE">DONE</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<Plus />}
                onClick={() => handleOpenDialog()}
                className="bg-green-800"
              >
                Adicionar Item
              </Button>
            </Box>
          </Box>

          <List>
            {filteredTodos.map((todo) => (
              <ListItem
                key={todo.id}
                className={`mb-4 rounded-lg border ${
                  todo.status === 'DONE' ? 'bg-gray-50' : 'bg-white'
                }`}
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOpenDialog(todo)}
                      className="mr-1"
                    >
                      <Edit className="text-indigo-600" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteItem(todo.id)}
                    >
                      <Trash2 className="text-red-500" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-lg font-medium cursor-pointer ${
                          todo.status === 'DONE' ? 'line-through text-gray-500' : ''
                        }`}
                        onClick={() => handleToggleStatus(todo.id)}
                      >
                        {todo.title}
                      </span>
                      <Chip
                        label={todo.status}
                        size="small"
                        className={`${
                          todo.status === 'DONE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      />
                    </div>
                  }
                  secondary={
                    <div className="mt-1">
                      <p className="text-gray-600">{todo.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Criado: {formatDate(todo.createdAt)}
                      </p>
                    </div>
                  }
                />
              </ListItem>
            ))}
            {filteredTodos.length === 0 && (
              <Typography className="text-center text-gray-500 py-8">
                Nenhum item adicionado :(  
              </Typography>
            )}
          </List>
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingTodo ? 'Editar Item' : 'Adicionar Item'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titulo"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={3}
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="mb-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant='text' className='text-orange-500'>Cancelar</Button>
          <Button onClick={handleSaveItem} variant="contained" className="bg-green-800">
            {editingTodo ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TodoList;