<script>
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
  
    let dayOfWeekElement = null;
    let dateElement = null;
    let timeElement = null;
    let use24HourFormat = false; // Control for 24-hour vs. 12-hour format
    let showSeconds = false; // New variable to control showing seconds
    let ampmIcon= null;
  
    onMount(() => {
      function updateTime() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
        dayOfWeekElement.textContent = days[now.getDay()];
        dateElement.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
  
        // Format hours and minutes
        hours = hours < 10? '0' + hours : hours;
        minutes = minutes < 10? '0' + minutes : minutes;
        seconds = seconds < 10? '0' + seconds : seconds;
  
        // Determine AM/PM if not using 24-hour format
        let ampm = '';
        ampmIcon = 'ep:sunrise';
        if (hours >= 12 && hours < 16) {
          ampmIcon ='ep:sunny';
        } else if (hours >=5 && hours <= 9) {
          ampmIcon = 'ep:sunrise';
        } else if (hours >= 16 && hours < 18) {
          ampmIcon = 'ep:sunset';
        } else if (hours >= 18 || hours < 5) {
          ampmIcon = 'ep:moon';
        }
        
        if (!use24HourFormat) {
          ampm = hours >=  12? 'pm' : 'am';
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
  
        timeElement.textContent = timeString;
      }
  
      setInterval(updateTime, 1000);
      updateTime(); // Initial call to set the time immediately
    });
  </script>
  
  <div class="flex flex-col items-center justify-center h-full text-center">
    <Icon icon={ampmIcon} width="128" height="128"></Icon>
    <div class="mb-8">
        <div bind:this={dayOfWeekElement} class="mb-2 text-xl font-bold text-gray-600 md:text-8xl"></div>
        <div bind:this={dateElement} class="mb-4 text-2xl font-bold text-gray-600 md:text-4xl"></div>
    </div>
    <div bind:this={timeElement} class="text-4xl font-bold text-gray-600 md:text-8xl"></div>
  </div>