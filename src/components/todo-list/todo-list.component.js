import { Divider, List, } from "@mui/material";
import TodoListItem from './todo-list-item.component';

export default function TodoList(props) {
  return (
    <List className='todos-list' sx={
      { 
        backgroundColor: 'gainsboro', 
        minWidth: 350, 
        height: 525, 
        overflow: 'scroll', 
        border: '1px solid gray', 
        pt: 0 
      }
    }>

    {
      props.todos.map((todo, index) => {
        return (
          <div key={index}>
            <TodoListItem todo={todo} todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todos}/>
            <Divider sx={{ background: 'black', width: 1 }}></Divider>
          </div>
          )
      })
    }
    </List>
  )
}
