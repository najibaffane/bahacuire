
import { createClient } from '@supabase/supabase-js';

// Utilisation des identifiants fournis pour connecter le projet à l'instance Supabase réelle.
const supabaseUrl = 'https://kicokspuhapgjlsttexi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpY29rc3B1aGFwZ2psc3R0ZXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzcwMjIsImV4cCI6MjA3Mzk1MzAyMn0.tTJVv0zA2sQfQDuCZUS0dXQaDFxgozudZiqZS2LhHnY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
