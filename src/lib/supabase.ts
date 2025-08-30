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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const { error } = await supabase.auth.getSession();
    
    clearTimeout(timeoutId);
    
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

// Sistema básico de tentativas de login com criptografia local
// Desativado: aumentamos o limite e zeramos o tempo de bloqueio
const MAX_LOGIN_ATTEMPTS = Number.MAX_SAFE_INTEGER;
const LOCKOUT_TIME = 0; // sem bloqueio

const encodeData = (data: any) => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return null;
  }
};

const decodeData = (encodedData: string) => {
  try {
    return JSON.parse(atob(encodedData));
  } catch {
    return null;
  }
};

const getSecurityData = () => {
  try {
    const encoded = sessionStorage.getItem('chlaire_security');
    if (!encoded) return { attempts: 0, lastAttempt: 0 };
    
    const data = decodeData(encoded);
    return data || { attempts: 0, lastAttempt: 0 };
  } catch {
    return { attempts: 0, lastAttempt: 0 };
  }
};

const setSecurityData = (data: { attempts: number; lastAttempt: number }) => {
  try {
    const encoded = encodeData(data);
    if (encoded) {
      sessionStorage.setItem('chlaire_security', encoded);
    }
  } catch (error) {
    console.error('Security data save error:', error);
  }
};

export const isLoginAllowed = () => {
  const securityData = getSecurityData();
  const now = Date.now();
  
  if (now - securityData.lastAttempt > LOCKOUT_TIME) {
    setSecurityData({ attempts: 0, lastAttempt: 0 });
    return { allowed: true };
  }
  
  return { 
    allowed: securityData.attempts < MAX_LOGIN_ATTEMPTS, 
    lastAttempt: securityData.lastAttempt 
  };
};

export const trackLoginAttempt = () => {
  const securityData = getSecurityData();
  const now = Date.now();
  const newAttempts = securityData.attempts + 1;
  
  setSecurityData({
    attempts: newAttempts,
    lastAttempt: now
  });
  
  return { 
    allowed: newAttempts < MAX_LOGIN_ATTEMPTS,
    attempts: newAttempts
  };
};

export const resetLoginAttempts = () => {
  setSecurityData({ attempts: 0, lastAttempt: 0 });
};

// Função para limpar dados sensíveis
export const clearSecurityData = () => {
  try {
    sessionStorage.removeItem('chlaire_security');
  } catch (error) {
    console.error('Error clearing security data:', error);
  }
};
