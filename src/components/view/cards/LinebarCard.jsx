import React, { useState } from 'react';
import { Card, Flex, Progress, Tooltip, Table, Dropdown } from 'antd';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Selection from '../dashboard/Selection';
import DemoCurve from '../DemoCurve';

const LinebarCard = ({
    title,
    headerColor,
    isSelectable,
    cardHeight,
    cardWidth,
    contentWidth,
    barHeader,
    totalPercentage,
    successPercentage,
    barType,
    options,
    handleChange,
    defaultValue,
    selectableWidth,
    tableColumn,
    dataSource,
    curveData,
    footerLeft,
    footerRight,
    currentAmount,
    dueAmount
}) => {
    const [amount, setAmount] = useState(1000000);

    // const items = [ //Commented
    //     { label: 1000000, value: 2000000, key: "1", onClick: (e) => { console.log("Clicked", e.item.props.value) } },
    //     { label: 2000000, key: "2" },
    //     { label: 3000000, key: "3" },
    // ];

    return (
        <Card
            title={
                <div className='flex items-center'>
                    {title}
                    <IconButton
                        size='small'
                    >
                        <Tooltip
                            title={title}
                        >
                            <HelpOutlineOutlinedIcon fontSize='25px' style={{ fill: 'green' }} />
                        </Tooltip>
                    </IconButton>
                </div>
            }
            bordered={false}
            // headStyle={{ backgroundColor: headerColor, }}
            styles={{ header: { backgroundColor: headerColor } }}
            extra={
                !isSelectable ?
                    (<Tooltip title="Add New">
                        <IconButton size='small'>
                            <AddCircleOutlineOutlinedIcon fontSize='small' style={{ fill: 'blue' }} />
                            &nbsp;
                            <span className='text-black text-sm font-semibold'>New</span>
                        </IconButton>
                    </Tooltip>)
                    : (<Selection
                        onChange={handleChange}
                        defValue={defaultValue}
                        options={options}
                        width={selectableWidth}
                    />)
            }
            // Use cardHeight & cardWidth Prop If Custom Size Needed...............Added By IB
            style={{ height: cardHeight, width: cardWidth, boxShadow: "1px 1px 4px #d3d1b8" }}
        >
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    {isSelectable ?
                        barType == "chart" ?
                            <DemoCurve data={curveData} width={contentWidth} />
                            :
                            barType == "line" ?
                                (<Flex gap="small">
                                    <Tooltip title={title}>
                                        <div className='text-sm font-semibold text-gray-500'>
                                            {barHeader + " " + dueAmount}
                                        </div>
                                        <Progress
                                            style={{ width: contentWidth }}
                                            // trailColor='#eac20f'
                                            percent={successPercentage}
                                            success={{
                                                percent: successPercentage
                                            }}
                                            type={barType}
                                        />
                                    </Tooltip>
                                    {barType == "circle" && <Flex wrap gap="small">
                                        <Progress type="dashboard" percent={successPercentage} success={{ percent: successPercentage }} />
                                    </Flex>}
                                </Flex>)
                                :
                                <Table style={{ width: contentWidth }} columns={tableColumn} dataSource={dataSource} rowKey={record => record.key} pagination={false} />
                        :
                        (<Flex gap="small">
                            <Tooltip title={title}>
                                <div className='text-sm font-semibold text-gray-500'>
                                    {barHeader + " " + dueAmount}
                                </div>
                                <Progress
                                    style={{ width: contentWidth }}
                                    // trailColor='#eac20f'
                                    percent={successPercentage}
                                    success={{
                                        percent: successPercentage
                                    }}
                                    type={barType}
                                />
                            </Tooltip>
                            {barType == "circle" && <Flex wrap gap="small">
                                <Progress type="dashboard" percent={successPercentage} success={{ percent: successPercentage }} />
                            </Flex>}
                        </Flex>)
                    }
                </div>

                {isSelectable && barType && <hr />}

                {isSelectable && barType && <div className='flex justify-around items-center'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-sm text-blue-600'>{footerLeft}</p>
                        <p className='text-lg font-bold'>{currentAmount}</p>
                    </div>
                    <hr style={{width: "1px", height: "40px", display: "inline-block", 
                        backgroundColor: "#E5E7EB",}}/>
                    <div className='flex justify-center items-start flex-col'>
                        <p className='text-sm text-red-600 text-left'>{footerRight}</p>
                        <div className='text-lg font-bold flex justify-center items-center'>
                            <p>{dueAmount}</p>
                            <ArrowDropDownOutlinedIcon className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                }
            </div>
        </Card>
    )
}
export default LinebarCard;
