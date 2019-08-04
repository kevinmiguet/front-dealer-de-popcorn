export function scrollTop() {
	document.getElementsByTagName('html')[0].scrollIntoView(true)
}

// geolocation
let currentPosition: Position = null
export async function getCurrentPositionAsync(): Promise<Position> {
	if (currentPosition === null) {
		try {
			currentPosition = await new Promise(function (resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			})
		} catch (err) {
			console.error('error in getCurrentPositionAsync: ' + err)
		}
	} 
	
	return currentPosition
}

export async function watchCurrentPosition(callback: PositionCallback) {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(callback)
	}
}

// evaluate distance in meters
export function evaluateDistance(lat1: number, lon1: number, lat2: number, lon2: number) : number {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		// Haversine formula:	
		// a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
		// c = 2 ⋅ atan2( √a, √(1−a) )
		// d = R ⋅ c
		// where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
		// note that angles need to be in radians to pass to trig functions
		const R = 6371e3 // metres
		const φ1 = lat1 * Math.PI / 180
		const φ2 = lat2 * Math.PI / 180
		const Δφ = (lat2 - lat1) * Math.PI / 180
		const Δλ = (lon2 - lon1) * Math.PI / 180

		const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	}
}

export function scrollTo(id, x, y) {
    document.getElementById(id).scrollTo(x, y)
}