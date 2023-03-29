import { Divider, List, } from "@mui/material";
import TodoListItem from './todo-list-item.component';

export default function TodoList(props) {
  return (
    <List className='todos-list' sx={
      { 
        backgroundColor: 'gainsboro', 
        width: 1, 
        height: 525, 
        overflow: 'scroll', 
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
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
