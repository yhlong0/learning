```js

/*

Find the first available time for everyone. 
calendar can represent as array of [start, end] or [start, duration]

calendar1: [[8,9], [11,12]]
calendar2: [[3,6], [100, 120]]
calendar3: [[10,15], [7,9]] //sequence could be unsorted. 
calendar4: [[11,12]] // overlap with calendar3
calendar5: [] // empty means available all the time

startTime = 5 // Nothing can be scheduled before 5
duration = 2


*/

const findFirstAvailableTime = (calendars, startTime, duration) => {
	const allCalendars = calendars.reduce((sum, current) => {
		current.forEach((item) => sum.push(item));
		return sum;
	}, []);
	const sortedCalendars = sortCalendar(allCalendars);
	console.log("sortedCalendars", sortedCalendars);

	let filterOverlap = [sortedCalendars[0]];
	for (let i = 1; i < sortedCalendars.length; i++) {
		const [start1, end1] = sortedCalendars[i - 1];
		const [start2, end2] = sortedCalendars[i];

		if (!(end1 > start2 && end1 > end2)) {
			filterOverlap.push(sortedCalendars[i]);
		}
	}
	console.log("filtered", filterOverlap);

	const calendarLength = filterOverlap.length - 1;
	let freeCalendars = [
		[-Infinity, filterOverlap[0][0]],
		[filterOverlap[calendarLength][1], Infinity],
	];
	console.log("freeCalendars initial", freeCalendars);

	for (let i = 1; i < filterOverlap.length; i++) {
		const firstEnd = filterOverlap[i - 1][1]; // 10, 15
		const secondStart = filterOverlap[i][0]; // 11, 12

		// [10, 15], [11, 12], [13, 16]
		if (secondStart - firstEnd > 0) {
			freeCalendars.push([firstEnd, secondStart]);
		}
	}

	freeCalendars = sortCalendar(freeCalendars);
	console.log("freeCalendars", freeCalendars);

	let freeSlot = 0;
	while (freeSlot < freeCalendars.length) {
		const [start, end] = freeCalendars[freeSlot];
		if (start <= startTime && startTime + duration <= end) {
			return [startTime, end];
		}
		freeSlot++;
	}

	return [];
};

const sortCalendar = (calendar) => calendar.sort((a, b) => a[0] - b[0]);

const result = findFirstAvailableTime(
	[
		[
			[8, 9],
			[11, 12],
		],
		[[10, 15]],
	],
	9,
	1
);

console.log("result", result);

```

