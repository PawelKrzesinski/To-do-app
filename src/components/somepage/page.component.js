
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardActions, Divider, ListItem, List, ListItemText, Typography, Icon } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './page.component.css'
import { createTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';


export default function MainPage() {

  const todosInitialState = {
    todo: {
      name: '',
      id: 0,
    },
    todosArr: [],
    isAdded: false
  }
  const [todosState, setTodosState] = useState(todosInitialState)
  const todoInput = useRef();
  const [cleaned, setCleaned] = useState(true)

  useEffect(() => {
    console.log('1. hook triggered')
    if(!todosState.isAdded) return;
    const addTodo = (e) => {
      setTodosState({...todosState, todosArr: 
        [...todosState.todosArr, 
          { name: todosState.todo.name,
            id: uuidv4()
          }
        ], 
        isAdded: false})
        setCleaned(false)
    }
    const clearInput = () => {
      console.log(!cleaned, 'derp')
      if(!cleaned)
      setTodosState({...todosState, todo: { name: '' }, isAdded: false})
      todoInput.current.value = '';
      setCleaned(true)
    }
    addTodo();
    clearInput();
  },[todosState, cleaned])


  const handleInput = (e) => {
    setTodosState({...todosState, todo: {name: e.target.value }})
  }

  const addToDo = (e) => {
    e.preventDefault();
    setTodosState({...todosState, isAdded: true}) 
  }

  const theme = createTheme({
    spacing:  [0, 4, 8, 12, 16, 20, 24, 28, 32],
  })








  return (
    <div className="content">
      <Card sx={{ minWidth: 450, maxWidth: 450, height: 850, backgroundColor:"rgb(200, 200, 200)", display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 5}}>
        <CardContent sx={{ backgroundColor: 'white', mt: 3, alignSelf: 'center', minWidth: 400, '& .MuiList-root': { mx: 0}}}>
          <Typography sx={{ textAlign:'center', background: 'white' }} variant='h4'>Today Tasks</Typography>
          <List sx={{ backgroundColor: 'gainsboro', minWidth: 350, minHeight: 650, overflow: 'scroll', border: '1px solid gray', pt: 0 }} className='todos-list'>
            {
              todosState.todosArr.map((x, index) => {
                return (
                  <div key={index}>
                    <ListItem sx={{p: 0 }}>
                      <ListItemText primary={x.name} sx={{p: 1, my: '5px', minHeight: 34,}}></ListItemText>
                      {/* <Button variant="outlined" startIcon={<DeleteIcon />}></Button> */}
                      <IconButton aria-label="delete" size='large' sx={{ borderRadius: 0}} >
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
        <CardActions sx={{ margin: theme.spacing(2)}}>
          <TextField id="outlined-basic" label="Add your note here..." variant="standard" fullWidth={true} onChange={handleInput} inputRef={todoInput}
            sx={{ 
                  marginLeft: 1,
                  minHeight: 50,
                  boxShadow: 1,
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
                  marginRight: 1,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
          }}>+</Button>
        </CardActions>
      </Card>
    </div>
  )
}