export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <div className="relative mx-auto flex w-full flex-auto justify-center lg:max-w-6xl lg:px-6">
        {children}
      </div>
    </div>
  )
}
