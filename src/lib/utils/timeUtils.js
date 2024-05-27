// // src/lib/utils/timeUtils.js

// export function parseTime(timeStr) {
//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':');
//     if (modifier === 'pm' && hours !== '12') {
//       hours = parseInt(hours, 10) + 12;
//     }
//     if (modifier === 'am' && hours === '12') {
//       hours = '00';
//     }
//     return new Date(`1970-01-01T${hours}:${minutes}:00`);
//   }
  
//   export function sortTasks(tasks) {
//     return tasks.slice().sort((a, b) => parseTime(a.time) - parseTime(b.time));
//   }
  
//   export function isValidTime(timeStr) {
//     const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
//     return timePattern.test(timeStr);
//   }

export function parseTime(time) {
    if (!time) {
        throw new Error('Invalid time input');
    }
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

export function isValidTime(time) {
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return timePattern.test(time);
}

export function sortTasks(tasks) {
    return tasks.sort((a, b) => {
        const timeA = parseTime(a.taskTime);
        const timeB = parseTime(b.taskTime);
        return timeA.localeCompare(timeB);
    });
}