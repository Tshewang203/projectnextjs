import Image from 'next/image'
import Link from 'next/link'

export default function FeatureCard({ image, title, description, link, linkText }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] flex flex-col">
      <div className="relative h-72">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4 font-['Cinzel'] text-[var(--dzong-blue)]">{title}</h3>
        <p className="text-[var(--text-dark)] mb-6 font-['Playfair_Display'] flex-grow">{description}</p>
        <Link
          href={link}
          className="inline-block px-6 py-3 bg-[var(--dzong-blue)] text-white rounded-lg hover:bg-[var(--river-blue)] transition-colors font-['Cinzel'] text-center"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
} 