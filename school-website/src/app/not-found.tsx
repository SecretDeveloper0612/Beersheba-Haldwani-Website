import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-[#3B2565] mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-[#3B2565] text-white rounded-xl font-bold hover:bg-[#2A1a4a] transition-all"
      >
        Return Home
      </Link>
    </div>
  )
}
