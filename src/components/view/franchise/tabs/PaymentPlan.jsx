import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tooltip } from 'antd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { useForm } from 'antd/es/form/Form';
import AlertBar from '../../snackbar/AlertBar';
import moment from "moment";
import { useNavigate, useLocation } from 'react-router-dom';
import { MakeApicallWithoutToken } from '../../../../api/MakeApiCall';

const PaymentPlan = ({ projectId }) => {
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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = useForm();
    // const location = useLocation();
    // const projectId = location?.state?.projectId;


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


    const getAllPlansAccordingProjectId = async () => {
        try {
            setLoading(true);
            // console.log("##ID", projectId);
            const response = await MakeApicallWithoutToken(`plan-name/${projectId}`, 'GET');
            if (response?.success) {
                // console.log("Plans", response)
                setDataSource(response.data.map(data => ({
                    ...data,
                    createdOn: data.createdOn ?? '2024-12-27 12:00:42',
                    createdBy: data.createdBy ?? '--',
                    data: null
                })))
            }
        }
        catch (err) {
            console.error('Error making api call', err);
        } finally {
            setLoading(false);
        }
    }
    const handleNavigateRoute = (record) => {
        // console.log("##id", record);
        navigate('userplantable', {
            state: {
                name: record.planName,
                // data: exDataSource,
                planId: record.id,
                projectId: projectId
            }
        })
    }
    const [dataSource, setDataSource] = useState([
        {
            // key: 1,
            // planName: 'Plan A',
            // // stage: 'Booking',
            // // charge: '10% BSP',
            // // configured: true,
            // createdOn: '2024-12-18 10:39:45',
            // createdBy: '--',
            // data: exDataSource,
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
    ]);
    const columns = [
        {
            title: "Plan Id",
            dataIndex: "id",
            key: "id",
            width: 20,
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Payment Plan",
            dataIndex: "planName",
            key: "planName",
            width: 180,
            align: "center",
            render: (text, record) => {
                // console.log("Params", params)
                return (
                    <p className="cursor-pointer" style={{ color: "#1890ff" }}
                        onClick={() => handleNavigateRoute(record)}
                    >
                        {text}
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
    // useEffect(() => {
    //     console.log("Editing Field", editingField);
    // }, [editingField]);
    const handleConfigure = (record) => {
        // setIsEditing(true);
        setEditingField(record);
        // console.log("Record", record);
        setAllDetails({
            // plan: '',
            stage: '',
            charge: ''
        });
        setIsOpen(true);
        // console.log("Record Configure", record, allDetails)
    }
    const handleChange = (e, name) => {
        // console.log("@@", allDetails)
        setAllDetails(prevdata => ({
            ...prevdata,
            [name]: e.target.value
        }));
    }
    const handleSubmit = async () => {
        // dataSource.map(data => (
        //     data.key == editingField.key &&
        //     setExDataSource([...exDataSource, { ...allDetails, key: exDataSource.length + 1 }])
        // ));
        try {
            const response = await MakeApicallWithoutToken(`payment-plan/add/${editingField?.id}?projectId=${projectId}`, 'POST', allDetails);
            // console.log('Response', response);
            if (response?.success) {
                handleCloseModal();
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Plan Edited Successfully',
                    severity: 'success'
                })
            }
        } catch (err) {
            console.error("Error while making api call", err);
            setAlert({
                ...alert,
                open: true,
                message: 'Failed to configure new Plan, Please try again',
                severity: 'error'
            })
        }
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
    const handleSubmitAddPlan = async () => {
        // setDataSource([...dataSource, allDetails]);
        try {
            // console.log("Payload", allDetails.plan)
            const response = await MakeApicallWithoutToken(`plan-name/create/${projectId}`, 'POST', { planName: allDetails.plan });
            if (response?.success) {
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Plan added successfully',
                    severity: 'success'
                });
                getAllPlansAccordingProjectId();
            }
        }
        catch (err) {
            console.error('Error making api call', err);
            setAlert({
                ...alert,
                open: true,
                message: 'Failed to add plan, Please try again',
                severity: 'error'
            });
        }
        handleCloseModal();
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
    useEffect(() => {
        getAllPlansAccordingProjectId();
    }, []);
    // useEffect(() => {
    //     console.log('All Data', allDetails);
    // }, [allDetails]);
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
                    loading={loading}
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
                    rowKey={record => record.id}
                    bordered='true'
                />
            </Box>
            {isOpen && <Modal
                open={isOpen}
                onCancel={handleCloseModal}
                title={`Configure New Plan For ${editingField.planName}`}
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
            {/* {openDeleteModal && <Modal
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
            } */}
        </div>
    )
}
export default PaymentPlan;