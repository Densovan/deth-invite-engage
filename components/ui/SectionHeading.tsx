import React from 'react';

export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16 relative z-10">
      <h2 className="font-moulpali text-khmer-burgundy text-3xl md:text-5xl mb-6 leading-loose drop-shadow-sm tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="font-playfair italic text-khmer-gold text-xl md:text-2xl uppercase tracking-[0.3em] opacity-80">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-khmer-gold" />
        <div className="w-2 h-2 rotate-45 border border-khmer-gold" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-khmer-gold" />
      </div>
    </div>
  );
}
