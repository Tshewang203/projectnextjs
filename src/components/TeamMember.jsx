import Image from 'next/image';

export default function TeamMember({ image, name, role, email }) {
  return (
    <div className="team-member text-center">
      <div className="relative h-64 w-full mb-4 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h5 className="text-xl font-['Cinzel'] font-semibold">{name}</h5>
      <p className="text-gray-600 mb-2 font-['Playfair_Display']">{role}</p>
      <a 
        href={`mailto:${email}`}
        className="text-[var(--river-blue)] hover:text-[var(--dzong-blue)] transition-colors font-['Playfair_Display']"
      >
        {email}
      </a>
    </div>
  );
} 