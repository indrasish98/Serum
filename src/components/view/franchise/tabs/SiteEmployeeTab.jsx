import React, { useState, useEffect } from 'react';
import { Table, Radio, Select, Button, Modal, Form, Input, InputNumber, Switch, Tooltip } from 'antd';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Box from '@mui/material/Box';
import CallIcon from '@mui/icons-material/Call';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertBar from '../../snackbar/AlertBar';
import { MakeApicallWithoutToken } from '../../../../api/MakeApiCall';

const SiteEmployeeTab = ({ projectId }) => {
    const [allDetails, setAllDetails] = useState({
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        workPhone: '',
        mobile: '',
        active: false
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
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
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
            dataIndex: 'firstName',
            type: 'text',
            width: 160,
            align: "center",
            headerAlign: "center"
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
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
            dataIndex: 'workPhone',
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
            dataIndex: 'active',
            type: 'dropdown',
            width: 160,
            align: "center",
            headerAlign: "center",
            render: (value, record) => {
                // console.log("Record", record);
                let color = '';
                switch (value) {
                    case true:
                        color = '#41d51f'
                        break;
                    case false:
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
                            {value ? 'Active' : 'Inactive'}
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
            firstName: "XYZ",
            lastName: "XYZ",
            email: 'xyz@xyz.com',
            workPhone: '91-XXXXXXXXXXX',
            mobile: '91-XXXXXXXXXX',
            active: 'Inactive'
        },
        {
            key: 2,
            salutation: 'Mr.',
            firstName: "XYZ",
            lastName: "XYZ",
            email: 'xyz@xyz.com',
            workPhone: '91-XXXXXXXXXXX',
            mobile: '91-XXXXXXXXXX',
            active: 'Inactive'
        }
    ]);
    const getAllEmployeeDetails = async () => {
        try {
            setLoading(true);
            const response = await MakeApicallWithoutToken(`employee/${projectId}`, 'GET');
            // console.log('Response', response, projectId);
            if (response?.success) {
                setData(response?.data.map((data, index) => ({
                    ...data,
                    key: index
                })));
            }
        }
        catch (err) {
            console.error('Error while making api call', err);
        } finally {
            setLoading(false);
        }
    }
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
            case "dropdown":
                return (
                    <Select
                        // showSearch
                        placeholder={`Select ${field.title}`}
                        style={{ width: 300 }}
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
    const handleSubmitEmployee = async () => {
        // console.log("Details", allDetails)
        try {
            const payload = {
                ...allDetails,
                active: allDetails.active == 'Active' ? true : false,
                mobile: allDetails.mobile.toString(),
                workPhone: allDetails.workPhone.toString(),
            }
            delete payload['key'];
            delete payload['id'];
            delete payload['projectId'];
            // console.log("Payload", payload, selectedRows[0].id);
            const endPoint = `employee/${isEditing ? 'update' : 'add'}/${isEditing ? selectedRows[0].id : projectId}`
            const response = await MakeApicallWithoutToken(endPoint, isEditing ? 'PUT' : 'POST', payload);
            if (response?.success) {
                getAllEmployeeDetails();
                handleCloseModal();
                setAlert({
                    ...alert,
                    open: true,
                    message: `Employee Added Successfully`,
                    severity: 'success'
                })
            }
        } catch (err) {
            console.error('Error while making api call', err);
            setAlert({
                ...alert,
                open: true,
                message: `Failed to add employee, Please try again`,
                severity: 'error'
            })
        }
    }
    const validateMessages = {
        required: "${label} is required!"
    }
    const onFinish = (values) => {
        // console.log('Finished', values);
        handleSubmitEmployee();
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
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        }
    }
    const handleEdit = () => {
        setAllDetails(selectedRows[0]);
        setIsEditing(true);
        setIsOpen(true);
    }
    const handleDeleteEmploye = async () => {
        for (let i = 0; i < selectedRows.length; i++) {
            try {
                const response = await MakeApicallWithoutToken(`employee/delete/${selectedRows[i].id}`, 'DELETE');
                if (response?.success) {
                    setAlert({
                        ...alert,
                        open: true,
                        message: `${selectedRows.length} employee/s deleted successfully`,
                        severity: 'success'
                    })
                    console.log('Deleted', selectedRows[i].firstName);
                }
            }
            catch (err) {
                console.error('Error while making api call', err);
                setAlert({
                    ...alert,
                    open: true,
                    message: `Failed to delete ${selectedRows.length} employee/s, Please try again`,
                    severity: 'error'
                })
            }finally{
                getAllEmployeeDetails();
            }
        }
    }
    const setInitalValuesOnForm = (field, selected) => {
        switch (field.dataIndex) {
            case 'salutation':
                return selected.salutation;
            case 'firstName':
                return selected.firstName;
            case 'lastName':
                return selected.lastName;
            case 'email':
                return selected.email;
            case 'workPhone':
                return selected.workPhone;
            case 'mobile':
                return selected.mobile;
            case 'active':
                return selected.active ? 'Active' : 'Inactive';
            default:
                return null;
        }
    }
    const handleCloseModal = () => {
        setIsEditing(false);
        setIsOpen(false);
        setSelectedRows([]);
    }
    useEffect(() => {
        getAllEmployeeDetails();
    }, []);
    return (
        <>
            <AlertBar
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlertBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <Box sx={{ padding: 2, boxShadow: 3, width: '100%' }} className='flex flex-col gap-4'>
                {selectedRows.length > 0 && <div className='flex gap-2'>
                    {selectedRows.length < 2 && <Button type='primary' onClick={handleEdit}>Edit</Button>}
                    <Button type='primary' style={{ backgroundColor: '#f7535b' }} onClick={handleDeleteEmploye}>Delete</Button>
                </div>}
                <Table
                    loading={loading}
                    footer={() => <TableFooter />}
                    columns={column}
                    dataSource={data}
                    bordered
                    rowSelection={{ ...rowSelection }}
                />
            </Box>
            {isOpen && <Modal
                open={isOpen}
                onCancel={handleCloseModal}
                title={isEditing ? 'Edit Employee Detail' : 'Add Employee Detail'}
                footer={[
                    // <Button key="back" onClick={() => setIsOpen(false)}>
                    //     Cancel
                    // </Button>,
                    // <Button
                    //     type="primary"
                    //     // htmlType='submit'
                    //     style={{ backgroundColor: '#f7535b' }}
                    // // key="submit"
                    // // onClick={handleSubmitEmployee}                        
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
                                initialValue={isEditing ? setInitalValuesOnForm(field, selectedRows[0]) : ''}
                            >
                                {renderFieldBox(field)}
                            </Form.Item>
                        ))}
                    </div>
                    <div className='flex gap-2 justify-end items-end'>
                        <Form.Item>
                            <Button key="back" onClick={handleCloseModal}>Cancel</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">{isEditing ? 'Save' : 'Add'}</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>}
        </>
    )
}
export default SiteEmployeeTab;
