<script lang="ts">
    import type { MediaStorage } from "../storage/media_storage"

    let SECS_TO_HOURS = 60 * 60

    export let media_storage: MediaStorage
    export let active: boolean = false

    let chars, lines, time, speed
    
    const statsExist = media_storage =>
        media_storage.instance_storage != undefined
            ? media_storage.instance_storage.today_stats
            : undefined
    
    const getStat = (daily_stats, stat_key) =>
        daily_stats != undefined && daily_stats.hasOwnProperty(stat_key)
            ? daily_stats[stat_key]
            : 0

    const getTime = time_secs => {
        const date = new Date(0)
        date.setSeconds(Math.round(time_secs))
        return date.toISOString().substring(11, 19)
    }

    const getSpeed = (chars, time_secs) =>
        chars === undefined || time_secs === undefined
            || isNaN(chars) || isNaN(time_secs)
            || chars === 0 || time_secs === 0
                ? (0).toLocaleString()
                : (Math.round((chars / time_secs) * SECS_TO_HOURS)).toLocaleString()
            
    const calculateStats = () => {
        const daily_stats = statsExist(media_storage)

        const char_count = getStat(daily_stats, "chars_read")
        const line_count = getStat(daily_stats, "lines_read")
        const time_secs = getStat(daily_stats, "time_read")

        chars = char_count.toLocaleString()
        lines = line_count.toLocaleString()
        time = getTime(time_secs)
        speed = getSpeed(char_count, time_secs)
    }
    calculateStats()

    document.addEventListener("status_active", () => {
        active = true
        calculateStats()
    })
    document.addEventListener("status_inactive", () => {
        active = false
        calculateStats()
    })

</script>

<div class="flex flex-row menu-bar z-50 h-full p-3 gap-3 items-center">
    <div id="chars_read" class="stat-numbers">{chars}</div>
    <div class="stat-annotation">Chars</div>
    <span class="material-icons">auto_stories</span>

    <div id="lines_read" class="stat-numbers">{lines}</div>
    <div class="stat-annotation">Lines</div>
    <span class="material-icons">drive_file_rename_outline</span>

    <div id="elapsed_time" class="stat-numbers">{time}</div>
    <div class="stat-annotation">Elapsed</div>
    <span class="material-icons">timer</span>

    <div id="chars_per_hour" class="stat-numbers">{speed}</div>
    <div class="stat-annotation">Chars / Hour</div>

    <span id="activity_symbol" class="material-icons">
        {#if active}
            hourglass_bottom
        {:else}
            bedtime
        {/if}
    </span>

    <slot></slot>
</div>

<style>
    .stat-numbers {
        font-family: "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace";
        font-size: 1rem;
        line-height: 1.5rem;
        white-space: nowrap;
    }

    .stat-annotation {
        font-size: 0.75rem;
        line-height: 1rem;
        letter-spacing: -0.05em;
        white-space: nowrap;
    }
</style>
