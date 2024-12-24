import React from 'react';
import { Checkbox } from 'antd';

const Amenities = () => {
    const allAmenites = [
        "CCTV Camera Security",
        "Gymnasium",
        "24x7 Security",
        "Reflexology Park",
        "Gated Community",
        "Visitors Parking",
        "Landscape Garden",
        "Jogging Track",
        "Swimming Pool",
        "Amphitheatre",
        "Indoor Games",
        "AC Community Hall",
        "Senior Citizen Seatout",
    ]
    const handleChecked = (e) => {
        console.log("Checked", e);
    }
    return (
        <div className='mt-2 flex flex-col gap-4'>
            <p className='text-lg'>Add Amenity Detals</p>
            <Checkbox.Group
                className='flex gap-6'
                options={allAmenites}
                // defaultValue={['CCTV Camera Security']}
                onChange={handleChecked}
            />
        </div>
    )
}
export default Amenities;