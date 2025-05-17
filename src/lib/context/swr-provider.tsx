// * Libraries
import { SWRConfig } from 'swr'

// * http
import clientFetcher from '@/helpers/http/clientFetcher'

// * Helpers
import handleErrorClient from '@/helpers/error/handleErrorClient'

const listStatusRetry = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504 // Gateway Timeout
]

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        // provider: localStorageProviderWrapper, // Sử dụng localStorage để lưu trữ dữ liệu
        revalidateOnFocus: false, // Không tự động làm mới khi focus cửa sổ
        revalidateOnMount: false, // Không tự động làm mới khi mount
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (listStatusRetry.includes(error.status)) return revalidate({ retryCount })
          handleErrorClient({ error }) // Xử lý lỗi nếu không phải trong danh sách retry
          return
        }, // Tự động thử lại khi gặp lỗi
        keepPreviousData: true, // Giữ lại dữ liệu trước đó trong khi đang tải dữ liệu mới
        fetcher: clientFetcher.get // Hàm fetcher mặc định
      }}
    >
      {children}
    </SWRConfig>
  )
}
