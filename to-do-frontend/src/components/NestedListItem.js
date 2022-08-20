import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function NestedListItem(props) {
  const [open, setOpen] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [newSubTask, setNewSubTask] = React.useState({
    isDone: false,
    name: '',
  });

  const { keys, singleTaskChangeHandler, deleteATaskHandler, task, setAlert } = props;

  const [taskDetail, setTaskDetail] = React.useState(task)

  const handleClick = () => {
    setOpen(!open);
  };
  const handleTaskCheck = () => {
    if (edit) {
      const tempSubTasks = taskDetail.subTasks.map((t) => { return { ...t, isDone: !taskDetail.isDone } })
      setTaskDetail({
        ...taskDetail,
        isDone: !taskDetail.isDone,
        subTasks: tempSubTasks,
      })
    } else {
      setAlert({
        show: true,
        message: 'press edit before start editing',
        severity: 'warning',
      })
    }
  }

  const deleteTaskHandler = async (id) => {
    await deleteATaskHandler(id);
  }

  const handleSubTaskCheck = (index) => {
    if (edit) {
      let temp = [...taskDetail.subTasks];
      temp[index] = { ...temp[index], isDone: !temp[index].isDone }
      const check = handleSubTaskAndMainTaskRelation(temp);
      setTaskDetail({
        ...taskDetail,
        isDone: check,
        subTasks: temp
      })
    } else {
      setAlert({
        show: true,
        message: 'press edit before start editing',
        severity: 'warning',
      })
    }
  }

  const handleSubTaskAndMainTaskRelation = (subTasks) => {
    let isAllSubtaskDone = true;
    subTasks.forEach((t) => {
      if (!t.isDone) {
        isAllSubtaskDone = false;
      }
    });
    return isAllSubtaskDone;
  }

  const editButtonClickHandler = () => {
    setEdit(true);
  }
  const changeSubmitHandler = async () => {
    await singleTaskChangeHandler(taskDetail)
    setEdit(false);
  }
  const addSubTaskChangeHandler = (event) => {
    event.preventDefault();
    setNewSubTask({
      isDone: false,
      name: event.target.value
    });
  }
  const addSubTaskSubmitHandler = async () => {
    if (newSubTask.name === '') {
      return
    }
    const temp = taskDetail.subTasks;
    temp.push(newSubTask);
    setTaskDetail({
      ...taskDetail,
      subTasks: temp,
    })
    await singleTaskChangeHandler(taskDetail);
    setNewSubTask({
      isDone: false,
      name: "",
    });
    setAdd(false);
    setTaskDetail({ ...taskDetail, isDone: false })
  }
  const deleteSubTaskHandler = async (index) => {
    let temp = [...taskDetail.subTasks];
    temp.splice(index, 1);
    setTaskDetail({
      ...taskDetail,
      subTasks: temp
    });
  }
  const handleSubTaskTextChange = (event, index) => {
    event.preventDefault();
    let temp = [...taskDetail.subTasks];
    temp[index] = { ...temp[index], name: event.target.value }
    setTaskDetail({
      ...taskDetail,
      subTasks: temp
    });
  }
  const handleTaskTextChange = (event) => {
    event.preventDefault();
    setTaskDetail({
      ...taskDetail,
      taskName: event.target.value
    });
  }


  return (
    <List
      sx={{ width: '100%', maxWidth: 560, margin: '10px', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Task no {parseInt(keys, 10) + 1}
        </ListSubheader>
      }
    >
      {
        edit ? <ListItemButton >
          <ListItemIcon>
            <Checkbox {...label} checked={taskDetail.isDone} onChange={handleTaskCheck} />
          </ListItemIcon>
          <TextField value={taskDetail.taskName} onChange={e => handleTaskTextChange(e)} variant="standard" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%' }} />
          <SendIcon
            style={{ width: '30px', marginLeft: '15px', marginRight: '15px' }}
            onClick={changeSubmitHandler} />
          <DeleteIcon id={taskDetail._id} onClick={e => deleteTaskHandler(taskDetail._id)} />
          <div style={{ width: '30px', marginLeft: '15px', marginRight: '15px' }} onClick={handleClick}> {open ? <ExpandLess /> : <ExpandMore />}</div>
        </ListItemButton> :
          <ListItemButton >
            <ListItemIcon>
              <Checkbox {...label} checked={taskDetail.isDone} onChange={handleTaskCheck} />
            </ListItemIcon>
            <ListItemText primary={taskDetail.taskName} />
            < EditIcon
              style={{ width: '30px', marginLeft: '15px', marginRight: '15px' }}
              onClick={editButtonClickHandler} />
            <div style={{ width: '30px', marginLeft: '15px', marginRight: '15px' }} onClick={handleClick}> {open ? <ExpandLess /> : <ExpandMore />}</div>
          </ListItemButton>
      }
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            taskDetail.subTasks.map((t, index) => {
              return !edit ?
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox  {...label} checked={t.isDone} onClick={e => handleSubTaskCheck(index)} />
                  </ListItemIcon>
                  <ListItemText primary={t.name} />
                </ListItemButton>
                :
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox  {...label} checked={t.isDone} onClick={e => handleSubTaskCheck(index)} />
                  </ListItemIcon>
                  <TextField value={t.name} onChange={e => handleSubTaskTextChange(e, index)} variant="standard" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%' }} />
                  <DeleteIcon id={t._id} onClick={e => deleteSubTaskHandler(index)} />
                </ListItemButton>
            })
          }
          {!add ? <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon style={{ alignItems: 'center' }}>
              <AddIcon onClick={() => setAdd(true)} />
            </ListItemIcon>
            <ListItemText primary="Add Subtask" onClick={() => setAdd(true)} />
          </ListItemButton>
            :
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
              </ListItemIcon>
              <TextField value={newSubTask.name} onChange={addSubTaskChangeHandler} variant="standard" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%' }} />
              <SendIcon onClick={addSubTaskSubmitHandler} />
            </ListItemButton>
          }
        </List>
      </Collapse>
    </List>
  );
}
