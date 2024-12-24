import React, { useState } from 'react';
import { Avatar, Card, Dropdown, Table, Input, Button, Badge } from 'antd';
import IconButton from '@mui/material/IconButton';
import Selection from './Selection';
import DemoCurve from '../DemoCurve';
import { SettingOutlined } from '@ant-design/icons';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import Box from "@mui/material/Box";
import LinebarCard from '../cards/LinebarCard';

const Dashboard = () => {
    const [curveData, setCurveData] = useState(["-3", "-5", "0", "5", "7", "-6", "2", "8", "12", "14", "4", "-8"]);
    const [franchiseSelect, setFranchiseSelect] = useState(10);
    const options = [
        {
            value: "-3, -5, 0, 5, 7, -6, 2, 8, 12, 14, 4, -8",
            label: 'YEAR-2022',
        },
        {
            value: "-1, -5, 0, 5, 3, 6, 10, 4, -2, -7, 1, 14",
            label: 'YEAR-2023',
        },
        {
            value: "3, 5, 9, 4, -2, -6, -12, -5, 3, 9, 15, 7",
            label: 'YEAR-2024',
        },
    ];

    const tableColumn = [
        {
            title: 'No.',
            dataIndex: 'number',
            key: 'number',
            headerAlign: "center",
            align: "center"
        },
        {
            title: 'Franchise Name',
            dataIndex: 'name',
            key: 'name',
            headerAlign: "center",
            align: "center"
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            headerAlign: "center",
            align: "center"
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'amount',
            headerAlign: "center",
            align: "center"
        },
    ];
    const dataSource = [
        {
            key: '1',
            number: 1,
            name: 'Dummy Name',
            location: "XYZ, Dummy",
            Amount: 100000,
        },
        {
            key: '2',
            number: 2,
            name: 'Dummy Name',
            location: "XYZ, Dummy",
            Amount: 100000,
        },
    ]

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        setCurveData(value.split(","))
    };

    // const items = [
    //     {
    //         label: (
    //             <p><PersonIcon /> &nbsp; Profile</p>
    //         ),
    //         key: '0',
    //     },
    //     {
    //         label: (
    //             <p><LogoutOutlinedIcon /> &nbsp; Logout</p>
    //         ),
    //         key: '1',
    //     },
    // ];

    // const languages = ['English', ' हिंदी', 'বাংলা', '日本語', 'español', '中文'];
    

    return (
        <div className='h-full w-full'>
            <div className='flex flex-col h-full'>
                {/* <Header /> */}
                <div className='px-4 w-full h-20 flex justify-between items-center gap-4'
                // style={{
                //     height: '75px',
                //     backgroundImage: `url(${imageURL})`,
                //     backgroundSize: "fill",
                //     // opacity: 0.5
                // }}
                >
                    <div className='flex justify-center items-center gap-3'>
                        <Avatar
                            style={{
                                backgroundColor: "#f56a00",
                                verticalAlign: 'middle',
                            }}
                            size="large"
                            src='https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                            gap={10}
                        />
                        <div className='flex flex-col justify-start items-start'>
                            <h1 className='text text-2xl font-semibold'>Hello, Indrasish</h1>
                            <div className='flex justify-start items-center gap-1'>
                                <PlaceIcon className='cursor-pointer' fontSize='small' style={{fill:'blue'}}
                                onClick= {() => window.alert("Alert")} />
                                <p className='text-sm font-light'>Sector 3, Kolkata, WB</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-end flex-col'>
                        <div className='flex justify-center items-end flex-col'>
                            <p className='text-sm font-normal'>Serum Helpline: <span className='font-bold'>1800000000</span></p>
                            <p className='text-xs text-gray-400'>Mon - Fri ● 9.00 AM - 7.00 PM ● Toll Free</p>
                        </div>
                        {/* <div className='flex gap-2'>
                            {languages.map(lang =>
                                <p className='text-sm text-gray-400 cursor-pointer'>{lang},</p>
                            )}
                        </div> */}
                    </div>
                </div>
                <hr />
                <Box sx={{ width: "100%", paddingX: "15px", marginTop: "10px" }}>
                    <div className='px-1 h-full w-full flex gap-10 flex-wrap'>   {/* grid grid-cols-2 */}
                        {/* <Card
                            title="Collections"
                            bordered={false}
                            headStyle={{ backgroundColor: '#d5d4d3', }}
                            extra={<Selection
                                // onChange={handleChange}
                                defValue={"This Fiscal Year"}
                                options={[
                                    { value: "1", label: "This Fiscal Year" },
                                    { value: "2", label: "Previous Fiscal Year" },
                                    { value: "3", label: "Last 12 Months" },
                                    { value: "4", label: "Last 6 Months" },
                                ]}
                                width={180}
                            />}
                            style={{ height: 150, width: 350 }}
                        >
                            <p className='text-2xl text-center'>Rs. 10000</p>
                        </Card> */}
                        {/* <Card
                            title="Sample Collected"
                            bordered={false}
                            headStyle={{ backgroundColor: '#d5d4d3', }}
                            extra={<Selection
                                // onChange={handleChange}
                                defValue={"Today"}
                                options={[
                                    { value: "1", label: "Today" },
                                    { value: "2", label: "This Week" },
                                    { value: "3", label: "This Month" },
                                ]}
                                width={120}
                            />}
                            style={{ height: 150, width: 350 }}
                        >
                            <p className='text-2xl text-center'>20 Samples Collected</p>
                        </Card> */}
                        {/* <Card
                            title="Franchise Added"
                            bordered={false}
                            headStyle={{ backgroundColor: '#d5d4d3', }}
                            extra={
                                <IconButton
                                    //  variant="primary"
                                    size='small'
                                >
                                    <AddCircleOutlineOutlinedIcon fontSize='small' />
                                    <span className='text-xs'>New</span>
                                </IconButton>
                            }
                            style={{ height: 150, width: 350 }}
                        >
                            <p className='text-2xl text-center'>{`${franchiseSelect} Franchise Added`}</p>
                        </Card> */}
                        {/* <Card
                            title="Best Performing Franchise"
                            bordered={false}
                            headStyle={{ backgroundColor: '#d5d4d3', }}
                            extra={<Selection
                                // onSearch={onSearch}
                                // onChange={handleChange}
                                defValue={"This Month"}
                                options={[
                                    { value: "1", label: "This Month" },
                                    { value: "2", label: "This Week" },
                                    { value: "3", label: "This Year" }
                                ]}
                                width={120}
                            />}
                            style={{ height: 300, width: 600 }}
                        >
                            <Table columns={tableColumn} dataSource={dataSource} rowKey={record => record.key} pagination={false} />
                        </Card> */}


                        {/* //////// Customize Card Component */}
                        <div>
                            <LinebarCard
                                title="Collections"
                                headerColor="#f4f4f4"
                                // cardHeight={200}
                                cardWidth={350}
                                contentWidth={300}
                                barHeader={`Total Unpaid Invoices`}
                                totalPercentage={100}
                                successPercentage={65.5}
                                barType="line"
                                isSelectable={true}
                                options={[
                                    { value: "1", label: "This Fiscal Year" },
                                    { value: "2", label: "Previous Fiscal Year" },
                                    { value: "3", label: "Last 12 Months" },
                                    { value: "4", label: "Last 6 Months" },
                                ]}
                                selectableWidth={180}
                                defaultValue="This Fiscal Year"
                                currentAmount="₹0.00"
                                footerLeft="CURRENT"
                                footerRight="OVERDUE"
                                dueAmount="₹47,05,490.65"
                            />
                        </div>

                        <div>
                            <LinebarCard
                                title="Samples Collected"
                                headerColor="#f4f4f4"
                                // cardHeight={250}
                                cardWidth={350}
                                contentWidth={300}
                                totalPercentage={100}
                                successPercentage={80}
                                barType="line"
                                isSelectable={true}
                                options={[
                                    { value: "1", label: "Today" },
                                    { value: "2", label: "This Week" },
                                    { value: "3", label: "This Month" },
                                ]}
                                selectableWidth={120}
                                defaultValue="Today"
                                barHeader={`Samples To Collect`}
                                footerLeft="COLLECTED"
                                footerRight="PENDING"
                                currentAmount="1,04,713"
                                dueAmount="28,312"
                            />
                        </div>

                        <Card
                            title="Franchise Added"
                            bordered={false}
                            styles={{ header: { backgroundColor: '#f4f4f4' } }}
                            extra={
                                <IconButton
                                    //  variant="primary"
                                    size='small'
                                >
                                    <AddCircleOutlineOutlinedIcon fontSize='small' style={{ fill: 'blue' }} />
                                    <span className='text-black text-sm font-semibold'>New</span>
                                </IconButton>
                            }
                            style={{ height: 200, width: 340, boxShadow: "1px 1px 4px #d3d1b8" }}
                        >
                            <p className='text-2xl text-center'>{`${franchiseSelect} Franchise Added`}</p>
                        </Card>

                        <div>
                            <LinebarCard
                                title="Best Performing Franchise"
                                headerColor="#f4f4f4"
                                // cardHeight={250}
                                cardWidth={700}
                                contentWidth={600}
                                isSelectable={true}
                                options={[
                                    { value: "1", label: "This Month" },
                                    { value: "2", label: "This Week" },
                                    { value: "3", label: "This Year" }
                                ]}
                                // handleChange={handleChange} 
                                defaultValue='This Month'
                                selectableWidth={120}
                                tableColumn={tableColumn}
                                dataSource={dataSource}
                            />
                        </div>

                        {/* <div>
                            <LinebarCard
                                title="Graph Chart"
                                headerColor="#b5e38a"
                                // cardHeight={250}
                                cardWidth={600}
                                contentWidth={550}
                                isSelectable={true}
                                options={options}
                                defaultValue="YEAR-2022"
                                selectableWidth={120}
                                handleChange={handleChange}
                                barType="chart"
                                curveData={curveData}
                            />
                        </div> */}
                    </div>
                </Box>
            </div>
        </div >
    )
}
export default Dashboard;
