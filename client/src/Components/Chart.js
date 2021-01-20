import { Chart as GoogleChart } from "react-google-charts";
import LoadingGif from '../loading.gif';
//https://stackoverflow.com/questions/37176219/how-to-change-google-chart-title-font-size

const Chart = ({ title, datas }) => (
	<section className='diagram'>
		<GoogleChart
			height={'100%'}
			chartType="LineChart"
			loader={<img className='loading' src={LoadingGif} alt='Loading...' />}
			// data={[ ['x', title], ...datas ]}
			columns={['x', title]}
			rows={[...datas]}
			options={{
				title: `${title}, az elmúlt egy hét adatai:`,
				titleTextStyle: {
					color: '#ffffff',
					fontSize: 14
				},
				hAxis: {
					// title: 'Az elmúlt egy hét adatai',
					textStyle: {
						color: '#ffffff'
					}
				},
				vAxis: {
					textStyle: {
						color: '#ffffff'
					}
				},
				pointSize: 4,
				curveType: 'function',
				colors: ['#00dd00'],
				backgroundColor: 'transparent',
				legend: 'none',
			}}
			rootProps={{ 'data-testid': '1' }}
		/>
	</section>
)

export default Chart;