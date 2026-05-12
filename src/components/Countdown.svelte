<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Props {
    target: string;
  }

  let { target }: Props = $props();

  const targetMs = new Date(target).getTime();

  let now = $state(Date.now());
  let timer: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
    }, 1000);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  const pad = (n: number) => n.toString().padStart(2, '0');

  let remaining = $derived(Math.max(0, targetMs - now));
  let days = $derived(Math.floor(remaining / 86_400_000));
  let hours = $derived(Math.floor((remaining % 86_400_000) / 3_600_000));
  let minutes = $derived(Math.floor((remaining % 3_600_000) / 60_000));
  let seconds = $derived(Math.floor((remaining % 60_000) / 1000));

  let display = $derived(
    `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
  );
</script>

<span class="countdown" aria-live="polite">{display}</span>

<style>
  .countdown {
    font-family: 'Cabin', system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
    color: #fff;
  }
</style>
