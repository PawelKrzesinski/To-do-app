import { Divider, List, } from "@mui/material";
import TodoListItem from './todo-list-item.component';
import './todo-list.component.css'
export default function TodoList(props) {
  return (
    <List className="todos-list" sx={
      { 
        backgroundColor: 'transparent', 
        width: 1, 
        overflowY: 'scroll',
        minHeight: '400px',
        height: '600px',
        maxHeight: '1000px',
        pb: '100px',
      }
    }>

    {
      props.todos.map((todo, index) => {
        return (
          <div key={index}>
            <TodoListItem todo={todo} todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todos}/>
            <Divider sx={{ background: '#1976d2', width: 1 }}></Divider>
          </div>
          )
      })
    }
    </List>
  )
}
