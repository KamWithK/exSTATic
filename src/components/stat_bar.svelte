<script lang="ts">
    let SECS_TO_HOURS = 60 * 60

    export let chars: number = 0
    export let lines: number = 0
    export let time: number = 0
    export let active: boolean = false

    function formatTime(time_secs: number) {
        let date = new Date(0)
        date.setSeconds(Math.round(time_secs))
        return date.toISOString().substring(11, 19)
    }
</script>

<div class="menu-bar h-full">
    <div id="chars_read" class="stat-numbers">{chars.toLocaleString()}</div>
    <div class="stat-annotation">Chars</div>
    <span class="material-icons">auto_stories</span>

    <div id="lines_read" class="stat-numbers">{lines.toLocaleString()}</div>
    <div class="stat-annotation">Lines</div>
    <span class="material-icons">drive_file_rename_outline</span>

    <div id="elapsed_time" class="stat-numbers">{formatTime(time)}</div>
    <div class="stat-annotation">Elapsed</div>
    <span class="material-icons">timer</span>

    <div id="chars_per_hour" class="stat-numbers">{((chars / time) * SECS_TO_HOURS).toLocaleString()}</div>
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
