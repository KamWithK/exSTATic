<script lang="ts">
    let SECS_TO_HOURS = 60 * 60

    export let media_storage
    export let active: boolean = false

    let stats = {
        "chars": 0,
        "lines": 0,
        "time": 0
    }
    const setStats = (media_storage) => {
        if (media_storage !== undefined && media_storage.instance_storage != undefined) {
            stats = media_storage.instance_storage.today_stats
        }
    }
    $: setStats(media_storage)

    function getChars() {
        return stats["chars"] !== undefined ? stats["chars"].toLocaleString() : 0
    }

    function getLines() {
        return stats["lines"] !== undefined ? stats["lines"].toLocaleString() : 0
    }

    function getTime() {
        let date = new Date(0)
        date.setSeconds(Math.round(stats["time"]))
        return date.toISOString().substring(11, 19)
    }

    function getSpeed() {
        if (stats["chars"] === undefined || stats["time"] === undefined) return (0).toLocaleString()

        return ((stats["chars"] / stats["time"]) * SECS_TO_HOURS).toLocaleString()
    }
</script>

<div class="menu-bar h-full">
    <div id="chars_read" class="stat-numbers">{getChars()}</div>
    <div class="stat-annotation">Chars</div>
    <span class="material-icons">auto_stories</span>

    <div id="lines_read" class="stat-numbers">{getLines()}</div>
    <div class="stat-annotation">Lines</div>
    <span class="material-icons">drive_file_rename_outline</span>

    <div id="elapsed_time" class="stat-numbers">{getTime()}</div>
    <div class="stat-annotation">Elapsed</div>
    <span class="material-icons">timer</span>

    <div id="chars_per_hour" class="stat-numbers">{getSpeed()}</div>
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
