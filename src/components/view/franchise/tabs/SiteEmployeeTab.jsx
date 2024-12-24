import React, { useState, useEffect } from 'react';
import { Table, Radio, Select, Button, Modal, Form, Input, InputNumber, Switch, Tooltip } from 'antd';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Box from '@mui/material/Box';
import CallIcon from '@mui/icons-material/Call';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertBar from '../../snackbar/AlertBar';

const SiteEmployeeTab = () => {
    const [allDetails, setAllDetails] = useState({
        salutation: '',
        firstname: '',
        lastname: '',
        email: '',
        workphone: '',
        mobile: '',
        //state: ''
    });
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    })
    const handleChange = (e, dropdown, name) => {
        const value = dropdown ?? e.target.value ?? e;
        setAllDetails({ ...allDetails, [name]: value });
    }
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [toggle, setToggle] = useState(false);
    const handleToggleState = (checked, record) => {
        setData(data.map(item => (
            item.key == record.key ?
                {
                    ...item,
                    state: checked ? 'Active' : 'Inactive'
                } : item
            // console.log("Checked", checked);
        )))
    }
    const column = [
        {
            title: 'Salutation',
            dataIndex: 'salutation',
            type: 'dropdown',
            width: 60,
            align: "center",
            headerAlign: "center",
            // render: (value) => {
            //     return (
            //         <Select
            //             id='salutation'
            //             placeholder='Select'
            //             variant='borderless'
            //             options={[
            //                 { value: 'Mr.', label: 'Mr.' },
            //                 { value: 'Mrs.', label: 'Mrs.' },
            //                 { value: 'Ms.', label: 'Ms.' },
            //             ]}
            //         />
            //     )
            // }
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            type: 'text',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            type: 'text',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            type: 'text',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Work Phone',
            dataIndex: 'workphone',
            type: 'number',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            type: 'number',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Action',
            dataIndex: 'state',
            type: 'dropdown',
            width: 160,
            align: "center",
            headerAlign: "center",
            render: (value, record) => {
                // console.log("Record", record);
                let color = '';
                switch (value) {
                    case 'Active':
                        color = '#41d51f'
                        break;
                    case 'Inactive':
                        color = '#f73a27'
                        break;
                    default:
                        color = '#b3b2b1'
                        return null;
                }
                return (
                    <div className='flex justify-center items-center gap-2'>
                        <Switch size='small' checked={value == 'Active' ? true : false} onChange={(checked) => handleToggleState(checked, record)} />
                        <div className='p-1 rounded-md text-xs' style={{ backgroundColor: color }}>
                            {record.state}
                        </div>
                    </div>
                )
            }
        },
    ];
    const [data, setData] = useState([
        {
            key: 1,
            salutation: 'Mr.',
            firstname: "XYZ",
            lastname: "XYZ",
            email: 'xyz@xyz.com',
            workphone: '91-XXXXXXXXXXX',
            mobile: '91-XXXXXXXXXX',
            state: 'Inactive'
            // communicationchannels: 'XYZ'
        }
    ]);
    const renderFieldBox = (field) => {
        switch (field.type) {
            case "text":
                return (
                    <Input
                        placeholder={`Enter ${field.title}`}
                        defaultValue={""}
                        style={{ width: 300 }}
                        type="text"
                        onChange={(e) => handleChange(e, null, field.dataIndex)}
                    />
                );
            case "number":
                return (
                    <InputNumber
                        type='number'
                        controls={false}
                        placeholder={`Enter ${field.title}`}
                        style={{ width: 300 }}
                        addonBefore={field.title == 'Mobile' ? <PhoneAndroidIcon fontSize='small' /> : <CallIcon fontSize='small' />}
                        onChange={(e) => handleChange(null, e, field.dataIndex)}
                    />
                );
                // case "radio":
                return (
                    <Radio.Group name='communicationChannels' onChange={''} value={allDetails.communicationChannels}>
                        <Radio value='Email'>Email</Radio>
                        <Radio value='SMS'>SMS</Radio>
                    </Radio.Group>
                );
            case "dropdown":
                return (
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder={`Select ${field.title}`}
                        options={field.title == 'Salutation' ? [
                            { value: 'Mr.', label: 'Mr.' },
                            { value: 'Mrs.', label: 'Mrs.' },
                            { value: 'Ms.', label: 'Ms.' },
                        ]
                            : [
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]
                        }
                        onChange={(e) => handleChange(null, e, field.dataIndex)}
                    />
                );
            default:
                return null;
        }
    };

    // useEffect(() => {
    //     console.log("AllData", data);
    // }, [data]);

    const TableFooter = () => {
        return (
            <Tooltip title='Add New Person' placement='bottom'>
                <Button className='bg-green-50' onClick={() => setIsOpen(true)}>
                    <AddCircleOutlineOutlinedIcon fontSize='small' style={{ fill: 'blue' }} /> Add Contact Person
                </Button>
            </Tooltip>
        )
    }
    const handleAddEmployee = () => {
        // console.log("Details", allDetails)
        setData([...data, allDetails]);
        setIsOpen(false);
        setAlert({
            ...alert,
            open: true,
            message: `Employee Added Successfully`,
            severity: 'success'
        })
    }
    const validateMessages = {
        required: "${label} is required!"
    };
    const onFinish = (values) => {
        // console.log('Finished', values);
        handleAddEmployee();
    }
    const onFinishFailed = (error) => {
        // console.log('Failed', error);
        setAlert({
            ...alert,
            open: true,
            message: 'Failed To Add Employee, Check All Fields',
            severity: 'error'
        })
    }
    const handleCloseAlertBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    return (
        <>
            <AlertBar
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlertBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <Box sx={{ padding: 2, boxShadow: 3, width: '100%' }}>
                <Table footer={() => <TableFooter />} columns={column} dataSource={data} />
            </Box>
            {isOpen && <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                title='Add Employee'
                footer={[
                    // <Button key="back" onClick={() => setIsOpen(false)}>
                    //     Cancel
                    // </Button>,
                    // <Button
                    //     type="primary"
                    //     // htmlType='submit'
                    //     style={{ backgroundColor: '#f7535b' }}
                    // // key="submit"
                    // // onClick={handleAddEmployee}                        
                    // >
                    //     Add
                    // </Button>,
                    null
                ]}
            >
                <Form
                    layout="horizontal"
                    labelAlign='left'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{ marginTop: 20 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                    className='flex flex-col gap-4'
                >
                    <div className=''>
                        {column.map((field, index) => (
                            <Form.Item
                                key={index}
                                label={
                                    <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                        {field.title}
                                        {/* {field.required && <span style={{ color: "red" }}> *</span>} */}
                                    </p>
                                }
                                name={field.title}
                                rules={[
                                    { required: true, message: `${field.title} is required` },
                                ]}
                            >
                                {renderFieldBox(field)}
                            </Form.Item>
                        ))}
                    </div>
                    <div className='flex gap-2 justify-end items-end'>
                        <Form.Item>
                            <Button key="back" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>}
        </>
    )
}
export default SiteEmployeeTab;
