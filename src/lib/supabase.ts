import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'chlaire-auth-token',
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
});

// Verificação de conexão com timeout
export const checkConnection = async () => {
  try {
    const { error } = await supabase.auth.getSession();

    if (error) {
      console.error('Connection error:', error);
      return false;
    }
    
    console.log('Connection established successfully');
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
};
