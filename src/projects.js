import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import rightChevron from './images/right-chevron.png'; // Relative path to the image file
import FroalaEditorComponent from 'react-froala-wysiwyg';
import SideBar from './components/sideBar';
import projects from "./api/projects.json";
import Row from "./Row";
import ProjectListTable from "./ProjectsListTable";


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
  Table
} from 'reactstrap';


function Project() {
  const [Listcomponent, setListcomponent] = useState(null);

  const numberOfRows = 5;

  const renderedRows = [...Array(numberOfRows)].map((e, i) => (
    <div>
      <Row/>
    </div>
  ));
  
  useEffect(()=>{
         setListcomponent(renderedRows);  
  },[])

  setTimeout(() => {
     setListcomponent(<ProjectListTable projects={projects} />);
  }, 2000);
  

  return (        
    <main>
      <SideBar />
      <div className='ms-4 w-100'>  
        <h2 className='mt-4'>
            Projects
        </h2>
        {Listcomponent}  
      </div>
    </main>
  );
}


export default Project;


