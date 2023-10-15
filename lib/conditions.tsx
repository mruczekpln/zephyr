import {
	CloudSnow,
	CloudHail,
	CloudFog,
	Tornado,
	Snowflake,
	CloudLightning,
	Haze,
	CloudDrizzle,
	CloudMoonRain,
	CloudRain,
	CloudRainWind,
	CloudMoon,
	Waves,
	Cloudy,
	CloudSun,
	Sun
} from 'lucide-react'
import { ReactElement } from 'react'
import { Condition } from './types'

const Conditions: Condition[] = [
	{ id: 'type_1', desc: 'Blowing Or Drifting Snow', icon: <CloudSnow /> },
	{ id: 'type_10', desc: 'Heavy Freezing Drizzle/Freezing Rain', icon: <CloudHail /> },
	{ id: 'type_11', desc: 'Light Freezing Drizzle/Freezing Rain', icon: <CloudHail /> },
	{ id: 'type_12', desc: 'Freezing Fog', icon: <CloudFog /> },
	{ id: 'type_13', desc: 'Heavy Freezing Rain', icon: <CloudHail /> },
	{ id: 'type_14', desc: 'Light Freezing Rain', icon: <CloudHail /> },
	{ id: 'type_15', desc: 'Funnel Cloud/Tornado', icon: <Tornado /> },
	{ id: 'type_16', desc: 'Hail Showers', icon: <CloudHail /> },
	{ id: 'type_17', desc: 'Ice', icon: <Snowflake /> },
	{ id: 'type_18', desc: 'Lightning Without Thunder', icon: <CloudLightning /> },
	{ id: 'type_19', desc: 'Mist', icon: <Haze /> },
	{ id: 'type_2', desc: 'Drizzle', icon: <CloudDrizzle /> },
	{ id: 'type_20', desc: 'Precipitation In Vicinity', icon: <CloudMoonRain /> },
	{ id: 'type_21', desc: 'Rain', icon: <CloudRain /> },
	{ id: 'type_22', desc: 'Heavy Rain And Snow', icon: <CloudSnow /> },
	{ id: 'type_23', desc: 'Light Rain And Snow', icon: <CloudSnow /> },
	{ id: 'type_24', desc: 'Rain Showers', icon: <CloudRainWind /> },
	{ id: 'type_25', desc: 'Heavy Rain', icon: <CloudRain /> },
	{ id: 'type_26', desc: 'Light Rain', icon: <CloudRain /> },
	{ id: 'type_27', desc: 'Sky Coverage Decreasing', icon: <CloudMoon /> },
	{ id: 'type_28', desc: 'Sky Coverage Increasing', icon: <CloudMoon /> },
	{ id: 'type_29', desc: 'Sky Unchanged', icon: <CloudMoon /> },
	{ id: 'type_3', desc: 'Heavy Drizzle', icon: <CloudDrizzle /> },
	{ id: 'type_30', desc: 'Smoke Or Haze', icon: <Haze /> },
	{ id: 'type_31', desc: 'Snow', icon: <Snowflake /> },
	{ id: 'type_32', desc: 'Snow And Rain Showers', icon: <CloudRainWind /> },
	{ id: 'type_33', desc: 'Snow Showers', icon: <CloudSnow /> },
	{ id: 'type_34', desc: 'Heavy Snow', icon: <CloudSnow /> },
	{ id: 'type_35', desc: 'Light Snow', icon: <CloudSnow /> },
	{ id: 'type_36', desc: 'Squalls', icon: <Waves /> },
	{ id: 'type_37', desc: 'Thunderstorm', icon: <CloudLightning /> },
	{ id: 'type_38', desc: 'Thunderstorm Without Precipitation', icon: <CloudLightning /> },
	{ id: 'type_39', desc: 'Diamond Dust', icon: <Snowflake /> },
	{ id: 'type_4', desc: 'Light Drizzle', icon: <CloudDrizzle /> },
	{ id: 'type_40', desc: 'Hail', icon: <CloudHail /> },
	{ id: 'type_41', desc: 'Overcast', icon: <Cloudy /> },
	{ id: 'type_42', desc: 'Partially cloudy', icon: <CloudSun /> },
	{ id: 'type_43', desc: 'Clear', icon: <Sun /> },
	{ id: 'type_5', desc: 'Heavy Drizzle/Rain', icon: <CloudRain /> },
	{ id: 'type_6', desc: 'Light Drizzle/Rain', icon: <CloudRain /> },
	{ id: 'type_7', desc: 'Dust storm', icon: <Waves /> },
	{ id: 'type_8', desc: 'Fog', icon: <Haze /> },
	{ id: 'type_9', desc: 'Freezing Drizzle/Freezing Rain', icon: <CloudDrizzle /> }
]

export function getBiggerIcon(Element: ReactElement) {
	const biggerElement = <Element.type {...Element.props} size={30} />

	return biggerElement
}

export function getConditionByID(conditionId: string) {
	const conditionArray = conditionId.trim().split(',')
	return Conditions.find(({ id }) => id === conditionArray[0])
}

export default Conditions
