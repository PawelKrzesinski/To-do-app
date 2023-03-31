import { Button, CardActions, TextField } from "@mui/material";
import * as themeProvider from '../theme-provider.component';

export default function TodoInput(props) {
  const themes = themeProvider.spacing;
  const handleInput = (e) => {
    props.setTodosState({...props.todosState, todo: {name: e.target.value }})
  }

  const addToDo = (e) => {
    e.preventDefault();
    props.setTodosState({...props.todosState, isAdded: true}) 
  }
  
  const addTodoOnEnter = (e) => {
      if(e.key === 'Enter') {
      addToDo(e)
    }
  }

  return (
    <CardActions sx={
      { 
        padding: themes.spacing(5), 
        width: 1,
        backgroundColor: '#1f1f1f',
        mt: '16px',
        position: 'fixed',
        bottom: 0,
      }}>
      <TextField 
        id="outlined-controlled" 
        label="Add your note here..." 
        variant="standard" 
        inputProps={{ maxLength: 50 }}
        onChange={handleInput} 
        inputRef={props.todoInput} 
        onKeyDown= {(e) => {addTodoOnEnter(e)}}
        autoComplete="off"
        sx={
          { 
            minHeight: 50,
            width: 1,
            '& .MuiInputBase-root': {
              mt: 0,
            },
            '& .MuiInputBase-input': {
              padding: 1,
              height: 34,
              backgroundColor: '#50555c',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
            '& .MuiInputLabel-shrink': {
              color: 'white !important',
            },
            '& .MuiFormControl-root': {
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
          }
          }/>
      <Button variant="contained" onClick={(e) => addToDo(e)}
        sx={{
              minWidth: 50,
              height: 50,
              fontSize: 40,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
      }}>+</Button>
    </CardActions>
  )
}