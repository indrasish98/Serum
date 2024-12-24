import React, { useEffect, useState } from 'react';
import { Table, Select, Input, InputNumber, Button, Tooltip, Form, Modal } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { useForm } from 'antd/es/form/Form';
import AlertBar from '../../snackbar/AlertBar';
import { MakeApicallWithoutToken } from '../../../../api/MakeApiCall';

const ProjectDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [form] = useForm();
    const [allDetails, setAllDetails] = useState({
        room: '0',
        floor: '0',
        areaDetail: '0',
        unit: 'sqft',
        cost: 0,
    });
    const [editingField, setEditingField] = useState({});
    const handleUnitChange = (value) => {
        // console.log("Unit", value);
        setAllDetails(pd => ({
            ...pd,
            unit: value
        }));
    }
    const selectAfter = (
        <Select defaultValue={editingField?.unit} onChange={(value) => handleUnitChange(value)} style={{ width: 80 }}>
            <Option value="sqft">SQFT</Option>
            <Option value="acre">Acre</Option>
            <Option value="katha">Katha</Option>
            <Option value="bigha">Bigha</Option>
        </Select>
    );
    const [dataSource, setDataSource] = useState([
        {
            projectId: 1,
            room: '1 BHK',
            floor: '10th',
            areaDetail: '600',
            unit: 'sqft',
            cost: 10000
        },
    ]);
    const getDetails = async () => {
        try {
            const response = await MakeApicallWithoutToken(`project-detail/${1}`, 'GET');
            console.log("Resposne", response);
            if (response?.success) {
                const apiData = response.data;
                setDataSource([apiData]);
            }
        } catch (err) {
            console.error("Error Making Api Call", err);
        }
    }
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    })
    const handleEdit = (record) => {
        console.log("Record Is", record)
        setEditingField(record);
        setAllDetails(record)
        setIsEditing(true);
    }
    const handleDelete = (record) => {
        setEditingField(record);
        setOpenDeleteModal(true);
    }
    const handleDeleteConfirmation = () => {
        setDataSource(dataSource.filter(data => data.projectId != editingField.projectId));
        setOpenDeleteModal(false);
        setEditingField(null);
    }
    const columns = [
        {
            title: "Project Id",
            dataIndex: "projectId",
            key: "projectId",
            width: 20,
            align: "center",
            // render: (text, record, index) => index + 1,
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
            align: 'center',
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
            key: 'floor',
            align: 'center',
            render: (value) => {
                return (
                    value + ' ' + 'Floor'
                );
            }
        },
        {
            title: 'Area Details',
            dataIndex: 'areaDetail',
            key: 'areaDetail',
            align: 'center',
            render: (value, record) => {
                return (
                    value + ' ' + record.unit
                );
            }
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            align: 'center',
            render: (value) => {
                return (
                    value + ' ₹'
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            align: "center",
            render: (record) => (
                <div className='flex gap-1 justify-center items-center'>
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
            )
        },
    ];
    const handleChange = (e, name) => {
        setAllDetails(prevdata => ({
            ...prevdata,
            [name]: e
        }));
    }
    const calculateCost = (unit) => {
        // console.log('Cost', allDetails.area);
        switch (unit) {
            case 'sqft':
                setAllDetails(prevdata => ({
                    ...prevdata,
                    cost: allDetails.areaDetail * 3500
                }))
                break;
            case 'katha':
                setAllDetails(prevdata => ({
                    ...prevdata,
                    cost: allDetails.areaDetail * 500000
                }))
                break;
            case 'bigha':
                setAllDetails(prevdata => ({
                    ...prevdata,
                    cost: allDetails.areaDetail * 2000000
                }))
                break;
            case 'acre':
                setAllDetails(prevdata => ({
                    ...prevdata,
                    cost: allDetails.areaDetail * 3000000
                }))
                break;
            default:
                return null;
        }
    }
    const handleCloseModal = () => {
        setIsEditing(false);
        setEditingField(null);
        setOpenDeleteModal(false);
        setAllDetails({
            room: '0',
            floor: '0',
            areaDetail: '0',
            unit: '',
            cost: 0,
        });
    }
    const handleSubmit = () => {
        // console.log('#All', editingField);
        isEditing ?
            setDataSource(dataSource.map(data => (
                data.projectId == editingField.projectId ?
                    {
                        ...data,
                        // plan: allDetails.plan,
                        configured: true,
                        room: allDetails.room,
                        floor: allDetails.floor,
                        areaDetail: allDetails.areaDetail,
                        unit: allDetails.unit,
                        cost: allDetails.cost,
                    } : data
            ))) :
            setDataSource([...dataSource, allDetails])
        setAlert({
            ...alert,
            open: true,
            message: `Details ${isEditing ? 'edited' : 'added'} successfully`,
            severity: 'success'
        });
        handleCloseModal();
        form.resetFields();
    };
    const validateMessages = {
        required: "${label} is required!"
    };
    const onFinish = (values) => {
        // console.log('Finished', values);
        handleSubmit();
    }
    const onFinishFailed = (error) => {
        console.log('Failed', error);
        setAlert({
            ...alert,
            open: true,
            message: 'Failed to add details, Check all fields',
            severity: 'error'
        })
    }
    const handleCloseAlertBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    useEffect(() => {
        calculateCost(allDetails.unit);
        console.log('AllData', allDetails)
    }, [allDetails.areaDetail, allDetails.unit, allDetails.room]);
    useEffect(() => {
        getDetails();
    }, []);
    return (
        <div className='flex justify-start items-start'>
            <AlertBar
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlertBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <Box sx={{ padding: 2, boxShadow: 3, width: 1200 }} className='flex gap-6 justify-center items-start'>
                <div className='w-2/6 p-2 flex flex-col gap-6 justify-start items-center bg-gray-200 rounded-2xl'>
                    <p className='text-xl font-normal flex justify-center items-center'>Add New Plan</p>
                    <Form
                        form={form}
                        layout="horizontal"
                        labelAlign='left'
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        style={{ marginTop: 20 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        validateMessages={validateMessages}
                        className='flex flex-col gap-4'
                    >
                        <Form.Item
                            key='Room'
                            label={
                                <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                    Room
                                </p>
                            }
                            name='room'
                            rules={[
                                { required: true, message: `Room is required` },
                            ]}
                        >
                            <Select
                                options={[
                                    { value: '1 Room Kitchen', label: '1 Room Kitchen' },
                                    { value: 'Studio Appartment', label: 'Studio Appartment' },
                                    { value: '1 BHK', label: '1 BHK' },
                                    { value: '2 BHK', label: '2 BHK' },
                                    { value: '2.5 BHK', label: '2.5 BHK' },
                                    { value: '3 BHK', label: '3 BHK' },
                                    { value: '3.5 BHK', label: '3.5 BHK' },
                                    { value: '4 BHK', label: '4 BHK' },
                                ]}
                                placeholder={'Select'}
                                style={{ width: 150 }}
                                onChange={(e) => handleChange(e, 'room')}
                            />
                        </Form.Item>
                        <Form.Item
                            key='Floor Plan'
                            label={
                                <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                    Floor Plan
                                </p>
                            }
                            name='floor'
                            rules={[
                                { required: true, message: `Floor is required` },
                            ]}
                        >
                            <Select
                                options={[
                                    { value: 'Ground', label: 'Ground Floor' },
                                    { value: '1st', label: '1st Floor' },
                                    { value: '2nd', label: '2nd Floor' },
                                    { value: '3rd', label: '3rd Floor' },
                                ]}
                                placeholder={'Select'}
                                style={{ width: 130 }}
                                onChange={(e) => handleChange(e, 'floor')}
                            />
                        </Form.Item>
                        <Form.Item
                            key='Area'
                            label={
                                <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                    Area
                                </p>
                            }
                            name='area'
                            rules={[
                                { required: true, message: `Area is required` },
                            ]}
                        >
                            <InputNumber
                                className='flex-1'
                                type='number'
                                controls={false}
                                addonAfter={selectAfter}
                                placeholder='Enter Area'
                                style={{ width: 180 }}
                                // value={allDetails.area}
                                onChange={(e) => handleChange(e, 'areaDetail')}
                            // required={true}
                            />
                        </Form.Item>
                        <div className='flex gap-6 justify-start items-center'>
                            <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>Total Cost :</p>
                            <Input value={allDetails.cost} style={{ width: 150 }} addonAfter='₹' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <Tooltip title='Add Project' placement='bottom'>
                                <Button type='primary' style={{ backgroundColor: "#6de751" }} htmlType='submit'>
                                    Add
                                </Button>
                            </Tooltip>
                        </div>
                    </Form>
                </div>
                <div className='p-2 w-4/6 flex flex-col gap-2'>
                    <p className='text-xl font-normal'>All Plans</p>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered='true'
                        rowKey={(record => record.id)}
                    />
                </div>
            </Box>
            {isEditing && <Modal
                open={isEditing}
                title='Edit Project Details'
                onCancel={handleCloseModal}
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
                        span: 8,
                    }}
                    style={{ marginTop: 20 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                    className='flex flex-col gap-1'
                >
                    <Form.Item
                        key='Room'
                        label={
                            <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                Room
                            </p>
                        }
                        name='room'
                        rules={[
                            { required: true, message: `Room is required` },
                        ]}
                        initialValue={editingField.room}
                    >
                        <Select
                            options={[
                                { value: '1 Room Kitchen', label: '1 Room Kitchen' },
                                { value: 'Studio Appartment', label: 'Studio Appartment' },
                                { value: '1 BHK', label: '1 BHK' },
                                { value: '2 BHK', label: '2 BHK' },
                                { value: '2.5 BHK', label: '2.5 BHK' },
                                { value: '3 BHK', label: '3 BHK' },
                                { value: '3.5 BHK', label: '3.5 BHK' },
                                { value: '4 BHK', label: '4 BHK' },
                            ]}
                            placeholder={'Select'}
                            style={{ width: 160 }}
                            // defaultValue={editingField.room}
                            onChange={(e) => handleChange(e, 'room')}
                        />
                    </Form.Item>
                    <Form.Item
                        key='Floor'
                        label={
                            <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                Floor Plan
                            </p>
                        }
                        name='floor'
                        rules={[
                            { required: true, message: `Floor is required` },
                        ]}
                        initialValue={editingField.floor}
                    >
                        <Select
                            options={[
                                { value: 'Ground', label: 'Ground Floor' },
                                { value: '1st', label: '1st Floor' },
                                { value: '2nd', label: '2nd Floor' },
                                { value: '3rd', label: '3rd Floor' },
                            ]}
                            placeholder={'Select'}
                            style={{ width: 130 }}
                            // defaultValue={editingField.floor}
                            onChange={(e) => handleChange(e, 'floor')}
                        />
                    </Form.Item>
                    <Form.Item
                        key='Area'
                        label={
                            <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                Area
                            </p>
                        }
                        name='area'
                        rules={[
                            { required: true, message: `Area is required` },
                        ]}
                        initialValue={parseInt(editingField.area)}
                    >
                        <InputNumber
                            className='flex-1'
                            type='number'
                            controls={false}
                            addonAfter={selectAfter}
                            placeholder='Enter Area'
                            style={{ width: 180 }}
                            // defaultValue={parseInt(editingField.area)}
                            onChange={(e) => handleChange(e, 'areaDetail')}
                            required={true}
                        />
                    </Form.Item>
                    {/* <Form.Item
                        key='Total Cost'
                        label={
                            <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                Total Cost
                            </p>
                        }
                        name='Total Cost'
                        rules={[
                            { required: true, message: `Area is required` },
                        ]}
                        initialValue={allDetails.cost}
                    >
                        <Input style={{ width: 150 }} addonAfter='₹' />
                    </Form.Item> */}
                    <div className='flex gap-11 justify-start items-center'>
                        <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>Total Cost :</p>
                        <Input value={allDetails.cost} style={{ width: 150 }} addonAfter='₹' />
                    </div>
                    <div className='flex gap-2 justify-end items-end'>
                        <Form.Item>
                            <Button key="back" onClick={handleCloseModal}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
            }
            {openDeleteModal && <Modal
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                title='Are you sure you want to delete this project?'
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
export default ProjectDetails;