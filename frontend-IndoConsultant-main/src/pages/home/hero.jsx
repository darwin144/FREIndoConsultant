export default function Hero() {
  return (
    <div
      className="relative w-full h-[100vh] sm:h-[80vh] md:h-[70vh] lg:h-[100vh] px-4 sm:px-6 lg:px-8 pt-32 sm:pt-44 md:pt-56 lg:pt-32"
      style={{
        backgroundImage: `url('/2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-center h-full">
      </div>
    </div>
  );
}
