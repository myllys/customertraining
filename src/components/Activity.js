import React from 'react';
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import lodash from "lodash";

export default function Activity() {

    const [chart, setChart] = React.useState([]);
    
    React.useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setChart(lodash(responseData)
                    .groupBy(chart => chart.activity)
                    .map((value, key) => ({activity: key, totalamount: lodash.sumBy(value, 'duration')}))
                    .value());
            })
    }

    return (
        <div>
            <BarChart width={1160} height={400} data={chart}>
                <YAxis label={{value: 'Duration (Minutes)', angle: -90, position: 'insideLeft'}}/>
                <Bar dataKey="totalamount" fill="#FF0000"/>
                <XAxis dataKey="activity"/>
            </BarChart>
        </div>
    )
}