import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import './todo-app.component.css'
import { v4 as uuidv4 } from 'uuid';
import TodoInput from '../todo-input/todo-input.component';
import TodoTabs from '../todo-tabs/todo-tabs.component';
import * as themeProvider from '../theme-provider.component';
import HamburgerMenu from '../todo-hamburger-menu/todo-hamburger-menu.component';
import { Box } from '@mui/system';

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



  return (
    <div className="content">
      <Card sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column', mb: '0px',   backgroundColor: '#3a3d42', borderRadius: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, backgroundColor: '#1f1f1f' }}>
            <Typography sx={{ textAlign:'center', fontSize: '28px', color: 'white', ml: themes.spacing(2) }}>Today Tasks</Typography>
            <HamburgerMenu todosState={todosState} setTodosState={setTodosState}></HamburgerMenu>  
          </Box>
          <TodoTabs todosState={todosState} setTodosState={setTodosState}/>
          <TodoInput todosState={todosState} setTodosState={setTodosState} todoInput={todoInput}/>
      </Card>
    </div>
  )
}