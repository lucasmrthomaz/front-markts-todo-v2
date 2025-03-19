import * as material from '@mui/material';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

interface TodoItem {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'DONE';
    createdAt: Date;
}

type StatusFilter = 'ALL' | 'TODO' | 'DONE';

interface TodoListComponentProps {
    todos: TodoItem[];
    setTodos: (todos: TodoItem[]) => void;
}

export default function TodoListComponent({ todos, setTodos }: TodoListComponentProps) {
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
        <material.Paper elevation={3} className="p-6">
            <material.Box className="flex justify-between items-center mb-6">
                <material.Typography variant="h5" component="h1">
                    Minha lista de mercado
                </material.Typography>
                <material.Box className="flex gap-4 items-center">
                    <material.FormControl size="small" className="min-w-[120px]">
                        <material.InputLabel>Status</material.InputLabel>
                        <material.Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                        >
                            <material.MenuItem value="ALL">ALL</material.MenuItem>
                            <material.MenuItem value="TODO">TODO</material.MenuItem>
                            <material.MenuItem value="DONE">DONE</material.MenuItem>
                        </material.Select>
                    </material.FormControl>
                    <material.Button
                        variant="contained"
                        startIcon={<Plus />}
                        onClick={() => handleOpenDialog()}
                        className="bg-green-800"
                    >
                        Adicionar Item
                    </material.Button>
                </material.Box>
            </material.Box>

            <material.List>
                {filteredTodos.map((todo) => (
                    <material.ListItem
                        key={todo.id}
                        className={`mb-4 rounded-lg border ${todo.status === 'DONE' ? 'bg-gray-50' : 'bg-white'
                            }`}
                        secondaryAction={
                            <material.Box>
                                <material.IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleOpenDialog(todo)}
                                    className="mr-1"
                                >
                                    <Edit className="text-indigo-600" />
                                </material.IconButton>
                                <material.IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteItem(todo.id)}
                                >
                                    <Trash2 className="text-red-500" />
                                </material.IconButton>
                            </material.Box>
                        }
                    >
                        <material.ListItemText
                            primary={
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`text-lg font-medium cursor-pointer ${todo.status === 'DONE' ? 'line-through text-gray-500' : ''
                                            }`}
                                        onClick={() => handleToggleStatus(todo.id)}
                                    >
                                        {todo.title}
                                    </span>
                                    <material.Chip
                                        label={todo.status}
                                        size="small"
                                        className={`${todo.status === 'DONE'
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
                    </material.ListItem>
                ))}
                {filteredTodos.length === 0 && (
                    <material.Typography className="text-center text-gray-500 py-8">
                        Nenhum item adicionado :(
                    </material.Typography>
                )}
            </material.List>

            <material.Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <material.DialogTitle>
                    {editingTodo ? 'Editar Item' : 'Adicionar Item'}
                </material.DialogTitle>
                <material.DialogContent>
                    <material.TextField
                        autoFocus
                        margin="dense"
                        label="Titulo"
                        fullWidth
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="mb-4"
                    />
                    <material.TextField
                        margin="dense"
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={3}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="mb-4"
                    />
                </material.DialogContent>
                <material.DialogActions>
                    <material.Button onClick={handleCloseDialog} variant="text" className="text-orange-500">
                        Cancelar
                    </material.Button>
                    <material.Button onClick={handleSaveItem} variant="contained" className="bg-green-800">
                        {editingTodo ? 'Salvar' : 'Adicionar'}
                    </material.Button>
                </material.DialogActions>
            </material.Dialog>
        </material.Paper>
    );
}
