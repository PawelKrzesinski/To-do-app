
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import { ListItem,  ListItemText } from "@mui/material";
export default function TodoListItem(props) {

  const removeOne = (e, todoToDelete) => {
    e.preventDefault();
    const todos = props.todos.filter((todo) => todo.id !== todoToDelete.id)
    props.setTodosState(
      {
        ...props.todosState,
        todosArr: todos
      }
    ) 
  }

  const completeOne = (e, todoToComplete) => {
    e.preventDefault();
    const todos = props.todos.filter((todo) => todo.id !== todoToComplete.id)
    props.setTodosState(
      {
        ...props.todosState,
        todosArr: todos,
        completedTodos: [
          ...props.todosState.completedTodos, {
            ...todoToComplete,
            completed: true
          }
        ]
      }
    ) 
  }
  return (
    <ListItem sx={{p: 0 }}>
      <ListItemText primary={props.todo.name} sx={{ p: 1, my: '5px', minHeight: 34, color: 'white' }}></ListItemText>
       {props.todo.completed === false &&
          <div>
            <IconButton aria-label='complete' size='large' sx={{ borderRadius: 0, color: 'rgb(0, 180, 0)'}} onClick={(e) => completeOne(e, props.todo)}>
              <DoneIcon />
            </IconButton>
            <IconButton aria-label="delete" size='large' sx={{ borderRadius: 0, color: 'white'}} onClick={(e) => removeOne(e, props.todo)}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
      
    </ListItem>
  )
}