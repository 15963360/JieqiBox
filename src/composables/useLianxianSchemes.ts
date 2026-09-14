import { computed, ref } from 'vue'
import { useConfigManager } from './useConfigManager'
import {
  defaultSchemeValues,
  type LianxianScheme,
} from '@/types/lianxian'

const schemes = ref<LianxianScheme[]>([])
const defaultSchemeId = ref('')
let loaded = false

const createId = () =>
  `lx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`

export function useLianxianSchemes() {
  const configManager = useConfigManager()

  const persist = async () => {
    await configManager.updateLianxianSettings({
      schemes: JSON.stringify(schemes.value),
      defaultSchemeId: defaultSchemeId.value,
    })
  }

  const load = () => {
    const settings = configManager.getLianxianSettings()
    try {
      const parsed = JSON.parse(settings.schemes || '[]')
      schemes.value = Array.isArray(parsed) ? parsed : []
    } catch {
      schemes.value = []
    }
    defaultSchemeId.value = settings.defaultSchemeId || ''
    loaded = true
  }

  if (!loaded) {
    try {
      load()
    } catch {
      schemes.value = []
    }
  }

  const defaultScheme = computed(
    () => schemes.value.find(s => s.id === defaultSchemeId.value) || null
  )

  const getScheme = (id: string) => schemes.value.find(s => s.id === id)

  const saveScheme = async (
    input: Omit<LianxianScheme, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string
    }
  ): Promise<LianxianScheme> => {
    const now = Date.now()
    if (input.id) {
      const idx = schemes.value.findIndex(s => s.id === input.id)
      if (idx >= 0) {
        const updated: LianxianScheme = {
          ...schemes.value[idx],
          ...input,
          id: input.id,
          updatedAt: now,
        }
        schemes.value.splice(idx, 1, updated)
        await persist()
        return updated
      }
    }
    const created: LianxianScheme = {
      ...defaultSchemeValues(),
      ...input,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    schemes.value.push(created)
    if (!defaultSchemeId.value) defaultSchemeId.value = created.id
    await persist()
    return created
  }

  const deleteScheme = async (id: string) => {
    schemes.value = schemes.value.filter(s => s.id !== id)
    if (defaultSchemeId.value === id) {
      defaultSchemeId.value = schemes.value[0]?.id || ''
    }
    await persist()
  }

  const setDefaultScheme = async (id: string) => {
    defaultSchemeId.value = id
    await persist()
  }

  return {
    schemes,
    defaultSchemeId,
    defaultScheme,
    load,
    getScheme,
    saveScheme,
    deleteScheme,
    setDefaultScheme,
  }
}
