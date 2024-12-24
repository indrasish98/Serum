import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Radio, Tabs, Select } from "antd";
import { Column } from './AddFranchiseColumn';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfigurationTab from './tabs/ConfigurationTab';
import AddressDetailsTab from './tabs/AddressDetailsTab';
import SiteEmployeeTab from './tabs/SiteEmployeeTab';
import CallIcon from '@mui/icons-material/Call';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropertyTypesTab from './tabs/PropertyTypesTab';
import ProjectDetails from './tabs/ProjectDetails';
import Amenities from './tabs/Amenities';
import PaymentPlan from './tabs/PaymentPlan';
import { MakeApicallWithoutToken } from '../../../api/MakeApiCall';
import { useForm } from 'antd/es/form/Form';

const AddProject = () => {
    const [allData, setAllData] = useState({
        projectName: '',
        displayCode: '',
    });
    const [dataFetched, setDataFetched] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAllData({ ...allData, [name]: value })
    };
    // const [form] = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let defaultActiveTab = location?.state?.tab ?? '1';
    let showProjectDetails = location?.state?.isNavigated ?? false;
    let projectId = location?.state?.projectId ?? null;
    const renderFieldBox = (field) => {
        switch (field.field_type) {
            case "text":
                return (
                    <Input
                        style={{ width: field.name == 'projectName' ? 350 : 300 }}
                        addonBefore={field.field == 'Email Address' ? <EmailOutlinedIcon fontSize='small' /> : ''}
                        type="text"
                        name={field.name}
                        onChange={handleChange}
                    />
                );
            case "mixed":
                return (
                    <div className='flex gap-2'>
                        <Select style={{ width: 120 }} placeholder='Salutation'
                            options={[{ value: 0, label: 'Mr.' }, { value: 0, label: 'Mrs.' }, { value: 0, label: 'Ms.' }]} />
                        <Input style={{ width: 135 }} placeholder='Firstname' defaultValue='' type='text' onChange={''} />
                        <Input style={{ width: 135 }} placeholder='Lastname' defaultValue='' type='text' onChange={''} />
                    </div>
                );
            case "number":
                return (
                    <div className='flex gap-2'>
                        <InputNumber
                            addonBefore={<CallIcon fontSize='small' />}
                            placeholder='Work Phone'
                            defaultValue={''}
                            style={{ width: 200, WebkitAppearance: 'none' }}
                            type="number"
                            controls={false}
                        // onChange={(e) => updateFormField(e, null, field)}
                        />
                        <InputNumber
                            addonBefore={<PhoneAndroidOutlinedIcon fontSize='small' />}
                            placeholder='Mobile'
                            defaultValue={''}
                            style={{ width: 200 }}
                            type="number"
                            controls={false}
                        // onChange={(e) => updateFormField(e, null, field)}
                        />
                    </div>
                );
            case "radio":
                return (
                    <div className='flex gap-4' key={field.field}>
                        <Radio.Group onChange={handleRadioCheck} value={franchiseData.communicationChannel}>
                            {field.option.map(opt => {
                                return (
                                    <Radio key={opt} value={opt}>{opt}</Radio>
                                )
                            })}
                        </Radio.Group>
                    </div>
                );
            case "dropdown":
                return (
                    <Select
                        style={{ width: 400 }}
                        defaultValue={""}
                        options={field.option}
                    // onChange={(value) => updateFormField(null, value, field)}
                    />
                );
            default:
                return null;
        }
    };
    const getProjectDetails = async () => {
        try {
            const response = await MakeApicallWithoutToken(`project/${projectId}`, 'GET');
            if (response?.success) {
                const apiData = { ...response.data };
                // console.log("ApiData", apiData);
                setAllData(apiData);
                setDataFetched(true);
            }
        } catch (err) {
            console.error('Error making api call', err);
        }
    }
    const handleBack = () => {
        navigate('/projects')
    }

    useEffect(() => {
        showProjectDetails && getProjectDetails();
    }, [showProjectDetails]);
    // useEffect(() => {
    //     console.log('AllData', allData);
    // }, [allData]);

    const tabItems = [
        { label: "Address", require: false, details: <AddressDetailsTab projectId={projectId} /> },
        { label: "Site Employee", require: false, details: <SiteEmployeeTab /> },
        { label: "Property Types", require: true, details: <PropertyTypesTab /> },
        { label: "Configuration", require: false, details: <ConfigurationTab /> },
        { label: "Project Details", require: false, details: <ProjectDetails /> },
        { label: "Amenities", require: false, details: <Amenities /> },
        { label: "Payment Plan", require: false, details: <PaymentPlan /> },
        // { label: "Remarks", require: false },
        // { label: "Community Posts", icon: <TeamOutlined />, details: <CommunityPost /> },
    ];

    return (
        <div className='h-full w-full'>
            <Box sx={{ width: "100%", backgroundColor: "#fdfdfd", paddingLeft: 3, }} className='h-full flex flex-col gap-2 p-6'>
                <div className='flex flex-col justify-start'>
                    <p className='text-2xl font-normal'>
                        {showProjectDetails ? `Check Project Details` : 'New Project'}
                    </p>
                </div>
                <hr />
                <Form
                    layout="inline"
                    labelAlign='left'
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{ marginTop: 20 }}
                // className='flex flex-wrap gap-12 justify-start items-start'
                >
                    {showProjectDetails ?
                        dataFetched && Column?.map((field, index) => {
                            return (
                                <Form.Item
                                    // labelAlign='vertical'
                                    key={index}
                                    label={
                                        <p style={{
                                            fontSize: "14px", fontWeight: "500", letterSpacing: 0.3,
                                            // color: field.required ? 'red' : ''
                                        }}>
                                            {field.field}

                                        </p>
                                    }
                                    name={field.field}
                                    rules={[
                                        { labelAlign: 'right', required: field.required, message: `${field.field} is required`, },
                                    ]}
                                    initialValue={field.name == 'projectName' ? allData.projectName : allData.propertyType}
                                >
                                    {renderFieldBox(field)}
                                </Form.Item>
                            )
                        })
                        : Column?.map((field, index) => {
                            return (
                                <Form.Item
                                    // labelAlign='vertical'
                                    key={index}
                                    label={
                                        <p style={{
                                            fontSize: "14px", fontWeight: "500", letterSpacing: 0.3,
                                            // color: field.required ? 'red' : ''
                                        }}>
                                            {field.field}

                                        </p>
                                    }
                                    name={field.field}
                                    rules={[
                                        { labelAlign: 'right', required: field.required, message: `${field.field} is required`, },
                                    ]}
                                >
                                    {renderFieldBox(field)}
                                </Form.Item>
                            )
                        })
                    }
                </Form>

                <Tabs
                    style={{ width: "100%", marginTop: '6px' }}
                    defaultActiveKey={defaultActiveTab}
                    items={tabItems.map((item, i) => ({
                        key: String(i + 1),
                        label: item.label, //+ (item.require ? '*' : ''),
                        children: item.details,
                        // icon: item.icon,
                    }))}
                />
                {/* <hr /> */}
                <div className='mt-2 flex gap-2 justify-start items-center'>
                    <Button
                        type="primary"
                        key="submit"
                    // style={{ backgroundColor: "#fb4f44" }}
                    // onClick={submitForm}
                    >
                        Save
                    </Button>
                    <Button
                        type="default"
                        key="back"
                        onClick={handleBack}
                    >
                        Cancel
                    </Button>
                </div>
                <hr />
            </Box>
        </div>
    )
}
export default AddProject;
