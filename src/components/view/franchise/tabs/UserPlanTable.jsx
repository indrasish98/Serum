import React, { useEffect, useState } from 'react';
import { Table, Tooltip, Button, Modal, Form, Input } from 'antd';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertBar from '../../snackbar/AlertBar';
import UndoIcon from '@mui/icons-material/Undo';

const UserPlanTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editingField, setEditingField] = useState({});
    const [allDetails, setAllDetails] = useState({
        plan: '',
        stage: '',
        charge: ''
    });
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    });
    const navigate = useNavigate();
    const column = [
        {
            title: "SL.No",
            dataIndex: "key",
            key: "key",
            width: 20,
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Stage',
            dataIndex: 'stage',
            key: 'stage',
            width: 250,
            align: "left",
        },
        {
            title: 'Charge',
            dataIndex: 'charge',
            key: 'charge',
            width: 250,
            align: "left",
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            align: "center",
            render: (record) => (
                <>
                    {/* {console.log(record)} */}
                    <div className='flex gap-2 justify-center items-center'>
                        <Tooltip title='Edit'>
                            <EditIcon style={{ fontSize: 20, fill: 'green' }} className='cursor-pointer'
                                onClick={() => handleEdit(record)}
                            />
                        </Tooltip>
                        <Tooltip title='Delete'>
                            <DeleteIcon style={{ fontSize: 20, fill: 'red' }} className='cursor-pointer'
                                onClick={() => handleDelete(record)}
                            />
                        </Tooltip>
                    </div>
                    {/* <Tooltip title='Configure'>
                             <SettingsIcon className='cursor-pointer' fontSize='small'
                                 onClick={() => handleConfigure(record)} style={{ fill: 'green' }}
                             />
                        </Tooltip> */}
                </>
            )
        },
    ];
    const [dataSource, setDataSource] = useState();
    const location = useLocation();
    const data = location?.state?.data;
    const name = location?.state?.name;

    const handleEdit = (record) => {
        // console.log("Record", record)
        setEditingField(record);
        setIsOpen(true);
        setIsEditing(true);
        setAllDetails({
            // plan: record.plan,
            stage: record.stage,
            charge: record.charge,
        });
        // form.validateFields();
    }
    const handleDelete = (record) => {
        setEditingField(record);
        setOpenDeleteModal(true);
    }
    const handleDeleteConfirmation = () => {
        setDataSource(dataSource.filter(data => data.key != editingField.key));
        setOpenDeleteModal(false);
        setEditingField(null);
        setAlert({
            ...alert,
            open: true,
            message: 'Plan Deleted Successfully',
            severity: 'success'
        })
    }
    const handleChange = (e, name) => {
        // console.log("@@", allDetails)
        setAllDetails(prevdata => ({
            ...prevdata,
            [name]: e.target.value
        }));
    }
    const handleCloseModal = () => {
        setIsOpen(false);
        setIsEditing(false);
        setEditingField(null);
        setAllDetails({
            // id: '',
            // plan: '',
            stage: '',
            charge: ''
        });
    };
    const handleSubmit = () => {
        isEditing ?
            setDataSource(dataSource.map(data => (
                data.key == editingField.key ?
                    {
                        ...data,
                        stage: allDetails.stage,
                        charge: allDetails.charge,
                        key: dataSource.length + 1
                    }
                    : data
            ))) : setDataSource([...dataSource, { ...allDetails, key: dataSource.length + 1 }])
        handleCloseModal();
        setAlert({
            ...alert,
            open: true,
            message: `Plan Edited Successfully`,
            severity: 'success'
        })
    }
    const validateMessages = {
        required: "${label} is required!"
    };
    const onFinish = (values) => {
        // console.log('Finished', values);
        handleSubmit();
        handleCloseModal();
    }
    const onFinishFailed = (error) => {
        // console.log('Failed', error);
        setAlert({
            ...alert,
            open: true,
            message: `Plan Edited Filed, Check All Fields`,
            severity: 'error'
        })
    };
    const handleCloseAlertBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    useEffect(() => {
        setDataSource(data);
    }, []);
    // useEffect(() => {
    //     console.log("Datasource", dataSource);
    // }, [dataSource]);
    return (
        <div className='flex flex-col gap-4 justify-center'>
            <AlertBar
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlertBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <p className='mt-6 flex justify-center text-2xl'>Plans For {name} </p>
            <hr />
            <div className='px-8 flex flex-col gap-2 justify-center'>
                <div className='flex justify-end items-end'>
                    <Tooltip title='Add New Plan'>
                        <Button
                            type='primary'
                            onClick={() => setIsOpen(true)}
                        >
                            Add New
                        </Button>
                    </Tooltip>
                </div>
                <Box sx={{ boxShadow: 3, width: '100%' }}>
                    <Table
                        className='w-full'
                        columns={column}
                        dataSource={dataSource}
                        rowKey={record => record.id}
                        bordered
                    />
                </Box>
            </div>
            <div className='flex justify-center'>
                <Button
                    type='primary'
                    onClick={() => navigate('/projects/addproject', { state: { tab: '7' } })}
                >
                    <UndoIcon fontSize='small' />Go Back
                </Button>
            </div>
            {isOpen && <Modal
                open={isOpen}
                onCancel={handleCloseModal}
                title={isEditing ? 'Edit Payment Plan' : 'Configure New Payment Plan'}
                footer={null}
            >
                <Form
                    // form={form}
                    layout="horizontal"
                    labelAlign='left'
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{ marginTop: 20 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label='Stage'
                        name='Stage'
                        rules={[
                            { required: true, message: `Stage is required` },
                        ]}
                        initialValue={allDetails.stage}
                    >
                        {isEditing ? <Input
                            placeholder='Enter Details'
                            onChange={(e) => handleChange(e, 'stage')}
                        // defaultValue={editingField.stage}
                        />
                            : <Input
                                placeholder='Enter Details'
                                onChange={(e) => handleChange(e, 'stage')}
                                defaultValue=''
                            />
                        }
                    </Form.Item>
                    <Form.Item
                        label='Charge'
                        name='Charge'
                        rules={[
                            { required: true, message: `Charge is required` },
                        ]}
                        initialValue={allDetails.charge}
                    >
                        {isEditing ? <Input
                            placeholder='Enter Details'
                            onChange={(e) => handleChange(e, 'charge')}
                        // defaultValue={editingField.charge}
                        />
                            : <Input
                                placeholder='Enter Details'
                                onChange={(e) => handleChange(e, 'charge')}
                                defaultValue=''
                            />
                        }
                    </Form.Item>
                    <div className='flex gap-2 justify-end items-end'>
                        <Form.Item>
                            <Button key="back" onClick={handleCloseModal}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
            }
            {openDeleteModal && <Modal
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                title='Are you sure you want to delete this plan?'
                footer={[
                    <Button key="back" onClick={() => setOpenDeleteModal(false)}>
                        Cancel
                    </Button>,
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#f7535b' }}
                        key="submit"
                        onClick={handleDeleteConfirmation}
                    >
                        Delete
                    </Button>,
                ]}
            >
            </Modal>
            }
        </div>
    )
}
export default UserPlanTable;