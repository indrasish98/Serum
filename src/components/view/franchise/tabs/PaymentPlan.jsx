import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tooltip } from 'antd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { useForm } from 'antd/es/form/Form';
import AlertBar from '../../snackbar/AlertBar';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const PaymentPlan = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editingField, setEditingField] = useState({});
    const [allDetails, setAllDetails] = useState({
        // id: '',
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
    const [form] = useForm();




    ///////// Drastic Changes Sudden Occur => From Here
    const [exDataSource, setExDataSource] = useState([
        {
            key: 1,
            stage: 'Booking',
            charge: '10% BSP',
        },
        {
            key: 2,
            stage: 'Within 45 Days Of Booking',
            charge: '10% BSP',
        },
        // {
        //     key: 3,
        //     stage: 'Commencement of Excavation',
        //     charge: '7.5% BSP + 10% PLC + 50% EDC',
        // },
        // {
        //     key: 4,
        //     stage: 'Casting of Basement roof slab',
        //     charge: '7.5% BSP + 10% PLC + 50% EDC',
        // },
    ]);
    /////////////// To Here



    const handleNavigateRoute = (params) => {
        navigate('/projects/addproject/userplantable', {
            state: {
                name: params.plan,
                data: exDataSource
            }
        })
    }
    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            plan: 'Plan A',
            // stage: 'Booking',
            // charge: '10% BSP',
            // configured: true,
            createdOn: '2024-12-18 10:39:45',
            createdBy: '2024-12-18 10:39:45',
            data: exDataSource,
        },
        // {
        //     key: 2,
        //     plan: 'Payment Plan for B',
        //     stage: 'Within 45 Days Of Booking',
        //     charge: '10% BSP',
        //     configured: true,
        //     createdOn: '2024-12-18 10:39:45',
        //     createdBy: '2024-12-18 10:39:45',
        // },
        // {
        //     key: 3,
        //     plan: 'Payment Plan for C',
        //     stage: 'Commencement of Excavation',
        //     charge: '7.5% BSP + 10% PLC + 50% EDC',
        //     configured: true,
        //     createdOn: '2024-12-18 10:39:45',
        //     createdBy: '2024-12-18 10:39:45',
        // },
        // {
        //     key: 4,
        //     plan: 'Payment Plan for D',
        //     stage: 'Casting of Basement roof slab',
        //     charge: '7.5% BSP + 10% PLC + 50% EDC',
        //     configured: true,
        //     createdOn: '2024-12-18 10:39:45',
        //     createdBy: '2024-12-18 10:39:45',
        // },
    ]);
    const columns = [
        {
            title: "Id",
            dataIndex: "key",
            key: "key",
            width: 20,
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Payment Plan",
            dataIndex: "plan",
            key: "plan",
            width: 180,
            align: "center",
            render: (_, params) => {
                // console.log("Params", params)
                return (
                    <p className="cursor-pointer" style={{ color: "#1890ff" }}
                        onClick={() => handleNavigateRoute(params)}
                    >
                        {params.plan}
                    </p>
                )
            }
        },
        {
            title: "Created On",
            dataIndex: "createdOn",
            key: "createdOn",
            width: 180,
            align: "center",
            render: (params) => {
                return (
                    <p className="cursor-pointer" style={{ color: "#1890ff" }}>
                        {moment.utc(params).format("MM-DD-YYYY hh:mm:ss")}
                    </p>
                )
            }
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            width: 180,
            align: "center",
            render: (params) => {
                return (
                    <p className="cursor-pointer" style={{ color: "#1890ff" }}>
                        {'Admin'}
                    </p>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            align: "center",
            render: (record) => (
                <>
                    {/* {console.log(record)} */}
                    <Tooltip title='Configure'>
                        <SettingsIcon className='cursor-pointer' fontSize='small'
                            onClick={() => handleConfigure(record)} style={{ fill: 'blue' }}
                        />
                    </Tooltip>
                </>
            )
        },
    ];
    // const handleEdit = (record) => {
    //     console.log("Record", record, editingField)
    //     setEditingField(record);
    //     setIsOpen(true);
    //     setIsEditing(true);
    //     setAllDetails({
    //         // plan: record.plan,
    //         stage: record.stage,
    //         charge: record.charge,
    //     });
    //     // form.validateFields();
    // }
    // const handleDelete = (record) => {
    //     setEditingField(record);
    //     setOpenDeleteModal(true);
    // }
    const handleDeleteConfirmation = () => {
        setExDataSource(exDataSource.filter(data => data.key != editingField.key));
        setOpenDeleteModal(false);
        setEditingField(null);
        setAlert({
            ...alert,
            open: true,
            message: 'Plan Deleted Successfull',
            severity: 'success'
        })
    }
    const handleConfigure = (record) => {
        setIsOpen(true);
        // setIsEditing(true);
        setEditingField(record);
        setAllDetails({
            // plan: '',
            stage: '',
            charge: ''
        })
        // console.log("Record Configure", record, allDetails)
    }
    const handleChange = (e, name) => {
        // console.log("@@", allDetails)
        setAllDetails(prevdata => ({
            ...prevdata,
            [name]: e.target.value
        }));
    }
    const handleSubmit = () => {
        dataSource.map(data => (
            data.key == editingField.key &&
            setExDataSource([...exDataSource, { ...allDetails, key: exDataSource.length + 1 }])
        ));
        handleCloseModal();
        setAlert({
            ...alert,
            open: true,
            message: 'Plan Edited Successfully',
            severity: 'success'
        })
    }
    const handleCloseAlertBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    const handleAddPlan = (e) => {
        setAllDetails({
            key: dataSource.length + 1,
            plan: e.target.value,
            data: exDataSource
        });
    }
    const handleSubmitAddPlan = () => {
        setDataSource([...dataSource, allDetails]);
        handleCloseModal();
        setAlert({
            ...alert,
            open: true,
            message: 'Plan Added Successfully',
            severity: 'success'
        })
    }
    const handleCloseModal = () => {
        setIsOpen(false);
        setIsEditing(false);
        setEditingField(null);
        setAddModal(false);
        setAllDetails({
            // id: '',
            // plan: '',
            stage: '',
            charge: ''
        });
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
            message: 'Plan Edited Filed, Check All Fields',
            severity: 'error'
        })
    }
    // useEffect(() => {
    //     console.log('Expandable Table Data', dataSource);
    // }, [dataSource])
    return (
        <div className='w-full flex flex-col gap-2 justify-center'>
            <AlertBar
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlertBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <div className='flex justify-end items-center'>
                <Tooltip title='Add New'>
                    <Button type='primary' onClick={() => setAddModal(true)}>
                        Add New
                    </Button>
                </Tooltip>
            </div>
            <Box sx={{ boxShadow: 3, width: '100%' }} className='flex justify-center'>
                <Table
                    className='w-full'
                    columns={columns}
                    // expandable={{
                    //     expandedRowRender: (record) => (
                    //         console.log("$$$$", record),
                    //         <Table columns={expandableColumn} dataSource={exDataSource} rowKey={record => record.id} />
                    //         // <Table columns={record.column} dataSource={record.data} rowKey={record => record.id} />
                    //     )
                    //     // rowExpandable: (record) => record.title !== 'Not Expandable',
                    // }}
                    dataSource={dataSource}
                    // footer={() =>
                    //     <Tooltip title='Add New' placement='bottom'>
                    //         <Button type='primary' onClick={() => setAddModal(true)}>
                    //             Add New
                    //         </Button>
                    //     </Tooltip>
                    // }
                    rowKey={(record => record.id)}
                    bordered='true'
                />
            </Box>
            {isOpen && <Modal
                open={isOpen}
                onCancel={handleCloseModal}
                title={`Configure New Plan For ${editingField.plan}`}
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
                // validateMessages={validateMessages}
                >
                    <Form.Item
                        label='Stage'
                        name='Stage'
                        rules={[
                            { required: true, message: 'Stage is required' },
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
                            { required: true, message: 'Charge is required' },
                        ]}
                        initialValue={allDetails.charge}
                    >
                        {/* {console.log("EF", allDetails, editingField)} */}
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
            {addModal && <Modal
                open={addModal}
                onCancel={handleCloseModal}
                title='Add Payment Plan?'
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
                    onFinish={handleSubmitAddPlan}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label='Plan Name'
                        name='Plan'
                        rules={[
                            { required: true, message: 'Payment Plan is required' },
                        ]}

                    >
                        <Input type='text' defaultValue='' placeholder='Enter Plan' onChange={handleAddPlan} />
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
            </Modal>}
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
export default PaymentPlan;