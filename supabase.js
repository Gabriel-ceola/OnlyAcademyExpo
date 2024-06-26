// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjuxkjznihnmolevbjvx.supabase.co'; // Substitua com a URL do seu projeto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdXhranpuaWhubW9sZXZianZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMDMzNjYsImV4cCI6MjAzMzc3OTM2Nn0.MojGXlzXV1axQXUYfqzwjmWT0eG_C2887LG4UTbg57U'; // Substitua com a chave pública do seu projeto Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
