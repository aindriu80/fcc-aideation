import TypewriterTitle from '@/src/components/TypewriterTitle'

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r min-h-screen from-rose-100 to-teal-100 grainy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-semibold text-7xl text-center">
            AI <span className="text-green-600 font-bold">note taking</span>{' '}
            assistant
          </h1>
          <div className="mt-4"></div>
          <h2 className="font-semibold text-3xl text-center text-slate-700">
            <TypewriterTitle />
          </h2>
        </div>
      </div>
    </>
  )
}
