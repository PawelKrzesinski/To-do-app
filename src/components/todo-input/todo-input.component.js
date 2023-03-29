import { Button, CardActions, TextField } from "@mui/material";


export default function TodoInput(props) {

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
        padding: 0, 
        width: 400, 
        alignSelf: 'center',
        justifySelf: 'flex-end'
      }}>
      <TextField 
        id="outlined-controlled" 
        label="Add your note here..." 
        variant="standard" 
        onChange={handleInput} 
        inputRef={props.todoInput} 
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
  )
}