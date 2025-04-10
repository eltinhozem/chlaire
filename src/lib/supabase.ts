
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'X-Frame-Options': 'DENY'
    }
  },
  fetch: (url: string, options: RequestInit) => {
    const MAX_RETRIES = 5; // Increased from 3 to 5
    const RETRY_DELAY = 1500; // Increased from 1000 to 1500 milliseconds
    
    const fetchWithRetry = async (
      attempt = 0
    ): Promise<Response> => {
      try {
        const timeout = 45000; // Increased from 30000 to 45000 milliseconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        console.log(`Fetching Supabase (attempt ${attempt + 1}/${MAX_RETRIES}): ${url}`);
        
        const fetchResponse = await fetch(url, {
          ...options,
          signal: controller.signal,
          mode: 'cors',
          credentials: 'include'
        });
        
        clearTimeout(timeoutId);
        
        if (fetchResponse.ok) {
          console.log('Supabase fetch successful');
          return fetchResponse;
        }
        
        console.error(`Supabase fetch error: ${fetchResponse.status} ${fetchResponse.statusText}`);
        
        if (attempt < MAX_RETRIES) {
          const delayTime = RETRY_DELAY * Math.pow(1.5, attempt); // Exponential backoff
          console.log(`Retrying fetch in ${delayTime/1000} seconds, attempt ${attempt + 1}/${MAX_RETRIES}`);
          await new Promise(resolve => setTimeout(resolve, delayTime));
          return fetchWithRetry(attempt + 1);
        }
        
        throw new Error(`Failed after ${MAX_RETRIES} retries: ${fetchResponse.status} ${fetchResponse.statusText}`);
      } catch (error) {
        if (
          attempt < MAX_RETRIES && 
          (error instanceof TypeError || error instanceof DOMException)
        ) {
          const delayTime = RETRY_DELAY * Math.pow(1.5, attempt); // Exponential backoff
          console.log(`Retrying after error: ${error.message}, attempt ${attempt + 1}/${MAX_RETRIES} in ${delayTime/1000} seconds`);
          await new Promise(resolve => setTimeout(resolve, delayTime));
          return fetchWithRetry(attempt + 1);
        }
        
        console.error('Supabase fetch error after retries:', error);
        throw error;
      }
    };
    
    return fetchWithRetry();
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);

export const checkSecureConnection = async () => {
  if (window.location.protocol !== 'https:' && !window.location.hostname.includes('localhost')) {
    console.warn('Warning: This connection is not secure. Please use HTTPS for production.');
    return false;
  }
  
  try {
    console.log('Testing Supabase connection...');
    
    // Add a timeout to the connection test
    const result = await Promise.race([
      supabase.auth.getSession(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 15000)
      )
    ]);
    
    console.log('Supabase connection established successfully', result);
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
};