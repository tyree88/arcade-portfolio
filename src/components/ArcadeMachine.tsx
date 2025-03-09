
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ArcadeMachineProps = {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  color?: 'green' | 'tan' | 'brown';
};

export default function ArcadeMachine({
  title,
  description,
  imageUrl,
  link,
  color = 'green'
}: ArcadeMachineProps) {
  const colorClasses = {
    green: 'from-ps-green to-ps-sage',
    tan: 'from-ps-tan to-ps-beige',
    brown: 'from-ps-brown to-ps-beige',
  };

  return (
    <div className={`arcade-cabinet bg-gradient-to-br ${colorClasses[color]} hover-bounce`}>
      <div className="crt-screen aspect-video w-full mb-4 relative overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-ps-cream pixel-text">{title}</div>
            </div>
          </div>
        )}
        
        {/* CRT effect overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px'
        }}></div>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full animate-scanline" style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)'
          }}></div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-ps-cream mb-2 anime-highlight">{title}</h3>
      <p className="text-ps-cream text-sm mb-4">{description}</p>
      
      <Link href={link}>
        <button className="bg-ps-cream text-ps-brown px-4 py-2 rounded font-bold text-sm uppercase hover:bg-ps-tan transition-colors">
          Play Now
        </button>
      </Link>
      
      {/* Arcade machine controls */}
      <div className="flex justify-between mt-4">
        <div className="w-8 h-8 rounded-full bg-ps-tan border-2 border-ps-cream"></div>
        <div className="flex space-x-2">
          <button className="w-6 h-6 rounded-full bg-ps-green border-2 border-ps-cream text-ps-cream font-bold text-xs">A</button>
          <button className="w-6 h-6 rounded-full bg-ps-tan border-2 border-ps-cream text-ps-brown font-bold text-xs">B</button>
        </div>
      </div>
    </div>
  );
}
