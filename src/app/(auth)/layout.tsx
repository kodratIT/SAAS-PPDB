export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">PPDB SaaS</h1>
          <p className="text-xl text-blue-100">
            Sistem Penerimaan Peserta Didik Baru
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Mudah Digunakan</h3>
              <p className="text-blue-100">
                Interface intuitif untuk semua pengguna
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Aman & Terpercaya</h3>
              <p className="text-blue-100">Keamanan data siswa terjamin</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Proses Cepat</h3>
              <p className="text-blue-100">Pendaftaran online yang efisien</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          &copy; 2024 PPDB SaaS. All rights reserved.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
