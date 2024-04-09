import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import rightChevron from './images/right-chevron.png'; // Relative path to the image file
import FroalaEditorComponent from 'react-froala-wysiwyg';
import SideBar from './components/sideBar';


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


function App() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const [currentTask,setCurrentTask] = useState('');
  const [description,setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => prevState = !prevState);

  let count = 1
  const [task,setTask] = useState([
    {id:1,
      name:"First",
      detail:"You can modify any of this with custom CSS or overriding our defaultvariables. It&#39;s also worth noting that just about any HTML cango within the  though the transitio ndoes limit overflow.",
      complete:true
    },
    {id:2,
      name:"Second",
      detail:"You can modify any of this with custom CSS or overriding our defaultvariables. It&#39;s also worth noting that just about any HTML cango within the  though the transitio ndoes limit overflow.",
      complete:true
    }
  ]);
  
  // Assuming `task` is defined elsewhere in your code
localStorage.setItem('tasks', JSON.stringify(task));

  const handleSubmit = () => {
  let  tid = Math.random();    
  setTask([...task, {id:tid,name: currentTask, detail: description, complete: false}]);
  setCurrentTask('');
  setDescription('');
  toggleModal();
  }


  const handleModelChange = (value) => {
    // Extract text from HTML
    const plainText = value.replace(/<[^>]*>?/gm, '');
    setDescription(plainText);
};  

  const handleDropdownItemClick = (option) => {
    setDropdownOpen((prevState) => false);
    console.log(setDropdownOpen);
    setSelectedOption(option);
  };

   const completeTask = (name,id) =>{
      console.log(name);
       task.map((task)=>{ 
          if(task.name === name)
          {
            task.complete = !task.complete;
          }   
      })
      console.log(task);
   }

  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const filteredTasks = task.filter(task => {
    if (selectedOption === 'Completed') {
      return task.complete;
    } else if (selectedOption === 'Not Completed') {
      return !task.complete;
    }
    return true;
  });

  return (
        
    <main>
      <SideBar />
    <div className='text-center p-5'>
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
              {task.filter((task)=> !task.complete ).length}  
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
                  value={(task.length === 0) ? 0 : (task.filter(task => task.complete).length / task.length) * 100}
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
          style={{opacity: (task.complete) ? '0.5' : '1.0'}} 
          className='border-start-0 border-end-0' 
          key={task.name}>
          <AccordionHeader 
            targetId={task.name} 
             onClick={(e) => { e.stopPropagation(); 
              toggle(false); }}>
          <Input
          style={{border:"1px solid #bfb5b5"}} 
          onChange={ () => completeTask(task.name,task.id)} 
          checked={task.complete} 
          className='shadow-sm me-3 rounded-circle p-2'
          type="checkbox" />
          <span className='accordion-custom-button'>
          {task.name}
          </span>
          <span style={{position:'absolute',right:5,opacity:0,padding:"15px"}} 
             onClick={(e) => { e.stopPropagation(); toggle(task.name); }} 
             className=' accordion-custom-button'>
          ...........
          </span>
          </AccordionHeader>
          <AccordionBody className='text-start' accordionId={task.name}>
            {task.detail}
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


export default App;


