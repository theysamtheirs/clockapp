export function isValidTime(time) {
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;
    const isValid = timePattern.test(time);
    console.log('isValidTime:', time, isValid); // Log validation
    return isValid;
}

export function normalizeTime(time) {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    console.log('normalizeTime:', { time, timePart, modifier, hours, minutes }); // Log parts

    if (!modifier) {
        console.error('Time modifier (AM/PM) is missing:', time);
        return time; // Return the original time if the modifier is missing
    }

    if (hours === '12') {
        hours = '00';
    }

    if (modifier.toLowerCase() === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    // Ensure hours are two digits
    hours = hours.toString().padStart(2, '0');

    const normalizedTime = `${hours}:${minutes}`;
    console.log('normalizeTime result:', { time, normalizedTime }); // Debugging log
    return normalizedTime;
}


export function parseTimeToDate(time) {
    const [hours, minutes] = time.split(':');
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
}


export function sortTasks(tasks) {
    return tasks.sort((a, b) => {
        const dateA = parseTimeToDate(normalizeTime(a.taskTime));
        const dateB = parseTimeToDate(normalizeTime(b.taskTime));
        return dateA - dateB;
    });
}