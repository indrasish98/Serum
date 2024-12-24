import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';

export default function DemoCurve({data, width}) {
    const yData = ['10k', '5k', '0k', '-5k', '-10k', '-15k', '-25k'];    
    const xData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return (
        <div>
            <Stack sx={{ padding: 1, width: '95%', border: 1}}>
                <LineChart
                    xAxis={[{ data: xData, scaleType: 'point' }]}
                    yAxis={[{ data: yData,
                        colorMap: {
                            type: 'piecewise',
                            thresholds: [0, 20],
                            colors: ['#ee1913', '#41c436'], // red & green
                        }
                    }]}
                    series={[{ data, area: true, }]}
                    height={200}
                    width={width}
                    margin={{ top: 7, bottom: 25 }}                    
                />
            </Stack>
        </div>
    );
}
