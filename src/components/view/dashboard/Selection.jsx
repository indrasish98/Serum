import React from 'react';
import { Select } from 'antd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({onChange, options, width, defValue}) => (
  <Select
    defaultValue={defValue}
    onChange={onChange}
    options={options}
    variant="borderless"
    style={{width: width}}
    suffixIcon= {<KeyboardArrowDownIcon fontSize='small' style={{fill: "blue"}} />}
  />
);
export default Selection;