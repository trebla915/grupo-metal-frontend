export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-rose hover:text-rose-400 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  )
} 