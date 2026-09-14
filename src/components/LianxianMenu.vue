<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :icon="isLinking ? 'mdi-link-variant' : 'mdi-link-variant-plus'"
        size="small"
        :color="isLinking ? 'success' : 'blue'"
        variant="text"
        :title="$t('lianxian.title')"
      />
    </template>
    <v-list density="compact" min-width="220">
      <v-list-item
        prepend-icon="mdi-plus"
        :title="$t('lianxian.createScheme')"
        :disabled="unsupported || isCalibrating"
        @click="openManagerAndCreate"
      />
      <v-list-item
        prepend-icon="mdi-cog-outline"
        :title="$t('lianxian.schemeManager')"
        @click="showSchemeDialog = true"
      />
      <v-divider />
      <v-list-item
        prepend-icon="mdi-play"
        :title="$t('lianxian.connectDefault')"
        :disabled="unsupported || isLinking || !defaultScheme"
        @click="connect()"
      />
      <v-list-item
        v-for="scheme in schemes"
        :key="scheme.id"
        prepend-icon="mdi-chess-rook"
        :title="$t('lianxian.connectNamed', { name: scheme.name })"
        :disabled="unsupported || isLinking"
        @click="connect(scheme.id)"
      />
      <v-list-item
        prepend-icon="mdi-stop"
        :title="$t('lianxian.disconnect')"
        :disabled="!isLinking"
        @click="disconnect"
      />
    </v-list>
  </v-menu>
  <LianxianSchemeDialog v-model="showSchemeDialog" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useLianxian } from '@/composables/useLianxian'
  import LianxianSchemeDialog from './LianxianSchemeDialog.vue'

  const showSchemeDialog = ref(false)
  const {
    isLinking,
    isCalibrating,
    unsupported,
    connect,
    disconnect,
    schemesApi,
  } = useLianxian()
  const { schemes, defaultScheme } = schemesApi

  const openManagerAndCreate = () => {
    showSchemeDialog.value = true
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('lianxian-start-create'))
    }, 0)
  }
</script>
