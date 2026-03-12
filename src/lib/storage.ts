import { supabase } from './supabase'

const JEWELRY_BUCKET = 'jewelry-images'

const normalizeStoredValue = (value?: string | null): string | null => {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export const extractStoragePath = (storedValue?: string | null): string | null => {
  const normalized = normalizeStoredValue(storedValue)
  if (!normalized) return null

  if (!/^https?:\/\//i.test(normalized)) {
    const withoutBucketPrefix = normalized.startsWith(`${JEWELRY_BUCKET}/`)
      ? normalized.slice(JEWELRY_BUCKET.length + 1)
      : normalized
    return withoutBucketPrefix.replace(/^\/+/, '')
  }

  try {
    const url = new URL(normalized)
    const path = decodeURIComponent(url.pathname)
    const marker = `/storage/v1/object/`
    const markerIndex = path.indexOf(marker)

    if (markerIndex === -1) return null

    const afterMarker = path.slice(markerIndex + marker.length)
    const segments = afterMarker.split('/').filter(Boolean)
    if (segments.length < 3) return null

    const bucketName = segments[1]
    if (bucketName !== JEWELRY_BUCKET) return null

    return segments.slice(2).join('/')
  } catch {
    return null
  }
}

export const resolveImageUrl = async (
  storedValue?: string | null,
  expiresIn = 3600
): Promise<string | null> => {
  const normalized = normalizeStoredValue(storedValue)
  if (!normalized) return null

  const path = extractStoragePath(normalized)
  if (!path) return normalized

  const { data, error } = await supabase.storage
    .from(JEWELRY_BUCKET)
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Erro ao criar URL assinada da imagem:', error)
    return null
  }

  return data.signedUrl
}
