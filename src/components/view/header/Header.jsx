import React from 'react';
import {Input, Button, Badge, Avatar} from 'antd';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Header = () => {
    const SerachBarPrefix = () => {
        return (
            <div className='flex justify-start items-center gap-0.5'>
                <SearchRoundedIcon />
                <KeyboardArrowDownOutlinedIcon className='cursor-pointer' fontSize='small' style={{ fill: 'blue' }} />
                <div className='h-6 w-0.5 bg-gray-300 opacity-30'></div>
            </div>
        )
    }
    return (
        <div className='flex flex-col justify-start items-center'>
            <div className='w-full h-14 flex items-center gap-2 bg-green-50'>
                <div className='w-full px-4 flex justify-between items-center '>
                    <div className='w-full flex justify-start items-center gap-6'>
                        <UpdateOutlinedIcon className='cursor-pointer' fontSize='medium' onClick={() => location.reload()} />
                        <Input prefix={<SerachBarPrefix />} style={{ width: '300px',}} placeholder='Search in Customers' />
                    </div>
                    <div className='cursor-pointer text-sm flex justify-evenly items-center gap-6'>
                        <Button
                            size='small'
                            style={{ width: 30, height: 30, backgroundColor: "#fb4f44" }}
                            onClick={""}
                        >
                            <AddIcon fontSize='medium' style={{ fill: 'white' }} />
                        </Button>
                        <PeopleOutlineIcon fontSize='medium' />
                        <EventAvailableOutlinedIcon fontSize='medium' />
                        <NotificationsNoneOutlinedIcon fontSize='medium' />
                        <SettingsOutlinedIcon fontSize='medium' />
                        <Badge count={1}>
                            <Avatar style={{ backgroundColor: '#f56a00' }} size='xs' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" alt={<PersonIcon />} />
                        </Badge>
                        <AppsOutlinedIcon fontSize='medium' />
                    </div>
                </div>
            </div>                
        </div>
    )
}
export default Header;
