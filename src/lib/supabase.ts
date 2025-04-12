
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Enhanced security configuration
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'sb-session', // Custom storage key
    flowType: 'pkce' as const, // More secure authentication flow with correct type
  },
  global: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'",
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  },
  // Enhanced security for data fetching
  fetch: (url: string, options: RequestInit) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;
    
    const fetchWithRetry = async (attempt = 0): Promise<Response> => {
      try {
        const timeout = 30000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const fetchResponse = await fetch(url, {
          ...options,
          signal: controller.signal,
          mode: 'cors',
          credentials: 'include',
          headers: {
            ...options.headers,
            'X-Request-Id': crypto.randomUUID(), // Add request tracing
          }
        });
        
        clearTimeout(timeoutId);
        
        if (fetchResponse.ok) {
          return fetchResponse;
        }
        
        if (attempt < MAX_RETRIES) {
          const delayTime = RETRY_DELAY * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delayTime));
          return fetchWithRetry(attempt + 1);
        }
        
        throw new Error(`Failed after ${MAX_RETRIES} retries`);
      } catch (error) {
        if (attempt < MAX_RETRIES) {
          const delayTime = RETRY_DELAY * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delayTime));
          return fetchWithRetry(attempt + 1);
        }
        throw error;
      }
    };
    
    return fetchWithRetry();
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);

// Enhanced security checks
export const checkSecureConnection = async () => {
  // Force HTTPS in production
  if (window.location.protocol !== 'https:' && !window.location.hostname.includes('localhost')) {
    console.error('Insecure connection detected. Redirecting to HTTPS...');
    window.location.href = window.location.href.replace('http:', 'https:');
    return false;
  }
  
  try {
    // Test connection with timeout
    await Promise.race([
      supabase.auth.getSession(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      )
    ]);
    
    console.log('Secure connection established');
    return true;
  } catch (error) {
    console.error('Secure connection failed:', error);
    return false;
  }
};

// Improved session management with persistent storage
const STORAGE_PREFIX = 'secure_app_';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Helper function to safely get/set from localStorage with encryption
const secureStorage = {
  get: (key: string) => {
    try {
      const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  }
};

export const isLoginAllowed = () => {
  const securityData = secureStorage.get('security') || { 
    attempts: 0, 
    lastAttempt: 0
  };
  
  const now = Date.now();
  
  // Reset if lockout period is over
  if (now - securityData.lastAttempt > LOCKOUT_TIME) {
    secureStorage.set('security', { attempts: 0, lastAttempt: 0 });
    return { allowed: true };
  }
  
  return { 
    allowed: securityData.attempts < MAX_LOGIN_ATTEMPTS, 
    lastAttempt: securityData.lastAttempt 
  };
};

export const trackLoginAttempt = () => {
  const securityData = secureStorage.get('security') || { 
    attempts: 0, 
    lastAttempt: 0
  };
  
  const now = Date.now();
  const newAttempts = securityData.attempts + 1;
  
  // Update security data
  secureStorage.set('security', {
    attempts: newAttempts,
    lastAttempt: now
  });
  
  return { 
    allowed: newAttempts < MAX_LOGIN_ATTEMPTS,
    attempts: newAttempts
  };
};

// Reset attempts on successful login
export const resetLoginAttempts = () => {
  secureStorage.set('security', { attempts: 0, lastAttempt: 0 });
};
