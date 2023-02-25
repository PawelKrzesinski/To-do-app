
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardActions, Divider, ListItem, List, ListItemText, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './page.component.css'
import { createTheme } from "@mui/material/styles";


export default function MainPage() {

  const [todosState, setTodosState] = useState({
    todo: '',
    todosArr: [],
    isAdded: false
  })



  // const [todosState, setTodosState] = useState([])
  // const [isTodoAdded, setIsTodoAdded] = useState(false)
  const todoInput = useRef();

  useEffect(() => {
    if(!todosState.isAdded) return;
    const addTodo = (e) => {
      setTodosState({...todosState, todosArr: [...todosState.todosArr, todosState.todo], isAdded: false})
      clearInput();
    }
    addTodo();
  },[todosState])


  const handleInput = (e) => {
    setTodosState({...todosState, todo: e.target.value})
  }

  const addToDo = (e) => {
    e.preventDefault();
    setTodosState({...todosState, isAdded: true})
  }

  const theme = createTheme({
    spacing:  [0, 4, 8, 12, 16, 20, 24, 28, 32],
  })

  const clearInput = () => {
    todoInput.current.value = '';
  }






  return (
    <div className="content">
      <Card sx={{ minWidth: 450, maxWidth: 450, height: 850, backgroundColor:"rgb(175, 175, 175)", display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 5 }}>
        <CardContent sx={{ backgroundColor: 'white', mt: 2, alignSelf: 'center', minWidth: 400, '& .MuiList-root': { mx: 0}}}>
          <Typography sx={{ textAlign:'center', background: 'white' }} variant='h4'>Today Tasks</Typography>
          {/* <Divider sx={{ background: 'white', minWidth: 400}}>
            <Divider sx={{ background: 'gray', minWidth: 300, maxWidth: '80%', mx: 'auto' }}></Divider>
          </Divider> */}
          <List sx={{ backgroundColor: 'gainsboro', minWidth: 350, minHeight: 650, overflow: 'scroll', border: '1px solid gray' }} className='todos-list'>
            {
              todosState.todosArr.map((x, index) => {
                return (
                  <div>
                    <ListItem key={index}>
                      <ListItemText primary={x} sx={{  }}></ListItemText>
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