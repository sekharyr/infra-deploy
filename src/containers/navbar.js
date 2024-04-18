import { UserOutlined, SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';
import React from 'react';
import { Avatar, Button, Menu } from 'antd';
import MenuBar from '../components/individual/menubar';
import './navbar.css'

const NavBar = () => {
    return(
        <div className='NavBar'>
            <div className='LeftNavBar'>
                <MenuBar/>
                <Button icon={<PlusCircleOutlined />}>
                    Create
                </Button>
            </div>
            <div className='RightNavBar'>
                <Avatar style={{
        backgroundColor: '#fde3cf',
        color: '#f56a00',
        marginTop: 2
      }}size={40}>SD</Avatar>
            </div>
        </div>
    )
}

export default NavBar;