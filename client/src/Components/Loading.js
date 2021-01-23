import LoadingGif from '../loading.gif';

const Loading = () => (
		<img style={{
			width: '35px',
			padding: '50px',
			position: 'relative',
			display: 'inline-block',
			left: '50%',
			transform: 'translateX(-50%)',
		}} src={LoadingGif} alt='Loading...' />
)

export default Loading;