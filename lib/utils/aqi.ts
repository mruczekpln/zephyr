import { AQIMessage } from '../../types/index..dts'

const messages: AQIMessage[] = [
	{
		from: 0,
		to: 50,
		grade: 'Good',
		text: 'Enjoy your usual outdoor activities.'
	},
	{
		from: 51,
		to: 100,
		grade: 'Moderate',
		text: 'Enjoy your usual outdoor activities.'
	},
	{
		from: 101,
		to: 150,
		grade: 'Unhealthy for Sensitive Groups',
		text: 'Sensitive individuals may experience health effects. The general public is not likely to be affected.'
	},
	{
		from: 151,
		to: 200,
		grade: 'Unhealthy',
		text: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
	}
]

function getMessageByAqi(aqi: number): AQIMessage {
	return (
		messages.find(message => {
			const { from, to } = message
			return aqi >= from && aqi <= to
		}) || messages[0]
	)
}

export { getMessageByAqi }
