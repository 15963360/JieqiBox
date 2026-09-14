<template>
  <v-dialog v-model="visible" max-width="760px" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-link-variant</v-icon>
        {{ $t('lianxian.schemeManager') }}
        <v-spacer />
        <v-btn icon variant="text" @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-alert
          v-if="unsupported"
          type="warning"
          variant="tonal"
          class="mb-3"
          density="compact"
        >
          {{ $t('lianxian.windowsOnly') }}
        </v-alert>

        <div class="d-flex gap-2 mb-3">
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            :disabled="unsupported"
            @click="startNewScheme"
          >
            {{ $t('lianxian.createScheme') }}
          </v-btn>
        </div>

        <v-table density="compact" v-if="schemes.length">
          <thead>
            <tr>
              <th>{{ $t('lianxian.schemeName') }}</th>
              <th>{{ $t('lianxian.ourSide') }}</th>
              <th>{{ $t('lianxian.window') }}</th>
              <th>{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="scheme in schemes" :key="scheme.id">
              <td>
                {{ scheme.name }}
                <v-chip
                  v-if="scheme.id === defaultSchemeId"
                  size="x-small"
                  class="ml-1"
                  color="primary"
                >
                  {{ $t('lianxian.default') }}
                </v-chip>
              </td>
              <td>
                {{
                  scheme.ourSide === 'red'
                    ? $t('lianxian.red')
                    : $t('lianxian.black')
                }}
              </td>
              <td class="text-caption">
                {{ scheme.className }} {{ scheme.clientWidth }}×{{
                  scheme.clientHeight
                }}
              </td>
              <td>
                <v-btn
                  size="x-small"
                  variant="text"
                  @click="editScheme(scheme)"
                >
                  {{ $t('common.edit') }}
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="primary"
                  @click="schemesApi.setDefaultScheme(scheme.id)"
                >
                  {{ $t('lianxian.setDefault') }}
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="success"
                  :disabled="isLinking || unsupported"
                  @click="connect(scheme.id)"
                >
                  {{ $t('lianxian.connect') }}
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="error"
                  @click="schemesApi.deleteScheme(scheme.id)"
                >
                  {{ $t('common.delete') }}
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div v-else class="text-medium-emphasis py-6 text-center">
          {{ $t('lianxian.noScheme') }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showEditor" max-width="560px">
    <v-card>
      <v-card-title>
        {{
          editing.id
            ? $t('lianxian.editScheme')
            : $t('lianxian.createScheme')
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="editing.name"
          :label="$t('lianxian.schemeName')"
          density="compact"
          class="mb-2"
        />
        <v-select
          v-model="editing.ourSide"
          :items="sideItems"
          :label="$t('lianxian.ourSide')"
          density="compact"
          class="mb-2"
        />
        <v-switch
          v-model="editing.redOnTop"
          :label="$t('lianxian.redOnTop')"
          color="primary"
          density="compact"
          hide-details
          class="mb-2"
        />
        <v-text-field
          v-model.number="editing.pollIntervalMs"
          type="number"
          :label="$t('lianxian.pollInterval')"
          density="compact"
          class="mb-2"
        />
        <v-text-field
          v-model.number="editing.clickDelayMs"
          type="number"
          :label="$t('lianxian.clickDelay')"
          density="compact"
          class="mb-2"
        />
        <v-text-field
          v-model="editing.titleIncludes"
          :label="$t('lianxian.titleFilter')"
          density="compact"
          class="mb-2"
        />
        <div class="text-caption mb-2">
          {{ $t('lianxian.window') }}:
          {{ editing.className || '-' }}
          {{ editing.clientWidth }}×{{ editing.clientHeight }}
        </div>
        <div class="text-caption mb-3">
          {{ $t('lianxian.boardPoints') }}:
          ({{ Math.round(editing.topLeft?.x || 0) }},
          {{ Math.round(editing.topLeft?.y || 0) }}) →
          ({{ Math.round(editing.bottomRight?.x || 0) }},
          {{ Math.round(editing.bottomRight?.y || 0) }})
        </div>
        <v-btn
          size="small"
          variant="outlined"
          class="mb-3"
          :disabled="unsupported"
          @click="recalibrate"
        >
          {{ $t('lianxian.recalibrate') }}
        </v-btn>

        <div class="text-subtitle-2 mb-2">{{ $t('lianxian.extraClicks') }}</div>
        <div
          v-for="(click, index) in editing.extraClicks"
          :key="click.id"
          class="d-flex align-center gap-2 mb-1"
        >
          <v-text-field
            v-model="click.name"
            density="compact"
            hide-details
            class="flex-grow-1"
          />
          <span class="text-caption">
            {{ Math.round(click.x) }},{{ Math.round(click.y) }}
          </span>
          <v-btn
            icon="mdi-close"
            size="x-small"
            variant="text"
            @click="editing.extraClicks.splice(index, 1)"
          />
        </div>
        <v-btn
          size="small"
          variant="tonal"
          :disabled="unsupported || recordingExtra"
          @click="recordExtraClick"
        >
          {{
            recordingExtra
              ? $t('lianxian.pressCtrlExtra')
              : $t('lianxian.addExtraClick')
          }}
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="showEditor = false">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="primary" :disabled="!canSave" @click="saveEditor">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { invoke } from '@tauri-apps/api/core'
  import { useLianxian } from '@/composables/useLianxian'
  import { defaultSchemeValues, type LianxianScheme } from '@/types/lianxian'

  const visible = defineModel<boolean>({ default: false })
  const { t } = useI18n()
  const {
    schemesApi,
    unsupported,
    isLinking,
    connect,
    startCalibration,
  } = useLianxian()
  const { schemes, defaultSchemeId } = schemesApi

  const showEditor = ref(false)
  const recordingExtra = ref(false)
  const creatingNew = ref(false)
  const editing = reactive<Partial<LianxianScheme> & { extraClicks: any[] }>({
    ...defaultSchemeValues(),
    name: '',
    extraClicks: [],
  })

  const sideItems = computed(() => [
    { title: t('lianxian.red'), value: 'red' },
    { title: t('lianxian.black'), value: 'black' },
  ])

  const canSave = computed(
    () =>
      !!editing.name &&
      !!editing.className &&
      (editing.clientWidth || 0) > 0 &&
      (editing.bottomRight?.x || 0) !== (editing.topLeft?.x || 0)
  )

  const resetEditor = () => {
    Object.assign(editing, {
      ...defaultSchemeValues(),
      id: undefined,
      name: '',
      extraClicks: [],
    })
  }

  const startNewScheme = () => {
    creatingNew.value = true
    resetEditor()
    editing.name = t('lianxian.newScheme')
    startCalibration()
  }

  const editScheme = (scheme: LianxianScheme) => {
    creatingNew.value = false
    Object.assign(editing, {
      ...scheme,
      extraClicks: (scheme.extraClicks || []).map(c => ({ ...c })),
    })
    showEditor.value = true
  }

  const recalibrate = () => {
    creatingNew.value = false
    startCalibration()
  }

  const applyDraft = (draft: Partial<LianxianScheme>) => {
    Object.assign(editing, draft)
    if (!editing.name) editing.name = t('lianxian.newScheme')
    if (!editing.extraClicks) editing.extraClicks = []
    showEditor.value = true
  }

  const onCalibrated = (event: Event) => {
    const detail = (event as CustomEvent).detail as Partial<LianxianScheme>
    applyDraft({ ...editing, ...detail })
  }

  const saveEditor = async () => {
    await schemesApi.saveScheme({
      ...(editing as LianxianScheme),
      extraClicks: editing.extraClicks || [],
    })
    showEditor.value = false
  }

  let extraTimer: number | null = null
  let extraCtrlWasDown = false
  const recordExtraClick = () => {
    recordingExtra.value = true
    extraCtrlWasDown = false
    extraTimer = window.setInterval(async () => {
      try {
        const down = await invoke<boolean>('lianxian_is_ctrl_down')
        if (down && !extraCtrlWasDown) {
          const hit = await invoke<any>('lianxian_cursor_window_info')
          editing.extraClicks.push({
            id: `ex_${Date.now()}`,
            name: t('lianxian.extraClick'),
            x: hit.cursorClientX,
            y: hit.cursorClientY,
          })
          recordingExtra.value = false
          if (extraTimer !== null) {
            window.clearInterval(extraTimer)
            extraTimer = null
          }
        }
        extraCtrlWasDown = down
      } catch {
        recordingExtra.value = false
      }
    }, 80)
  }

  watch(visible, value => {
    if (value) schemesApi.load()
  })

  const onStartCreate = () => {
    if (!unsupported.value) startNewScheme()
  }

  onMounted(() => {
    window.addEventListener('lianxian-calibration-complete', onCalibrated)
    window.addEventListener('lianxian-start-create', onStartCreate)
  })
  onUnmounted(() => {
    window.removeEventListener('lianxian-calibration-complete', onCalibrated)
    window.removeEventListener('lianxian-start-create', onStartCreate)
    if (extraTimer !== null) window.clearInterval(extraTimer)
  })
</script>
