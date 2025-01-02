import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip } from 'antd';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiEventHandler } from '@mui/x-data-grid';
import { Menu, MenuItem, } from '@mui/material';
import { TableColumn } from './TableColumn';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useNavigate } from 'react-router-dom';
import { MakeApicallWithoutToken } from '../../../api/MakeApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectDetails } from '../../../store/projectSlice/projectSlice';

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();
    // const r_data = useSelector(state => console.log('Store State', state));
    const [data, setData] = useState([
        {
            id: '1',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '2',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '3',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '4',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '5',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: ' XXXXXXXX',
        },
        {
            id: '6',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '7',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '8',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '9',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
        {
            id: '10',
            franchise: "XYZ, Dummy 1",
            city: "XXXXXXXXX",
            phone: 'XXXXXXXXXX',
            district: "XXXXXXXXX",
            person: 'XXXXXXXX',
        },
    ]);
    const getAllProjects = async () => {
        try {
            setLoading(true);
            const response = await MakeApicallWithoutToken(`project/all`, 'GET');
            // console.log("All Projects", response);
            if (response?.success) {
                const apiData = response?.data.map(data => ({
                    ...data,
                    city: data.address?.city,
                    state: data.address?.state,
                    country: data.address?.country,
                    person: 'Mr. XXXXXX XXXXXXXXX',
                    phone: '+91-XXXXXXXXXX',
                }));
                // console.log('ApiData', apiData);
                setData(apiData);
            }
        } catch (err) {
            console.error('Error making api call', err);
        } finally {
            setLoading(false);
        }
    }
    const dispatch = useDispatch();
    const handleClickEvent = (params) => {
        // console.log(params, "params");
        if (params.field == "projectName") {
            setSelectedRow(params.row);
            navigate('/projects/addproject', {
                state: {
                    isNavigated: true,
                    projectId: params.row.id
                }
            })
            // navigate('/projects/addproject');
            // dispatch(setProjectDetails(params.row.id));        
        }
    }
    useGridApiEventHandler("cellClick", handleClickEvent);
    const allButtons = [
        { name: 'new', tooltipTitle: 'Add Project', style: { width: 65, backgroundColor: '#f7535b' }, icon: <AddOutlinedIcon fontSize='small' />, },
        { name: 'more', tooltipTitle: 'More', style: { backgroundColor: '#f5f5f5' }, icon: <MoreVertOutlinedIcon style={{ fill: 'black' }} />, },
        { name: 'question', tooltipTitle: 'Question', style: { backgroundColor: '#fc8f31' }, icon: <QuestionMarkOutlinedIcon style={{ fill: 'white' }} />, },
    ]
    const handleClickMoreButton = (e) => {
        setAnchorEl(e.currentTarget);
    }
    useEffect(() => {
        getAllProjects();
    }, [])
    return (
        <div className='h-screen w-full'>
            <div className='p-4 flex flex-col gap-4'>
                <div className='px-4 flex justify-between items-center'>
                    <div className='text-2xl font-normal flex justify-between items-center gap-2'>
                        <p>All Projects</p>
                        <KeyboardArrowDownOutlinedIcon fontSize='small'
                            style={{ fill: 'blue', cursor: 'pointer' }}
                            onClick={() => window.alert("Drop")}
                        />
                    </div>
                    <div className='flex justify-between items-center gap-3'>
                        {allButtons.map((btn, index) => (
                            <Tooltip title={btn.tooltipTitle} key={index}>
                                <Button
                                    type='default'
                                    style={btn.style}
                                    onClick={btn.name == 'new' ? () => navigate('/projects/addproject') :
                                        btn.name == 'more' ? handleClickMoreButton : 'handleQuestionButton'
                                    }
                                >
                                    <div className='text-white flex justify-center items-center'>
                                        {btn.icon}
                                        {btn.name == 'new' && <p>New</p>}
                                    </div>
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                </div>
                <Box sx={{ boxShadow: 1, height: 520, width: '100%' }}>
                    <DataGrid
                        columns={TableColumn}
                        rows={data}
                        loading={loading}
                        showColumnVerticalBorder
                        sx={{
                            backgroundColor: "#FFFFFF",
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: '#d9dbe0',
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {

                                fontSize: '14px',
                                fontWeight: 600,
                                color: "#403f3f",
                            },
                            "& .MuiDataGrid-cell": {
                                fontSize: '12px',
                            }
                            // width: "100%"
                        }}
                        pagination={true}
                        // checkboxSelection
                        scrollbarSize={0}
                        onCellClick={handleClickEvent}
                    />
                </Box>
            </div >
            {!!anchorEl && <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={''}><div className='flex gap-1 jusitfy-between items-center'><AcUnitIcon fontSize={'6'} /> More 1</div></MenuItem>
                <MenuItem onClick={''}><div className='flex gap-1 jusitfy-between items-center'><AcUnitIcon fontSize={'6'} /> More 2</div></MenuItem>
                <MenuItem onClick={''}><div className='flex gap-1 jusitfy-between items-center'><AcUnitIcon fontSize={'6'} /> More 3</div></MenuItem>
            </Menu>}
        </div >
    )
}
export default Projects;