/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import AppBar from '../../components/AppBar'
import NestedListItem from '../../components/NestedListItem'
import axios from '../../utils/axios-order'
import CustomizedSnackbars from '../../components/CustomizedSnackbars'

function Task() {
  const [data, setData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    isDone: false,
    subTasks: []
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'warn',
  });
  useEffect(() => {
    axios.get('/task/getTasks').then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data.data);
      } else {
        setAlert({
          show: true,
          message: 'error while loading data',
          severity: 'warning',
        })
      }
    }).catch((e) => {
      setAlert({
        show: true,
        message: e.message,
        severity: 'error',
      })

    })
  }, []);
  const singleTaskChangeHandler = async (task) => {
    try {
      const response = await axios.post('/task/update', task);
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        setAlert({
          show: true,
          message: 'error while updating data',
          severity: 'warning',
        })
      }
    } catch (err) {
      setAlert({
        show: true,
        message: err.message,
        severity: 'error',
      })

    }
  }
  const deleteATaskHandler = async (id) => {
    try {
      if (id !== "") {
        const response = await axios.post('/task/delete', { id: id });
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setAlert({
            show: true,
            message: 'error while deleting data',
            severity: 'warning',
          })
        }
      }
    } catch (err) {
      setAlert({
        show: true,
        message: err.message,
        severity: 'error',
      })

    }

  }
  
  const addTaskChangeHandler = (event) => {
    event.preventDefault();
    setNewTask({
      ...newTask,
      taskName: event.target.value,
    })

  }
  const addTaskSubmitHandler = async () => {
    try {
      if (newTask.taskName !== '') {
        const response = await axios.post('/task/create', newTask);
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setAlert({
            show: true,
            message: 'error while loading data',
            severity: 'warning',
          })
        }
      } else {
        setAlert({
          show: true,
          message: 'please enter task name before submitting',
          severity: 'warning',
        })
      }
    } catch (e) {
      setAlert({
        show: true,
        message: e.message,
        severity: 'error',
      })
    } finally {
      setNewTask({
        taskName: '',
        isDone: false,
        subTasks: [],
      });
      setAddTask(false);
    }
  }
  return (
    <div>
      <AppBar />
      <CustomizedSnackbars alert={alert} setAlert={setAlert} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px auto' }}>
        {
          data.map(
            (task, key) => {
              return < NestedListItem
                keys={key}
                task={task}
                singleTaskChangeHandler={singleTaskChangeHandler}
                deleteATaskHandler={deleteATaskHandler}
                setAlert={setAlert}
              />
            }
          )
        }
        {addTask ?
          <ListItemButton sx={{ pl: 4 }}>
            <TextField value={newTask.taskName} onChange={addTaskChangeHandler} label="Task Name" variant="standard" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%' }} />
            <SendIcon onClick={addTaskSubmitHandler} />
          </ListItemButton>
          :
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon style={{ alignItems: 'center' }} onClick={() => setAddTask(true)}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Task" onClick={() => setAddTask(true)} />
          </ListItemButton>
        }
      </div>
    </div>
  )
}

export default Task