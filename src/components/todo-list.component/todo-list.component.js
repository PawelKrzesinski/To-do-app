import { Divider, List, } from "@mui/material";
import TodoListItem from './todo-list-item.component';


export default function TodoList(props) {


  return (
    <List sx={
      { 
        backgroundColor: 'gainsboro', 
        minWidth: 350, 
        height: 625, 
        overflow: 'scroll', 
        border: '1px solid gray', 
        pt: 0 
      }
    } className='todos-list'>

    {
      props.todosState.todosArr.map((todo, index) => {
        return (
          <div key={index}>
            <TodoListItem todo={todo} todosState={props.todosState} setTodosState={props.setTodosState}/>
            <Divider sx={{ background: 'black', width: 1 }}></Divider>
          </div>
          )
      })
    }
    </List>
  )
}

