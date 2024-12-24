import React, { useState } from 'react';
import { Form, Input, Checkbox, Radio } from 'antd';

const PropertyTypesTab = () => {
    const [selected, setSelected] = useState('');
    const column = [
        {
            field: 'Customer ID',
            required: true,
            field_type: 'number',
        },
        {
            field: "Supplier's PAN",
            required: false,
            field_type: 'text',
        },
        {
            field: 'CIN',
            required: false,
            field_type: 'text'
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
                        style={{ width: 300 }}
                        type="text"
                    // onChange={(e) => updateFormField(e, null, field)}
                    />
                );
            case "number":
                return (
                    <Input
                        style={{ width: 300 }}
                        type='number'
                    />
                );
            default:
                return null;
        }
    };
    const handleSelection = (e) => {
        const { value } = e.target;
        // console.log("Selected", value);
        // setSelected(null);
        setSelected(value);
    }
    return (
        <div className='mt-4 flex flex-col gap-4'>
            {/* <Form
                layout="horizontal"
                labelAlign='left'
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{ marginTop: 10 }}
            >
                {column?.map((field, index) => {
                    return (
                        <div className='w-full flex flex-col' key={field.field}>
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
                        </div>
                    )
                })}
                <div className='mb-8 w-7/12 text-clip flex gap-2'>
                    <p className='text-md text-red-600'>Note:</p>
                    <span className='text-gray-600'>you can add traditional fields foryour Customers and Vendors
                        and have these show up on your PDF by going to Setting ➨ Preferences ➨ Customers and Vendors.
                        You can also refine the address format of your Customers and Vendors from there.

                    </span>
                </div>
            </Form> */}
            <p className='text-xl'>Property Type</p>
            <Radio.Group onChange={handleSelection} value={selected}>
                <Radio value='appartments'>Appartments</Radio>
                <Radio value='villas'>Villas</Radio>
                <Radio value='condos'>Condos</Radio>
                <Radio value='farmhouses'>Farm Houses</Radio>
            </Radio.Group>
        </div>
    )
}
export default PropertyTypesTab;