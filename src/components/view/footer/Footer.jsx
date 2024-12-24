import React from 'react';
import { Input, Button } from 'antd';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Footer = () => {
    return (
        <div className='footer w-full h-8 flex gap-2 justify-between items-center bg-gray-50 overflow-x-hidden'>
            <div className='p-2 h-fit flex gap-4 justify-start items-center'>
                <div className='flex flex-col justify-between items-center cursor-pointer'>
                    <ChatBubbleOutlineIcon style={{fontSize: 12, fill: '#999896'}} />
                    <p className='text-xs text-gray-500'>Chats</p>
                </div>
                <div className='flex flex-col justify-between items-center cursor-pointer'>
                    <GroupsOutlinedIcon style={{fontSize: 12, fill: '#999896'}} />
                    <p className='text-xs text-gray-500'>Channels</p>
                </div>
                <div className='flex flex-col justify-between items-center cursor-pointer'>
                    <PersonIcon style={{fontSize: 12, fill: '#999896'}} />
                    <p className='text-xs text-gray-500'>Contacts</p>
                </div>
                <div className='h-8 w-0.5 bg-gray-300 opacity-200'></div>
            </div>
            <div className='w-full h-fit flex gap-4 justify-between items-center'>
                <div>
                    <Input variant='borderless' placeholder='Here Is Smart Chat' style={{ width: 800 }} />
                </div>
                <div className='flex justify-between items-center gap-1'>
                    <Button
                        type='priamry'
                        style={{ backgroundColor: '#268ddd' }}
                    >
                        <SupportAgentOutlinedIcon style={{fontSize: 20, fill: 'black'}} />
                        <p className='text-md'>Contact Support</p>
                    </Button>
                    <SearchOutlinedIcon fontSize='medium' className='cursor-pointer' />
                </div>

            </div>
        </div>
    )
}
export default Footer;
