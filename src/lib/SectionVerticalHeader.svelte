<script lang="ts">
let className = "";
export {className as class};

export let title = "";
export let compact = false;

const paddings = compact ? "pt-4 pb-5" : "pt-6 pb-2.75";
</script>

<section class={`relative ${className}`}>
    <span data-testid="title" class="vertical-header text-xs uppercase transition-color text-current">{title}</span>

    <div data-testid="contentWrapper" class={`container transition-bg bg-current-light ${paddings}`}>
        <slot></slot>
    </div>
</section>
