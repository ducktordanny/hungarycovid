import { Chart as GoogleChart } from "react-google-charts";
import LoadingGif from '../loading.gif';

const Chart = ({ title, datas }) => (
	<GoogleChart
		height={'400px'}
		chartType="LineChart"
		loader={<img className='loading' src={LoadingGif} alt='Loading...' />}
		// data={[ ['x', title], ...datas ]}
		columns={['x', title]}
		rows={[...datas]}
		options={{
			title: title,
			hAxis: {
				title: 'Az elmúlt egy hét adatai',
				viewWindow: { min: 0 }
			},
			pointSize: 3,
			curveType: 'function',
			colors: ['#990000'],
			backgroundColor: 'transparent',
			legend: 'none',
		}}
		rootProps={{ 'data-testid': '1' }}
	/>
)


export default Chart;