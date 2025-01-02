import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { MakeApicallWithoutToken } from '../../../../api/MakeApiCall';
import axios from 'axios';

const Amenities = ({ projectId, existingProject }) => {
    const [checkedValues, setCheckedValues] = useState();
    const [isFetched, setIsFetched] = useState(false);

    const allAmenities = [
        { value: 'cctv', label: "CCTV Camera Security" },
        { value: 'gymnesium', label: "Gymnasium" },
        { value: 'security', label: "24x7 Security" },
        { value: 'reflexologyPark', label: "Reflexology Park" },
        { value: 'gatedCommunity', label: "Gated Community" },
        { value: 'visitorParking', label: "Visitors Parking" },
        { value: 'landscapeGarden', label: "Landscape Garden" },
        { value: 'joggingTrack', label: "Jogging Track" },
        { value: 'swimmingPool', label: "Swimming Pool" },
        { value: 'amphithetre', label: "Amphitheatre" },
        { value: 'indorGame', label: "Indoor Games" },
        { value: 'acCommunityHall', label: "AC Community Hall" },
        { value: 'seniorCitizenSeatOut', label: "Senior Citizen Seatout" },
    ]
    const getAllAmenityDetails = async () => {
        try {
            const response = await MakeApicallWithoutToken(`amenity/${projectId}`, 'GET');
            if (response?.success) {
                // console.log('Response', response);
                let selectedValues = Object.entries(response.data).filter(([key, value]) => value === true)
                    .map(([key, value]) => key);
                // console.log('True Values Are', selectedValues);
                setCheckedValues(selectedValues);
                setIsFetched(true);
            }
        } catch (err) {
            console.error('Error while making api call', err);
        }
    }
    const handleChecked = (e) => {
        // console.log("Checked", e);
        setCheckedValues(e);
    }
    const handleSubmit = async () => {
        try {
            const payload = checkedValues.reduce((acc, cur) => {
                console.log("In Reduce", cur)
                acc[cur] = true;
                return acc;
            }, {});
            console.log('Payload', payload);
            const response = await MakeApicallWithoutToken(`amenity/update/${projectId}`, 'PATCH', payload);
            if (response?.success) {
                console.log('Api Call Successfull');
            }
        } catch (err) {
            console.error('Error while making api call', err);
        }
    }
    useEffect(() => {
        existingProject && getAllAmenityDetails();
    }, []);
    useEffect(() => {
        console.log("####", checkedValues);
    }, [checkedValues])
    return (
        <div className='mt-2 flex flex-col gap-4'>
            <p className='text-lg'>Add Amenity Details</p>
            {existingProject ?
                isFetched && <Checkbox.Group
                    className='flex gap-6'
                    options={allAmenities}
                    onChange={handleChecked}
                    defaultValue={checkedValues}
                /> :
                <Checkbox.Group
                    className='flex gap-6'
                    options={allAmenities}
                    onChange={handleChecked}
                />
            }
            {/* <button onClick={handleSubmit}>Save</button> */}
        </div>
    )
}
export default Amenities;