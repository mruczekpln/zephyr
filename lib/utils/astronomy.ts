import { MoonPhaseMessage } from '../../types/index..dts'

const moonPhases: MoonPhaseMessage[] = [
	{
		from: 0.0,
		to: 0.002,
		text: 'New Moon'
	},
	{
		from: 0.002,
		to: 0.25,
		text: 'Waxing Crescent'
	},
	{
		from: 0.25,
		to: 0.252,
		text: 'First Quarter'
	},
	{
		from: 0.252,
		to: 0.5,
		text: 'Waxing Gibbous'
	},
	{
		from: 0.5,
		to: 0.502,
		text: 'Full Moon'
	},
	{
		from: 0.502,
		to: 0.75,
		text: 'Waning Gibbous'
	},
	{
		from: 0.75,
		to: 0.752,
		text: 'Last Quarter'
	},
	{
		from: 0.752,
		to: 1.0,
		text: 'Waning Crescent'
	}
]

const getMoonPhase = (degree: number): string => {
	if (degree < 0 || degree > 1) {
		return 'Invalid Moon Phase'
	}

	let phaseText = 'Unknown'

	for (const phase of moonPhases) {
		if (degree >= phase.from && degree <= phase.to) {
			phaseText = phase.text
			break
		}
	}

	return phaseText
}

export { getMoonPhase }
