import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flckgfnutouiasfnmyyn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsY2tnZm51dG91aWFzZm5teXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDcwMzQsImV4cCI6MjA3Mjg4MzAzNH0.csjfC4SWSyIh1JDRNtFXpNfirnzkWh8uN1JNEbuIVDk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// 타입 안전성을 위한 Database 타입 정의
export type Database = {
  public: {
    Tables: {
      movie_ratings: {
        Row: {
          id: string
          movie_id: number
          movie_title: string
          movie_poster_path: string | null
          movie_release_date: string
          user_rating: number
          user_review: string | null
          watched_date: string
          user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          movie_id: number
          movie_title: string
          movie_poster_path?: string | null
          movie_release_date: string
          user_rating: number
          user_review?: string | null
          watched_date: string
          user_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          movie_id?: number
          movie_title?: string
          movie_poster_path?: string | null
          movie_release_date?: string
          user_rating?: number
          user_review?: string | null
          watched_date?: string
          user_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// 인증 관련 함수들
export const auth = {
  // 구글 로그인
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // 로그아웃
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // 현재 사용자 정보 가져오기
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // 세션 정보 가져오기
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}