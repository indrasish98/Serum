import React, { useEffect, useState } from 'react';
import { Form, Input, Tooltip, Select } from 'antd';
import { MakeApicallWithoutToken } from '../../../../api/MakeApiCall';

const AddressDetailsTab = ({ projectId }) => {
    const countryApi = 'https://countriesnow.space/api/v0.1/countries';
    const [allCountries, setAllCountries] = useState([{
        value: '',
        label: '',
        cities: []
    }]);
    const [allCities, setAllCities] = useState([{
        value: '',
        label: ''
    }]);
    const getAllCountries = async () => {
        try {
            const response = await fetch(countryApi);
            const data = await response.json();
            const countries = data.data;
            // console.log('Countries', countries);
            setAllCountries(countries.map(country => ({
                // console.log("Cont", country)
                value: country.country,
                label: country.country,
                cities: country.cities
            })));
        }
        catch (e) {
            console.error("Error In Fetching", e);
        }
    }
    const getAddressDetails = async () => {
        try {
            const response = await MakeApicallWithoutToken(`project/${projectId}`, 'GET');
            if (response?.success) {
                const apiData = { ...response.data };
                console.log("ApiData", apiData);
                setAllData(apiData);
                setnewProject(true);
            }
        } catch (err) {
            console.error('Error making api call', err);
        }
    }
    const [allData, setAllData] = useState({
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
    });
    const [newProject, setnewProject] = useState(false);
    const column = [
        // {
        //     field: 'Attention',
        //     required: true,
        //     field_type: 'text',
        // },
        {
            field: 'Address',
            required: true,
            field_type: 'textarea',
            name: 'address'
        },
        {
            field: 'Country/Region',
            required: true,
            field_type: 'dropdown',
            name: 'country',
            option: [{ value: 'India', label: 'India' }, { value: 'USA', label: 'USA' }]
        },
        {
            field: 'State',
            required: true,
            field_type: 'dropdown',
            name: 'state',
            option: [{ value: '1', label: 'A' }, { value: '2', label: 'B' }]
        },
        {
            field: 'City',
            required: true,
            field_type: 'text',
            name: 'city'
        },
    ];
    const handleChange = (e, selected, name) => {
        const value = selected ?? e.target.value;
        setAllData({ ...allData, [name]: value });
    }

    const renderFieldBox = (field) => {
        switch (field.field_type) {
            case "text":
                if (field.field === "description") {
                    return (
                        <ContentEditor
                            initialData={""}
                        // onChange={handleEditorChange}
                        />
                    );
                }
                return (
                    field.name == 'city' ?
                        <Tooltip title={allData.state != '' ? '' : 'City will be auto-selected'} placement='right'>
                            <Input
                                // defaultValue={""}
                                style={{ width: 300 }}
                                type="text"
                                value={allData?.state}
                                disabled={true}
                            // onChange={(e) => handleChange(e, null, field.name)}
                            />
                        </Tooltip>
                        :
                        <Input
                            defaultValue={""}
                            style={{ width: 300 }}
                            type="text"
                            onChange={(e) => handleChange(e, null, field.name)}
                        />
                );
            case "textarea":
                return (
                    <div className='flex flex-col gap-2'>
                        <Input.TextArea rows={2} placeholder='Street 1' style={{ width: 500 }}
                            onChange={(e) => handleChange(e, null, 'address_1')}
                        />
                        <Input.TextArea rows={2} placeholder='Street 2' style={{ width: 500 }}
                            onChange={(e) => handleChange(e, null, 'address_2')}
                        />
                    </div>
                );
            case "dropdown":
                return (
                    field.name == 'country' ?
                        <Select
                            showSearch
                            style={{ width: 300 }}
                            placeholder={'Select'}
                            options={allCountries}
                            onChange={(e) => handleChange(null, e, field.name)}
                        /> :
                        <Tooltip title={allCities?.length > 0 ? '' : 'Select Country First'} placement='right'>
                            <Select
                                showSearch
                                style={{ width: 300 }}
                                placeholder={'Select'}
                                defaultValue={''}
                                options={allCities}
                                disabled={allCities?.length > 0 ? false : true}
                                onChange={(e) => handleChange(null, e, field.name)}
                            />
                        </Tooltip>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        console.log('Project ID', projectId);
        projectId && getAddressDetails();
        getAllCountries();
    }, []);
    useEffect(() => {
        // console.log("data", allData);
        allCountries.map(country => country.value == allData.country && setAllCities(
            country.cities.map(city => ({ label: city, value: city }))
        ))
    }, [allData.country]);
    useEffect(() => {
        console.log("Data", allData)
    }, [allData]);

    return (
        <div className='w-4/5 flex'>
            <Form
                layout="horizontal"
                labelAlign='left'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{ marginTop: 10 }}
            >
                <div className='mb-8'>
                    <p className='text-2xl font-normal'>Site Address</p>
                </div>

                {!newProject ?
                    column?.map((field, index) => {
                        return (
                            <div className='w-full flex flex-col' key={index}>
                                <Form.Item
                                    key={index}
                                    label={
                                        <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                            {field.field}
                                            {/* {field.required && <span style={{ color: "red" }}> *</span>} */}
                                        </p>
                                    }
                                    name={field.name}
                                    rules={[
                                        { required: true, message: `${field.name} is required` },
                                    ]}
                                    initialValue={
                                        projectId != null ?
                                            field.name == 'city' ? allData?.city :
                                                field.name == 'state' ? allData?.state :
                                                    field.name == 'country' ? allData?.country :
                                                        field.name == 'address' ? allData?.street1 : ''
                                            : ''
                                    }
                                >
                                    {renderFieldBox(field)}
                                </Form.Item>
                            </div>
                        )
                    }) :
                    column?.map((field, index) => {
                        return (
                            <div className='w-full flex flex-col' key={index}>
                                <Form.Item
                                    key={index}
                                    label={
                                        <p style={{ fontSize: "14px", fontWeight: "500", letterSpacing: 0.3 }}>
                                            {field.field}
                                            {/* {field.required && <span style={{ color: "red" }}> *</span>} */}
                                        </p>
                                    }
                                    name={field.name}
                                    rules={[
                                        { required: true, message: `${field.name} is required` },
                                    ]}
                                >
                                    {renderFieldBox(field)}
                                </Form.Item>
                            </div>
                        )
                    })
                }
            </Form>
        </div>
    )
}
export default AddressDetailsTab;
