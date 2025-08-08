import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.DEV)

export default createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL!,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY!
)

