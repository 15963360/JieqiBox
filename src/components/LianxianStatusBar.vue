<template>
  <div v-if="isLinking || phase === 'error'" class="lianxian-status">
    <v-chip
      size="small"
      :color="chipColor"
      variant="flat"
      class="mr-2"
      prepend-icon="mdi-link-variant"
    >
      {{ $t('lianxian.title') }}
    </v-chip>
    <span class="status-text">{{ statusMessage }}</span>
    <span v-if="linkedWindowTitle" class="window-title">
      {{ linkedWindowTitle }}
    </span>
    <v-spacer />
    <v-btn
      v-for="(click, index) in extraClicks"
      :key="click.id"
      size="x-small"
      variant="tonal"
      class="ml-1"
      @click="clickExtra(index)"
    >
      {{ click.name }}
    </v-btn>
    <v-btn
      v-if="isLinking"
      size="x-small"
      color="error"
      variant="tonal"
      @click="disconnect"
    >
      {{ $t('lianxian.disconnect') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useLianxian } from '@/composables/useLianxian'

  const {
    isLinking,
    phase,
    statusMessage,
    linkedWindowTitle,
    disconnect,
    clickExtra,
    activeScheme,
  } = useLianxian()
  const extraClicks = computed(() => activeScheme.value?.extraClicks || [])

  const chipColor = computed(() => {
    if (phase.value === 'error') return 'error'
    if (phase.value === 'thinking' || phase.value === 'clicking') return 'orange'
    if (isLinking.value) return 'success'
    return 'grey'
  })
</script>

<style scoped>
  .lianxian-status {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 560px;
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    background: rgba(var(--v-theme-surface-variant), 0.35);
    font-size: 12px;
  }

  .status-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .window-title {
    color: rgba(var(--v-theme-on-surface), 0.6);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }
</style>
