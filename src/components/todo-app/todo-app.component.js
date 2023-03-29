import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import './todo-app.component.css'
import { v4 as uuidv4 } from 'uuid';
import TodoInput from '../todo-input/todo-input.component';
import TodoTabs from '../todo-tabs/todo-tabs.component';
import * as themeProvider from '../theme-provider.component';
export default function TodoApp() {
  const themes = themeProvider.spacing;
  const todosInitialState = {
    todo: {
      name: '',
      id: 0,
      completed: false,
    },
    todosArr: [],
    completedTodos: [],
    isAdded: false,
  }
  const [todosState, setTodosState] = useState(todosInitialState)
  const todoInput = useRef();

  useEffect(() => {
    if(!todosState.isAdded) return;

    const addTodo = () => {
      if(todosState.todo.name.length < 1) return setTodosState({...todosState, isAdded: false});
      return setTodosState({...todosState, todosArr: 
        [...todosState.todosArr, 
          { 
            name: todosState.todo.name,
            id: uuidv4(),
            completed: false,
          }
        ], 
        isAdded: false,
        todo: {
          name: '',
          id: 0,
        }
      })
    }
    addTodo();
    clearInput();

  },[todosState])

  
  const clearInput = () => {
    todoInput.current.value = '';
  }
  
  const removeAll = (e) => {
    e.preventDefault();
    setTodosState({...todosState, todosArr: []}) 
  }
  
  const completeAll = (e) => {
    e.preventDefault();
    const ongoingTodos = todosState.todosArr.map((todo) =>{ 
      todo = {
        ...todo,
        completed: true
      }
      return todo;
    });
    setTodosState({
      ...todosState,
      completedTodos: [
        ...todosState.completedTodos,
        ...ongoingTodos
      ],
      todosArr: []
    }) 
  }

  return (
    <div className="content">
      <Card sx={{ position: 'relative', width: 450, height: 850, backgroundColor:"rgb(200, 200, 200)", display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 5 }}>
        <CardContent sx={{ backgroundColor: 'white', margin: themes.spacing(5, 5, 3), borderRadius: 2, alignSelf: 'center', minWidth: 400, minHeight: 700, '& .MuiList-root': { mx: 0}}}>
        <Typography sx={{ textAlign:'center', background: 'white', fontSize: '28px' }} >Today Tasks</Typography>
        <div className='buttons-container'>
          <Button sx={{ margin: themes.spacing(1, 1 )}} variant="contained" onClick={(e) => completeAll(e)}>Complete All</Button>
          <Button sx={{ margin: themes.spacing(1, 0, 1, 1 )}} variant="contained" onClick={(e) => removeAll(e)}>Clear All</Button>
        </div> 
        <TodoTabs todosState={todosState} setTodosState={setTodosState}/>
        </CardContent>
        <TodoInput todosState={todosState} setTodosState={setTodosState} todoInput={todoInput}/>
      </Card>
    </div>
  )
}