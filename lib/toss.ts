// 토스페이먼츠 클라이언트 설정
export const TOSS_CONFIG = {
  // 테스트 환경 키
  clientKey: 'test_ck_QbgMGZzorzmmyyNgBw1KVl5E1em4',
  secretKey: 'test_sk_4yKeq5bgrpL00b19EeZBrGX0lzW6',
  
  // 환경 설정
  isTest: true,
  
  // 기본 설정
  currency: 'KRW',
  country: 'KR',
  
  // 리다이렉트 URL
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
  failUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/fail`,
  pendingUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/pending`,
  
  // 브랜드페이 리다이렉트 URL
  brandpayRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/brandpay`,
}

// 시크릿 키 인코딩 함수
export const encodeSecretKey = (secretKey: string): string => {
  return Buffer.from(`${secretKey}:`).toString('base64')
}

// 토스페이먼츠 API 헤더 생성
export const getTossHeaders = () => {
  return {
    'Authorization': `Basic ${encodeSecretKey(TOSS_CONFIG.secretKey)}`,
    'Content-Type': 'application/json',
  }
}

// 고유 ID 생성 함수들
export const generateOrderId = (): string => {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const generateCustomerKey = (userId: string): string => {
  return `customer_${userId}_${Date.now()}`
}

export const generatePaymentKey = (): string => {
  return `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 토스페이먼츠 API 엔드포인트
export const TOSS_API_ENDPOINTS = {
  // 결제 승인
  confirmPayment: 'https://api.tosspayments.com/v1/payments/confirm',
  
  // 빌링키 발급 (카드)
  createCardBillingKey: 'https://api.tosspayments.com/v1/billing/authorizations/card',
  
  // 빌링키 발급 (계좌이체)
  createTransferBillingKey: 'https://api.tosspayments.com/v1/billing/authorizations/transfer',
  
  // 카드 자동결제 승인
  approveCardBilling: 'https://api.tosspayments.com/v1/billing/',
  
  // 계좌이체 자동결제 승인
  approveTransferBilling: 'https://api.tosspayments.com/v1/billing/',
  
  // 빌링키 삭제
  deleteBillingKey: 'https://api.tosspayments.com/v1/billing/',
  
  // 브랜드페이 Access Token 발급
  brandpayAccessToken: 'https://api.tosspayments.com/v1/brandpay/oauth/token',
  
  // 브랜드페이 결제 승인
  brandpayConfirm: 'https://api.tosspayments.com/v1/brandpay/payments/confirm',
}

// 결제 타입 정의
export type PaymentMethod = 'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT' | 'MOBILE' | 'BRANDPAY'
export type PaymentStatus = 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'ABORTED' | 'EXPIRED'
export type BillingStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED'

// 결제 요청 데이터 타입
export interface PaymentRequest {
  orderId: string
  orderName: string
  amount: number
  customerKey: string
  customerEmail?: string
  customerName?: string
  customerMobilePhone?: string
  successUrl: string
  failUrl: string
  pendingUrl?: string
}

// 빌링키 발급 요청 데이터 타입
export interface BillingKeyRequest {
  customerKey: string
  customerName?: string
  customerEmail?: string
  customerMobilePhone?: string
}

// 카드 빌링키 발급 요청 데이터 타입
export interface CardBillingKeyRequest extends BillingKeyRequest {
  cardNumber: string
  cardExpirationYear: string
  cardExpirationMonth: string
  customerIdentityNumber: string
  cardPassword?: string
}

// 자동결제 승인 요청 데이터 타입
export interface BillingApproveRequest {
  customerKey: string
  orderId: string
  orderName: string
  amount: number
  customerEmail?: string
  customerName?: string
  customerMobilePhone?: string
  taxFreeAmount?: number
  vat?: number
}

// 브랜드페이 Access Token 요청 데이터 타입
export interface BrandpayAccessTokenRequest {
  code: string
  customerKey: string
  grantType: 'AuthorizationCode' | 'RefreshToken'
  refreshToken?: string
}

// 토스페이먼츠 응답 타입
export interface TossPaymentResponse {
  mId: string
  version: string
  paymentKey: string
  status: PaymentStatus
  lastTransactionKey: string
  orderId: string
  orderName: string
  requestedAt: string
  approvedAt: string
  useEscrow: boolean
  cultureExpense: boolean
  card?: {
    issuerCode: string
    acquirerCode: string
    number: string
    installmentPlanMonths: number
    isInterestFree: boolean
    interestPayer: string | null
    approveNo: string
    useCardPoint: boolean
    cardType: string
    ownerType: string
    acquireStatus: string
    amount: number
  }
  transfer?: {
    bankCode: string
    settlementStatus: string
  }
  virtualAccount?: any
  mobilePhone?: any
  giftCertificate?: any
  cashReceipt?: any
  cashReceipts?: any
  discount?: any
  cancels?: any
  secret?: any
  type: string
  easyPay?: any
  country: string
  failure?: any
  isPartialCancelable: boolean
  receipt: {
    url: string
  }
  checkout: {
    url: string
  }
  currency: string
  totalAmount: number
  balanceAmount: number
  suppliedAmount: number
  vat: number
  taxFreeAmount: number
  metadata?: any
  method: string
}

// 빌링키 응답 타입
export interface TossBillingKeyResponse {
  mId: string
  customerKey: string
  authenticatedAt: string
  method: string
  billingKey: string
  card?: {
    issuerCode: string
    acquirerCode: string
    number: string
    cardType: string
    ownerType: string
  }
  easyPay?: any
}

// 브랜드페이 Access Token 응답 타입
export interface BrandpayAccessTokenResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

// 에러 응답 타입
export interface TossErrorResponse {
  code: string
  message: string
}

// 토스페이먼츠 API 함수들
export class TossPaymentsAPI {
  private static async makeRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' = 'POST',
    data?: any
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method,
        headers: getTossHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        const errorData: TossErrorResponse = await response.json()
        throw new Error(`토스페이먼츠 API 오류: ${errorData.message} (${errorData.code})`)
      }

      return await response.json()
    } catch (error) {
      console.error('토스페이먼츠 API 요청 실패:', error)
      throw error
    }
  }

  // 결제 승인
  static async confirmPayment(
    paymentKey: string,
    orderId: string,
    amount: number
  ): Promise<TossPaymentResponse> {
    return this.makeRequest<TossPaymentResponse>(
      TOSS_API_ENDPOINTS.confirmPayment,
      'POST',
      {
        paymentKey,
        orderId,
        amount,
      }
    )
  }

  // 카드 빌링키 발급
  static async createCardBillingKey(
    request: CardBillingKeyRequest
  ): Promise<TossBillingKeyResponse> {
    return this.makeRequest<TossBillingKeyResponse>(
      TOSS_API_ENDPOINTS.createCardBillingKey,
      'POST',
      request
    )
  }

  // 계좌이체 빌링키 발급
  static async createTransferBillingKey(
    request: BillingKeyRequest
  ): Promise<TossBillingKeyResponse> {
    return this.makeRequest<TossBillingKeyResponse>(
      TOSS_API_ENDPOINTS.createTransferBillingKey,
      'POST',
      request
    )
  }

  // 카드 자동결제 승인
  static async approveCardBilling(
    billingKey: string,
    request: BillingApproveRequest
  ): Promise<TossPaymentResponse> {
    return this.makeRequest<TossPaymentResponse>(
      `${TOSS_API_ENDPOINTS.approveCardBilling}${billingKey}`,
      'POST',
      request
    )
  }

  // 계좌이체 자동결제 승인
  static async approveTransferBilling(
    billingKey: string,
    request: BillingApproveRequest
  ): Promise<TossPaymentResponse> {
    return this.makeRequest<TossPaymentResponse>(
      `${TOSS_API_ENDPOINTS.approveTransferBilling}${billingKey}`,
      'POST',
      request
    )
  }

  // 빌링키 삭제
  static async deleteBillingKey(billingKey: string): Promise<void> {
    return this.makeRequest<void>(
      `${TOSS_API_ENDPOINTS.deleteBillingKey}${billingKey}`,
      'DELETE'
    )
  }

  // 브랜드페이 Access Token 발급
  static async getBrandpayAccessToken(
    request: BrandpayAccessTokenRequest
  ): Promise<BrandpayAccessTokenResponse> {
    return this.makeRequest<BrandpayAccessTokenResponse>(
      TOSS_API_ENDPOINTS.brandpayAccessToken,
      'POST',
      request
    )
  }

  // 브랜드페이 결제 승인
  static async confirmBrandpayPayment(
    paymentKey: string,
    orderId: string,
    amount: number,
    accessToken: string
  ): Promise<TossPaymentResponse> {
    const headers = {
      ...getTossHeaders(),
      'Authorization': `Bearer ${accessToken}`,
    }

    try {
      const response = await fetch(TOSS_API_ENDPOINTS.brandpayConfirm, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      })

      if (!response.ok) {
        const errorData: TossErrorResponse = await response.json()
        throw new Error(`브랜드페이 결제 승인 오류: ${errorData.message} (${errorData.code})`)
      }

      return await response.json()
    } catch (error) {
      console.error('브랜드페이 결제 승인 실패:', error)
      throw error
    }
  }
}

// 토스페이먼츠 SDK 초기화 함수
export const initializeTossPayments = () => {
  if (typeof window === 'undefined') return null
  
  // 토스페이먼츠 SDK가 로드되었는지 확인
  if (!window.TossPayments) {
    console.error('토스페이먼츠 SDK가 로드되지 않았습니다.')
    return null
  }

  return window.TossPayments(TOSS_CONFIG.clientKey)
}

// 토스페이먼츠 위젯 초기화 함수
export const initializeTossWidgets = (customerKey: string) => {
  const tossPayments = initializeTossPayments()
  if (!tossPayments) return null

  return tossPayments.widgets({
    customerKey,
    brandpay: {
      redirectUrl: TOSS_CONFIG.brandpayRedirectUrl,
    },
  })
}

// 토스페이먼츠 결제 객체 초기화 함수
export const initializeTossPayment = (customerKey: string) => {
  const tossPayments = initializeTossPayments()
  if (!tossPayments) return null

  return tossPayments.payment({ customerKey })
}

// 전역 타입 선언
declare global {
  interface Window {
    TossPayments: (clientKey: string) => any
  }
}
