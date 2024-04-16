import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import rightChevron from './images/right-chevron.png'; // Relative path to the image file
import FroalaEditorComponent from 'react-froala-wysiwyg';
import SideBar from './components/sideBar';
import { Link } from 'react-router-dom';



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


function ProjectListTable(props) {

    return (
        <Table
            responsive
            hover
            className='mt-5'>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.projects.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">
                            {index + 1}
                        </th>
                        <td>
                            <Link className='text-dark text-decoration-none' to={`/projects/${item._id}`}>
                                {item.title}
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}


export default ProjectListTable;


