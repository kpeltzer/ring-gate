import { RingApi } from "ring-client-api";
let timeoutId: NodeJS.Timeout | null = null; // Variable to store the timeout ID

async function subscribeToAlarmUpdates() {
	const locationId = process.env.LOCATION_ID as string;
	const alarmId = process.env.ALARM_ID as string;
	const webhookUrl = process.env.WEBHOOK_URL as string;
	const webhookEnabled = process.env.WEBHOOK_ENABLED as string;
	const timeToWait = process.env.TIME_TO_WAIT as string;

	const ringApi = new RingApi({
		refreshToken: process.env.RING_REFRESH_TOKEN as string,
	});

	try {
		const locations = await ringApi.getLocations();
		const location = locations.find(
			(loc) => loc.locationDetails.location_id === locationId
		);

		if (!location) {
			console.error("Location not found");
			return;
		}

		const devices = await location.getDevices();
		const alarm = devices.find((device) => device.id === alarmId);

		if (!alarm) {
			console.error("Alarm not found");
			return;
		}

		alarm.onData.subscribe((data) => {
			// Cancel the previous timeout if it exists
			if (!data.faulted && timeoutId !== null) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}

			// Gate is opened
			if (data.faulted) {
				timeoutId = setTimeout(() => {
					if (webhookEnabled === "true") {
						fetch(webhookUrl, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								alarm: data.name,
								state: data.faulted ? "opened" : "closed",
								timeToWait: timeToWait,
							}),
						}).catch((error) =>
							console.error("Error sending data to webhook:", error)
						);
					}
				}, parseInt(timeToWait) * 1000);
			}
		});

		console.log("Subscribed to alarm updates.");
	} catch (error) {
		console.error("Failed to subscribe to alarm updates:", error);
	}
}

subscribeToAlarmUpdates();
