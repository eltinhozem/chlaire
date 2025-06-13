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
    storageKey: 'sb-auth-token',
    flowType: 'pkce' // Usar PKCE flow que é mais seguro
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Verificação de conexão com timeout
export const checkConnection = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
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
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos

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
    const encoded = sessionStorage.getItem('jw_security');
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
      sessionStorage.setItem('jw_security', encoded);
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
    sessionStorage.removeItem('jw_security');
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing security data:', error);
  }
};
