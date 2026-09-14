<template>
  <v-snackbar
    v-model="visible"
    :timeout="-1"
    location="top"
    color="indigo"
    multi-line
    class="lianxian-calib-snackbar"
  >
    <div class="d-flex flex-column">
      <div class="text-subtitle-2 mb-1">{{ $t('lianxian.calibrateTitle') }}</div>
      <div>{{ statusMessage || $t('lianxian.calibrateTopLeft') }}</div>
      <div class="text-caption mt-1">{{ $t('lianxian.calibrateHint') }}</div>
    </div>
    <template #actions>
      <v-btn variant="text" @click="cancelCalibration">
        {{ $t('common.cancel') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useLianxian } from '@/composables/useLianxian'

  const { isCalibrating, statusMessage, cancelCalibration } = useLianxian()
  const visible = computed({
    get: () => isCalibrating.value,
    set: value => {
      if (!value) cancelCalibration()
    },
  })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isCalibrating.value) cancelCalibration()
  }
  onMounted(() => window.addEventListener('keydown', onKey))
  onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
