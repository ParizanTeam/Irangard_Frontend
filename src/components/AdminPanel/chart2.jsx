import './chart.scss';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Legend } from 'recharts/lib/component/Legend';

function Chart({ title, data, dataKey, grid }) {

    return (
        <div className='chart' style={{backgroundColor:'black'}}>
            {/*<h3 className='chartTitle'>{title}</h3>*/}
            <ResponsiveContainer width="100%" aspect ={4/1} style={{backgroundColor:'white'}}>
                <LineChart data={data}>
                    <XAxis dataKey="added_daily_user" stroke="#0ff" />
                        <Line type="monotone" dataKey={dataKey} stroke="#0ff"/>
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#464646" strokeDasharray="3 3"/>}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart;
