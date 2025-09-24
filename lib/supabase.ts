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
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: 'pending' | 'paid' | 'cancelled' | 'refunded'
          total_amount: number
          currency: string | null
          customer_name: string | null
          customer_email: string | null
          customer_phone: string | null
          shipping_address: any | null
          billing_address: any | null
          order_items: any
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number?: string | null
          status?: 'pending' | 'paid' | 'cancelled' | 'refunded'
          total_amount: number
          currency?: string | null
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          shipping_address?: any | null
          billing_address?: any | null
          order_items: any
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string | null
          status?: 'pending' | 'paid' | 'cancelled' | 'refunded'
          total_amount?: number
          currency?: string | null
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          shipping_address?: any | null
          billing_address?: any | null
          order_items?: any
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string | null
          payment_key: string
          order_id_toss: string
          amount: number
          currency: string | null
          status: 'ready' | 'paid' | 'canceled' | 'partial_canceled' | 'failed'
          method: string | null
          approved_at: string | null
          canceled_at: string | null
          cancel_reason: string | null
          receipt_url: string | null
          toss_response: any | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          payment_key: string
          order_id_toss: string
          amount: number
          currency?: string | null
          status?: 'ready' | 'paid' | 'canceled' | 'partial_canceled' | 'failed'
          method?: string | null
          approved_at?: string | null
          canceled_at?: string | null
          cancel_reason?: string | null
          receipt_url?: string | null
          toss_response?: any | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          payment_key?: string
          order_id_toss?: string
          amount?: number
          currency?: string | null
          status?: 'ready' | 'paid' | 'canceled' | 'partial_canceled' | 'failed'
          method?: string | null
          approved_at?: string | null
          canceled_at?: string | null
          cancel_reason?: string | null
          receipt_url?: string | null
          toss_response?: any | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string | null
          method_type: 'card' | 'account' | 'virtual_account' | 'mobile'
          method_name: string | null
          is_default: boolean | null
          method_data: any | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          method_type: 'card' | 'account' | 'virtual_account' | 'mobile'
          method_name?: string | null
          is_default?: boolean | null
          method_data?: any | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          method_type?: 'card' | 'account' | 'virtual_account' | 'mobile'
          method_name?: string | null
          is_default?: boolean | null
          method_data?: any | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
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

// 결제 관련 함수들
export const payment = {
  // 주문 생성
  createOrder: async (orderData: Database['public']['Tables']['orders']['Insert']) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
    return { data, error }
  },

  // 사용자의 주문 목록 조회
  getUserOrders: async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        payments (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // 주문 상세 조회
  getOrderById: async (orderId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        payments (*)
      `)
      .eq('id', orderId)
      .single()
    return { data, error }
  },

  // 주문 상태 업데이트
  updateOrderStatus: async (orderId: string, status: Database['public']['Tables']['orders']['Row']['status']) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()
    return { data, error }
  },

  // 결제 정보 생성
  createPayment: async (paymentData: Database['public']['Tables']['payments']['Insert']) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single()
    return { data, error }
  },

  // 결제 상태 업데이트
  updatePaymentStatus: async (
    paymentKey: string, 
    status: Database['public']['Tables']['payments']['Row']['status'],
    additionalData?: Partial<Database['public']['Tables']['payments']['Update']>
  ) => {
    const updateData = {
      status,
      ...additionalData,
      ...(status === 'paid' && { approved_at: new Date().toISOString() }),
      ...(status === 'canceled' && { canceled_at: new Date().toISOString() })
    }

    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('payment_key', paymentKey)
      .select()
      .single()
    return { data, error }
  },

  // 결제수단 저장
  savePaymentMethod: async (methodData: Database['public']['Tables']['payment_methods']['Insert']) => {
    const { data, error } = await supabase
      .from('payment_methods')
      .insert(methodData)
      .select()
      .single()
    return { data, error }
  },

  // 사용자의 결제수단 목록 조회
  getUserPaymentMethods: async (userId: string) => {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // 기본 결제수단 설정
  setDefaultPaymentMethod: async (userId: string, methodId: string) => {
    // 먼저 모든 결제수단의 기본값을 false로 설정
    await supabase
      .from('payment_methods')
      .update({ is_default: false })
      .eq('user_id', userId)

    // 선택한 결제수단을 기본으로 설정
    const { data, error } = await supabase
      .from('payment_methods')
      .update({ is_default: true })
      .eq('id', methodId)
      .eq('user_id', userId)
      .select()
      .single()
    return { data, error }
  },

  // 결제수단 삭제 (비활성화)
  deletePaymentMethod: async (methodId: string) => {
    const { data, error } = await supabase
      .from('payment_methods')
      .update({ is_active: false })
      .eq('id', methodId)
      .select()
      .single()
    return { data, error }
  },

  // 사용자 결제 통계 조회
  getUserPaymentStats: async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount, created_at')
      .eq('user_id', userId)
      .eq('status', 'paid')
    return { data, error }
  }
}