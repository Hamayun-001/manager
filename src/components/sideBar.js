import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState } from 'react';


function SideBar() {
    return (
    <Sidebar style={{position:"fixed",height:"100%"}} backgroundColor='rgb(94, 179, 139)' >
        <Menu
        style={{padding:"20px",color:"white"}}
        menuItemStyles={{
            button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                    backgroundColor: '#13395e',
                    color: '#b6c8d9',
                },
            },
            '&:hover': {
                backgroundColor: "black",
                color: "black",
            },
          }}>
            <h1 className='text-light'>TODO LIST</h1>
            <MenuItem> Projects </MenuItem>
            <MenuItem> Tasks </MenuItem>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
    </Sidebar>
    );
}

export default SideBar;

