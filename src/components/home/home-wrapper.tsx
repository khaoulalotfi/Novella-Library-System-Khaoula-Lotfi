import Image from "next/image";

export function HomeWrapper() {
  return (
    <div
      className="relative h-[calc(100vh-64px)] overflow-hidden -mx-6 -my-4"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <Image
        src="/library.jpg"
        alt="Library"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          className="text-2xl md:text-4xl font-semibold text-white italic"
          style={{ textShadow: "1px 2px 8px rgba(0,0,0,0.9)" }}
        >
          Stories that stay glowing long after the last page.
        </p>
      </div>
    </div>
  );
}
