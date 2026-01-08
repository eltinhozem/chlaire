import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PrimaryButton, SecondaryButton, DangerButton } from '../buttons'
import {
  Page,
  Title,
  Card,
  Grid,
  Field,
  Label,
  Input,
  Row,
  Table,
  Th,
  Td,
  Muted
} from './styles'

type UserProfileRow = {
  id: string
  email: string
  display_name: string
  updated_at?: string
}

export default function Usuarios() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [rows, setRows] = useState<UserProfileRow[]>([])
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id,email,display_name,updated_at')
        .order('email', { ascending: true })

      if (error) throw error
      setRows((data || []) as UserProfileRow[])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const resetForm = () => {
    setEmail('')
    setDisplayName('')
    setSelectedId(null)
  }

  const handleEdit = (row: UserProfileRow) => {
    setSelectedId(row.id)
    setEmail(row.email)
    setDisplayName(row.display_name)
  }

  const handleDelete = async (row: UserProfileRow) => {
    if (!window.confirm(`Excluir o usuário "${row.display_name}" (${row.email})?`)) return
    setSaving(true)
    try {
      const { error } = await supabase.from('user_profiles').delete().eq('id', row.id)
      if (error) throw error
      await load()
      if (selectedId === row.id) resetForm()
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    if (!normalizedEmail) return alert('Informe o email.')
    if (!displayName.trim()) return alert('Informe o nome.')

    setSaving(true)
    try {
      const payload = {
        ...(selectedId ? { id: selectedId } : {}),
        email: normalizedEmail,
        display_name: displayName.trim()
      }

      const { error } = await supabase.from('user_profiles').upsert(payload)
      if (error) throw error
      await load()
      resetForm()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Page>
      <Title>Usuários (Email → Nome)</Title>

      <Card>
        <Grid>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: pessoa@empresa.com"
            />
          </Field>
          <Field>
            <Label>Nome</Label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="ex: Hugo"
            />
          </Field>
        </Grid>

        <Row>
          <SecondaryButton type="button" onClick={resetForm} disabled={saving}>
            Limpar
          </SecondaryButton>
          <PrimaryButton type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Salvando...' : selectedId ? 'Atualizar' : 'Adicionar'}
          </PrimaryButton>
        </Row>
        <Muted>Depois do login, o app usa esse nome no topo.</Muted>
      </Card>

      <Card>
        {loading ? (
          <Muted>Carregando...</Muted>
        ) : rows.length === 0 ? (
          <Muted>Nenhum usuário cadastrado.</Muted>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Email</Th>
                <Th>Nome</Th>
                <Th style={{ width: 180 }}>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <Td>{row.email}</Td>
                  <Td>{row.display_name}</Td>
                  <Td>
                    <Row style={{ justifyContent: 'flex-end' }}>
                      <SecondaryButton type="button" onClick={() => handleEdit(row)} disabled={saving}>
                        Editar
                      </SecondaryButton>
                      <DangerButton type="button" onClick={() => handleDelete(row)} disabled={saving}>
                        Excluir
                      </DangerButton>
                    </Row>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Page>
  )
}

