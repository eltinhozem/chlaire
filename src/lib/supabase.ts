
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Security configuration
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'sb-session', // Custom storage key
    flowType: 'pkce', // More secure authentication flow
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
        
        console.log(`Secure fetch attempt ${attempt + 1}/${MAX_RETRIES}`);
        
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
    const result = await Promise.race([
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

// Session management
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
let lastLoginAttempt = 0;

export const isLoginAllowed = () => {
  const now = Date.now();
  if (now - lastLoginAttempt > LOCKOUT_TIME) {
    loginAttempts = 0;
    return true;
  }
  return loginAttempts < MAX_LOGIN_ATTEMPTS;
};

export const trackLoginAttempt = () => {
  loginAttempts++;
  lastLoginAttempt = Date.now();
  return isLoginAllowed();
};

