const Notification = ( {name} ) => {
	if (name === null)
		return null

	const notificationStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	return (
		<div style={notificationStyle}>
			Added {name}
		</div>
	)
}

export default Notification