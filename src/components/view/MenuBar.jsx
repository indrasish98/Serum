import React, { useState } from 'react';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Man4OutlinedIcon from '@mui/icons-material/Man4Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Button, Menu, Avatar, Image } from 'antd';
import { useNavigate } from "react-router-dom";

const DemoMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleClick = (e) => {
        // console.log("Log", e);
        navigate(e.key)
    }
    const items = [
        // {
        //     key: '0',
        //     icon: <div className={`pointer ${collapsed ? 'rotate-0' : 'rotate-180'}`}>
        //         <ArrowForwardIosOutlinedIcon fontSize='medium' onClick={toggleCollapsed} />
        //         </div>,
        //     // label: <div className='text-2xl'>Serum</div>,
        //     // style: { pointerEvents: 'none' }
        // },
        {
            key: '0',
            icon: <div><StorefrontOutlinedIcon fontSize='small' /></div>,
            label: <div className='text-2xl'>Serum</div>,
            style: { pointerEvents: 'none' }
        },
        {
            key: '/',
            icon: <GridViewOutlinedIcon />,
            label: 'Dashboard',
            onClick: (e) => {
                handleClick(e);
            }
        },
        {
            key: '2',
            icon: <MilitaryTechOutlinedIcon fontSize='large' />,
            label: 'Project',
            children: [
                {
                    key: "/projects",
                    icon: <AddCircleOutlineOutlinedIcon />,
                    label: 'Project',                    
                    onClick: (e) => {
                        handleClick(e);
                    }
                },
                {
                    key: "sub2",
                    icon: <ShoppingCartOutlinedIcon />,
                    label: 'Order Details',
                    onClick: (e) => {
                        // handleClick(e);
                    }
                },
                {
                    key: "sub3",
                    icon: <Man4OutlinedIcon />,
                    label: 'New Phlebotomist',                    
                    onClick: (e) => {
                        // handleClick(e);
                    }
                },
                {
                    key: "sub4",
                    icon: <LocalAtmOutlinedIcon />,
                    label: 'Financials',
                    onClick: (e) => {
                        // handleClick(e);
                    }
                }
            ],
            type: "divider",
        },
        {
            key: '/tests',
            icon: <ScienceOutlinedIcon fontSize='large' />,
            label: 'Tests',
            onClick: (e) => {
                handleClick(e);
            }
        },
        {
            key: '4',
            label: 'Daily Collections',
            icon: <ShowChartIcon />,
            onClick: (e) => {
                // handleClick(e);
            }
        },
        {
            key: '5',
            label: 'Transaction List',
            icon: <AccountBalanceOutlinedIcon />,
            onClick: (e) => {
                // handleClick(e);
            }
        },
        {
            key: '6',
            icon: <LocalShippingOutlinedIcon />,
            label: 'Delivery Reports',
            onClick: (e) => {
                // handleClick(e);
            }
        },
        {
            key: '7',
            icon: <GroupOutlinedIcon />,
            label: 'Customer List',
            onClick: (e) => {
                // handleClick(e);
            }
        },
        {
            key: '8',
            icon: <SettingsOutlinedIcon />,
            label: 'Settings',
            children: [
                {
                    key: "set1",
                    icon: <AddCircleOutlineOutlinedIcon />,
                    label: 'User Management',
                    onClick: (e) => {
                        // handleClick(e);
                    }
                },
                {
                    key: "set2",
                    icon: <ShoppingCartOutlinedIcon />,
                    label: 'Roles',
                    onClick: (e) => {
                        // handleClick(e);
                    }
                },
                {
                    key: "set3",
                    icon: <Man4OutlinedIcon />,
                    label: 'Logo',
                    onClick: (e) => {
                        // handleClick(e);
                    }
                },
            ],
            type: "divider",
        },
    ];

    const handleMouseEnter = () => {
        setCollapsed(false);
    }
    const handleMouseLeave = () => {
        setCollapsed(true);
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='menubar h-full overflow-y-scroll'
        >
            {/* <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 5,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                className='flex flex-col gap-6'
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />            
        </div>
    );
};
export default DemoMenuBar;