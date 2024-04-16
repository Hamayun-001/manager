import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import SideBar from './components/sideBar';
import Tasks from './api/tasks.json';
import { v4 as uuidv4 } from 'uuid';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from 'reactstrap';
import rightChevron from './images/right-chevron.png';

function Task() {
  const [modal, setModal] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [task, setTask] = useState([]);
  const { id } = useParams();

  const toggleModal = () => setModal(!modal);
  const toggleCollapse = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    if (id) {
      const matchedTasks = Tasks.tasks.filter(task => task.projectId === id);
      setTask(prevTasks => [...prevTasks, ...matchedTasks]);
    }
  }, [id]);

  const handleModelChange = useCallback(value => {
    const plainText = value.replace(/<[^>]*>?/gm, '');
    setDescription(plainText);
  }, []);

  const handleDropdownItemClick = useCallback(option => {
    setDropdownOpen(false);
    setSelectedOption(option);
  }, []);

  const completeTask = useCallback(name => {
    setTask(prevTasks =>
      prevTasks.map(task => (task.title === name ? { ...task, status: 'COMPLETED' } : task))
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return task.filter(task => {
      if (selectedOption === 'Completed') {
        return task.status === 'COMPLETED';
      } else if (selectedOption === 'Not Completed') {
        return task.status === 'PENDING';
      }
      return true;
    });
  }, [selectedOption, task]);

  const handleSubmit = () => {
    const tid = uuidv4();
    setTask(prevTasks => [...prevTasks, { _id: tid, title: currentTask, description, status: 'PENDING',projectId:id }]);
    setCurrentTask('');
    setDescription('');
    toggleModal();
  };

  const toggle = id => {
    setOpen(prevOpen => (prevOpen === id ? null : id));
  };

  const [open, setOpen] = useState('1');

  return (
        
    <main>
      <SideBar />
    <div className='text-center p-5 w-100'>
        <h1 className='text-secondary'>TODO LIST</h1>
    <div className="App container mt-5 w-50 shadow pb-5 pt-5 ps-4 pe-4 rounded">
        <div className='d-flex justify-content-between'>
        <div className='text-start'>
          <h5>Companies Tasks</h5>
          <p className='text-secondary'>These are you immediate tasks to complete</p>
        </div>
        <div>
           <p className='text-secondary' style={{ marginBottom: "5px"}}>
            <span className='me-1' style={{color:"#5eb38b"}}>
              {task.filter((task)=> task.status==='PENDING' ).length}  
              </span> 
               / {task.length} Tasks left
            <Button style={{padding: "4px"}} className='bg-transparent text-success border-0' onClick={toggleCollapse} >
                 <img style={{width:"23px",transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",transition:'0.4s ease-in-out'}} src={rightChevron} alt="no-image" />
            </Button>
            </p>
            {/* style={{ position: "absolute" , marginBottom: "1rem", top: "217px",
               right: "505px" 
               }} */}
            
            
            <div>
            <Collapse className='me-2' isOpen={isOpen} > 
                <Progress
                  style={{height:"12px"}}
                  className='shadow'
                  color='secondary'
                  value={(task.length === 0) ? 0 : (task.filter(task => task.status === "COMPLETED").length / task.length) * 100}
                />
            </Collapse>
            </div>
            
            
        </div>

        </div>
        <div className='mt-3 m-auto d-flex justify-content-between'> 
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}> 
        <DropdownToggle className='bg-white shadow-sm rounded-0 text-success ps-3 pe-3' style={{fontWeight:"500",border:"1px solid #bdbdbd"}} caret>
          <span style={{color:"#5eb38b"}}>
          Show All Task
          </span> 
          </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={() => handleDropdownItemClick('All')}>All Task</DropdownItem>
          <DropdownItem onClick={() => handleDropdownItemClick('Completed')}>Completed</DropdownItem>
          <DropdownItem onClick={() => handleDropdownItemClick('Not Completed')}>Not Completed</DropdownItem>
        </DropdownMenu>
      </Dropdown>
           <Button className='border-0 shadow-sm ps-4 pe-4 rounded-0' style={{background:"#5eb38b"}} onClick={toggleModal}>
        + Add a Task
          </Button>

        </div>
       
        <div className='mt-5'>
      <Accordion open={open} onClick={(e)=> e.preventDefault} toggle={toggle}>
        
        {filteredTasks.map((task,index) => (
        <AccordionItem 
          style={{opacity: (task.status === "COMPLETED") ? '0.5' : '1.0'}} 
          className='border-start-0 border-end-0' 
          key={task.title}>
          <AccordionHeader 
            targetId={task.title} 
             onClick={(e) => { e.stopPropagation(); 
              toggle(false); }}>
          <Input
          style={{border:"1px solid #bfb5b5"}} 
          onChange={ () => completeTask(task.title,task._id)} 
          checked={task.status==="COMPLETED"} 
          className='shadow-sm me-3 rounded-circle p-2'
          type="checkbox" />
          <span className='accordion-custom-button'>
          {task.title}
          </span>
          <span style={{position:'absolute',right:5,opacity:0,padding:"15px"}} 
             onClick={(e) => { e.stopPropagation(); toggle(task.title); }} 
             className=' accordion-custom-button'>
          ...........
          </span>
          </AccordionHeader>
          <AccordionBody className='text-start' accordionId={task.title}>
            {task.description}
          </AccordionBody>
        </AccordionItem>
        ))}
        
      </Accordion>
    </div>
       
    <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create Task</ModalHeader>
        <ModalBody>
          <p className='text-secondary'>Name</p>
          <Input
           type="text" 
           value={currentTask}
           onChange={(e) => setCurrentTask(e.target.value)}
          />
          <Label className='mt-3 text-secondary' for="exampleText">
      Description
    </Label>
     <FroalaEditorComponent 
        tag='textarea'
        onModelChange={handleModelChange}
        model={description}
        />
        </ModalBody>
        <ModalFooter>
          <Button className='border-0 shadow' style={{background:"#5eb38b"}} onClick={handleSubmit}>
            Add Task
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    </div>
    </div>
    </main>
  );
}


export default Task;


