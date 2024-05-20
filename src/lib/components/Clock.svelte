<script>
    import { onMount } from 'svelte';
    import IconWrapper from '$lib/components/IconWrapper.svelte';

    let use24HourFormat = false; // Control for 24-hour vs. 12-hour format
    let showSeconds = false; // New variable to control showing seconds
    let ampmIcon = null;
    let isLoading = true; // Loading state

    // Initialize with empty strings
    let dayOfWeek = '';
    let date = '';
    let time = '';

    function getFormattedTime(now) {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Format hours and minutes
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Determine AM/PM if not using 24-hour format
        let ampm = '';
        switch (true) {
            case (hours >= 12 && hours < 16):
                ampmIcon = 'ep:sunny';
                break;
            case (hours >= 5 && hours <= 9):
                ampmIcon = 'ep:sunrise';
                break;
            case (hours >= 16 && hours < 18):
                ampmIcon = 'ep:sunset';
                break;
            case (hours >= 18 || hours < 5):
                ampmIcon = 'ep:moon';
                break;
            default:
                ampmIcon = 'ep:sunrise';
    }

        if (!use24HourFormat) {
          ampm = hours >= 12 ? 'pm' : 'am';
          hours %= 12;
          hours = hours || 12; // the hour '0' should be '12'
        }

        
        // Construct time string based on showSeconds
        let timeString = `${hours}:${minutes}`;
        if (showSeconds) {
            timeString += `:${seconds}`;
        }
        if (!use24HourFormat) {
            timeString += ` ${ampm}`;
        }

        return timeString;
    }

    function updateTime() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        dayOfWeek = days[now.getDay()];
        date = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
        time = getFormattedTime(now);

        // Call updateTime again after 1 second
        setTimeout(updateTime, 1000);
    }

    onMount(() => {
        updateTime(); // Initial call to set the time immediately
        isLoading = false; // Set loading to false after initial load
    });
</script>

<div class="flex flex-col items-center justify-center h-full text-center">
    {#if isLoading}
        <div class="text-6xl font-bold text-gray-600">Loading...</div>
    {:else}
        <div class="scale-75 md:scale-100">
            <IconWrapper icon={ampmIcon} width="128" height="128" />
        </div>
        <div class="mb-8">
            <div class="mb-2 text-6xl font-bold text-gray-600 md:text-8xl">{dayOfWeek}</div>
            <div class="mb-4 text-2xl font-bold text-gray-600 md:text-4xl">{date}</div>
        </div>
        <div class="text-6xl font-bold text-gray-600 md:text-8xl">{time}</div>

    {/if}
</div>