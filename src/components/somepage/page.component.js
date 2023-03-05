
import { React, useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardActions, Divider, ListItem, List, ListItemText, Typography, Icon } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './page.component.css'
import { createTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function MainPage() {

  const todosInitialState = {
    todo: {
      name: '',
      id: 0,
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
          { name: todosState.todo.name,
            id: uuidv4()
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

  const handleInput = (e) => {
    setTodosState({...todosState, todo: {name: e.target.value }})
  }

  const clearInput = () => {
    todoInput.current.value = '';
  }

  const addToDo = (e) => {
    e.preventDefault();
    setTodosState({...todosState, isAdded: true}) 
  }
  
  const addTodoOnEnter = (e) => {
      if(e.key === 'Enter') {
      addToDo(e)
    }
  }

  const removeOne = (e, todoToDelete) => {
    e.preventDefault();
    const todos = todosState.todosArr.filter((todo) => todo.id !== todoToDelete.id)
    setTodosState({...todosState, todosArr: todos}) 
  }
  
  const removeAll = (e) => {
    e.preventDefault();
    setTodosState({...todosState, todosArr: []}) 
  }

  const completeOne = (e, todoToComplete) => {
    e.preventDefault();
    const todos = todosState.todosArr.filter((todo) => todo.id !== todoToComplete.id)
    setTodosState({...todosState, todosArr: todos, completedTodos: [...todosState.completedTodos, todoToComplete]}) 
  }

  const completeAll = (e) => {
    e.preventDefault();
    setTodosState({...todosState,  completedTodos: [...todosState.completedTodos, todosState.todosArr], todosArr: []}) 
  }
  const theme = createTheme({
    spacing:  [0, 4, 8, 12, 16, 20, 24, 28, 32],
  })

  return (
    <div className="content">
      <Card sx={
        { 
          position: 'relative',
          width: 450, 
          height: 850, 
          backgroundColor:"rgb(200, 200, 200)", 
          display: 'flex', flexDirection: 'column',
          boxShadow: 2, 
          borderRadius: 5,
        }
      }>
        <CardContent sx=
        {
          { 
            backgroundColor: 'white', 
            margin: theme.spacing(5, 5, 3), 
            borderRadius: 2, 
            alignSelf: 'center', 
            minWidth: 400, 
            minHeight: 700, 
            '& .MuiList-root': { mx: 0}
          }
        }>
          <Typography sx={{ textAlign:'center', background: 'white' }} variant='h4'>Today Tasks</Typography>
          <div className='buttons-container'>

            <Button sx={{ margin: theme.spacing(1, 1 )}} 
              variant="contained"
              onClick={(e) => completeAll(e)
            }>Complete All</Button>

            <Button sx={{ margin: theme.spacing(1, 0, 1, 1 )}} 
              variant="contained"
              onClick={(e) => removeAll(e)
            }>Clear All</Button>

          </div>
          <List sx=
          {
            { 
              backgroundColor: 'gainsboro', 
              minWidth: 350, 
              height: 625, 
              overflow: 'scroll', 
              border: '1px solid gray', 
              pt: 0 
            }
          } 
            className='todos-list'>
            {
              todosState.todosArr.map((todo, index) => {
                return (
                  <div key={index}>
                    <ListItem sx={{p: 0 }}>
                      <ListItemText primary={todo.name} sx={{ p: 1, my: '5px', minHeight: 34 }}></ListItemText>
                      <IconButton 
                      aria-label='complete' 
                      size='large' 
                      sx={{ borderRadius: 0, color: 'rgb(0, 180, 0)'}} 
                      onClick={(e) => completeOne(e, todo)
                      }>
                        <DoneIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="delete" 
                        size='large' 
                        sx={{ borderRadius: 0}} 
                        onClick={(e) => removeOne(e, todo)
                      }>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider sx={{ background: 'black', width: 1 }}></Divider>
                  </div>
                  )
              })
            }
          </List>
        </CardContent>
        <CardActions sx={
          { 
            margin: theme.spacing(), 
            padding: theme.spacing(0), 
            width: 400, 
            alignSelf: 'center',
            justifySelf: 'flex-end'
          }}>
          <TextField 
            id="outlined-controlled" 
            label="Add your note here..." 
            variant="standard" 
            onChange={handleInput} 
            inputRef={todoInput} 
            onKeyDown= {(e) => {addTodoOnEnter(e)}}
            sx={{ 
                  
                  minHeight: 50,
                  width: 1,
                  '& .MuiInputBase-root': {
                    mt: 0,
                  },
                  '& .MuiInputBase-input': {
                    padding: 1,
                    height: 34,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                  },
                  '& .MuiInputLabel-shrink': {
                    color: 'black !important',
                  },
                  '& .MuiFormControl-root': {
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  },
          }}/>
          <Button variant="contained" onClick={(e) => addToDo(e)}
            sx={{
                  minWidth: 50,
                  height: 50,
                  fontSize: 40,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
          }}>+</Button>
        </CardActions>
      </Card>
    </div>
  )
}