<script>
    export let size = 40;
    export let color = '#000000';
</script>

<svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="50" cy="50" r="45" fill="none" stroke={color} stroke-width="2" />
    <text x="50" y="60" text-anchor="middle" font-size="40" font-weight="bold" fill={color}>
        S
    </text>
</svg>

<style>
    svg {
        width: var(--size, 40px);
        height: var(--size, 40px);
    }
</style>