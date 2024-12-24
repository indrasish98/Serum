import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Checkbox } from 'antd';

const ConfigurationTab = () => {
    const [allDetails, setAllDetails] = useState({
        gstTreatment: '',
        supplyPlace: '',
        pan: '',
        taxPreference: '0',
        currency: '',
        openingBalace: '',
        paymentTerms: '',
        priceList: '',
    });
    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log("Name", name, value)
        // setAllDetails({ ...allDetails, [name]: value })        
    }
    const handleChecked = (e) => {
        console.log("Checked", e)
    }
    const column = [
        {
            field: 'GST Treatment',
            required: true,
            field_type: 'dropdown',
            option: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }]
        },
        {
            field: 'Place Of Supply',
            required: true,
            field_type: 'dropdown',
            option: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }]
        },
        {
            field: 'PAN',
            required: false,
            field_type: 'text'
        },
        {
            field: 'Tax Preference',
            required: true,
            field_type: 'radio',
            option: [{ value: '0', label: 'Taxable' }, { value: '1', label: 'Tax Exempt' }]
        },
        {
            field: 'Currency',
            required: false,
            field_type: 'dropdown',
            option: [{ value: '0', label: '₹' }, { value: '1', label: '$' }]
        },
        {
            field: 'Opening Balance',
            required: false,
            field_type: 'mixed',
            option: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }]
        },
        {
            field: 'Payment Terms',
            required: false,
            field_type: 'dropdown',
            option: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }]
        },
        {
            field: 'Price List',
            required: false,
            field_type: 'dropdown',
            option: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }]
        },
    ];

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
                    <Input
                        defaultValue={""}
                        style={{ width: 350 }}
                        type="text"
                        onChange={handleChange}
                    />
                );
            case "number":
                return (
                    <Input
                        // defaultValue={field.value}
                        style={{ width: 200 }}
                        type="number"
                        onChange={handleChange}
                    />,
                    <Input
                        // defaultValue={field.value}
                        style={{ width: 200 }}
                        type="number"
                        onChange={handleChange}
                    />
                );
            case "radio":
                return (
                    <div className='flex gap-4' key={field.field}>
                        <Radio.Group name='taxPreference' onChange={handleChange} value={allDetails.taxPreference}>
                            {field.option.map(opt => {
                                return (
                                    <Radio key={opt.value} value={opt.value}>{opt.label}</Radio>
                                )
                            })}
                        </Radio.Group>
                    </div>
                );
            case "mixed":
                return (
                    <div className='flex gap-10'>
                        <Select style={{ width: 150 }} defaultValue='Corporate Office'
                            options={[{ value: '0', label: 'A' }, { value: '1', label: 'B' }, { value: 2, label: 'C' }]} />
                        <Input addonBefore={'INR'} style={{ width: 170 }} placeholder='' type='text' onChange={''} />
                    </div>
                );
            case "dropdown":
                return (
                    <Select
                        style={{ width: 350 }}
                        placeholder={field.field == 'GST Treatment' && 'Select a ' + field.field}
                        options={field.option}
                        onChange={handleChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='mt-4 flex flex-col gap-10'>
            {/* <Form
                layout="horizontal"
                labelAlign='left'
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{ marginTop: 20 }}
            // className='flex flex-col flex-wrap gap-2 justify-start items-start'
            >
                {column?.map((field, index) => {
                    return (
                        <Form.Item
                            key={index}
                            label={
                                <p style={{
                                    fontSize: "14px", fontWeight: "500", letterSpacing: 0.3,
                                    color: field.required ? 'red' : ''
                                }}>
                                    {field.field}
                                    {field.required && <span style={{ color: "red" }}> *</span>}
                                </p>
                            }
                            name={field.field}
                        // rules={[
                        //     { required: true, message: `${field.name} is required` },
                        // ]}
                        >
                            {renderFieldBox(field)}
                        </Form.Item>
                    )
                })}
            </Form> */}
            <p className='text-xl'>Configure Room Type</p>
            <Checkbox.Group onChange={handleChecked} className='flex gap-8'>
                <Checkbox value='1 Room Kitchen1'>1 Room Kitchen</Checkbox>
                <Checkbox value='Studio Appartment'>Studio Appartment</Checkbox>
                <Checkbox value='1 BHK'>1 BHK</Checkbox>
                <Checkbox value='2 BHK'>2 BHK</Checkbox>
                <Checkbox value='2.5 BHK'>2.5 BHK</Checkbox>
                <Checkbox value='3 BHK'>3 BHK</Checkbox>
                <Checkbox value='3.5 BHK'>3.5 BHK</Checkbox>
                <Checkbox value='4 BHK'>4 BHK</Checkbox>
            </Checkbox.Group>
        </div>
    )
}
export default ConfigurationTab; 
