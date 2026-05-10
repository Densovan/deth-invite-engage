"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Heart, Calendar, MapPin, Music, Phone, ChevronDown, Music2, User } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Petals from "@/components/ui/Petals";
import Countdown from "@/components/ui/Countdown";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

function GuestGreeting() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("guest");

  if (!guestName) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="mt-20 md:mt-24 group w-full px-4 max-w-2xl mx-auto relative z-20"
    >
      <div className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/30 backdrop-blur-xl border border-khmer-gold/20 shadow-2xl overflow-hidden">
        {/* Animated Gold Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-khmer-gold/10 via-transparent to-khmer-gold/10 opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-khmer-burgundy flex items-center justify-center shadow-lg border border-khmer-gold/30">
            <User className="w-7 h-7 text-khmer-gold" />
          </div>
          <p className="font-suwannaphum text-xl text-khmer-burgundy/80 italic tracking-wide">សូមគោរពអញ្ជើញ</p>
          <h2 className="font-moul text-2xl md:text-5xl text-khmer-gold-dark gold-shimmer text-center leading-[1.6] py-2">
            {guestName}
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-khmer-gold to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-khmer-cream font-suwannaphum">កំពុងដំណើរការ...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const engagementDate = "2026-06-21T08:00:00";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/គគរង.mp3");
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-khmer-gold/30 scroll-smooth">
      <Petals />
      
      {/* Floating Music Button */}
      <motion.button 
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          rotate: isPlaying ? 360 : 0
        }}
        transition={{ 
          rotate: isPlaying ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 0.5 }
        }}
        onClick={toggleMusic}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${
          isPlaying ? 'bg-khmer-gold text-khmer-burgundy' : 'bg-khmer-burgundy text-white'
        }`}
      >
        {isPlaying && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-khmer-gold rounded-full"
          />
        )}
        {isPlaying ? <Music2 className="w-7 h-7 relative z-10" /> : <Music className="w-7 h-7 relative z-10" />}
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 bg-white text-khmer-burgundy px-4 py-2 rounded-lg text-sm font-suwannaphum opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none border border-khmer-gold/20">
          {isPlaying ? 'បិទតន្ត្រី' : 'ស្តាប់តន្ត្រី'}
        </div>
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-48 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="fixed inset-0">
            <Image 
              src="/images/IMG_2410.JPG"
              alt="Hero Background"
              fill
              className="object-cover opacity-50 contrast-[1.05]"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-khmer-burgundy/60 via-transparent to-khmer-cream z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center gap-16"
        >
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-moul text-khmer-gold-light text-xl md:text-2xl tracking-[0.2em] mb-10 flex items-center gap-4 drop-shadow-lg"
            >
              <div className="h-[2px] w-12 bg-khmer-gold" />
              សិរីសួស្តីពិធីភ្ជាប់ពាក្យ
              <div className="h-[2px] w-12 bg-khmer-gold" />
            </motion.div>

            {/* Portrait Frame */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-64 h-64 md:w-80 md:h-80 mb-12 p-3 rounded-full border-4 border-khmer-gold shadow-2xl overflow-hidden"
            >
                <Image 
                  src="/images/IMG_2456.JPG"
                  alt="Couple" 
                  fill 
                  className="object-cover"
                />
            </motion.div>

            <motion.h1 
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="font-moul text-4xl md:text-7xl text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] leading-relaxed gold-shimmer">
                ដេត & ពេជ្រ
              </span>
              <span className="font-playfair text-2xl md:text-4xl text-khmer-gold-light italic tracking-[0.4em] uppercase gold-shimmer drop-shadow-md">
                Deth & Pich
              </span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-12 w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center">
              <p className="font-suwannaphum text-2xl text-white mb-4 font-bold drop-shadow-md">ថ្ងៃអាទិត្យ ទី២១ ខែមិថុនា ឆ្នាំ២០២៦</p>
              <div className="h-[3px] w-48 bg-gradient-to-r from-transparent via-khmer-gold to-transparent mx-auto mb-1 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </div>
            <Countdown targetDate={engagementDate} />
            <GuestGreeting />
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-khmer-gold cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-10 h-10 opacity-60" />
        </motion.div>
      </section>

      {/* Invitation Section with Glassmorphism */}
      <section className="py-40 px-6 bg-white relative z-10">
        <motion.div 
          {...fadeIn}
          className="max-w-3xl mx-auto text-center space-y-10 relative"
        >
          {/* Decorative Corner */}
          <div className="absolute -top-12 -left-12 w-24 h-24 border-t-4 border-l-4 border-khmer-gold/20 rounded-tl-3xl hidden md:block" />
          <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-4 border-r-4 border-khmer-gold/20 rounded-br-3xl hidden md:block" />

          <SectionHeading 
            title="សេចក្តីជូនដំណឹង" 
            subtitle="Honored to have you" 
          />
          <div className="p-10 md:p-16 rounded-[2rem] bg-khmer-cream/30 border border-khmer-gold/10 backdrop-blur-sm shadow-inner">
            <p className="font-suwannaphum text-xl leading-[2.2] text-khmer-text text-justify md:text-center italic">
              យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ លោក លោកស្រី អ្នកនាងកញ្ញា ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីបញ្ចជាប់ពាក្យ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ ដែលនឹងប្រព្រឹត្តទៅតាមកម្មវិធីដូចខាងក្រោម។ វត្តមានរបស់លោកអ្នកគឺជាកិត្តិយសដ៏ខ្ពង់ខ្ពស់បំផុតសម្រាប់យើងខ្ញុំ។
            </p>
          </div>
        </motion.div>
      </section>

      {/* Event Schedule Section with Modern Cards */}
      <section className="py-40 px-6 bg-[#f8f5f0] relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="កម្មវិធីសិរីមង្គល" 
              subtitle="The Grand Celebration" 
            />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 pt-16">
             {/* Morning Ceremony */}
             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.2 }}
               className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-khmer-gold/5 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-khmer-burgundy/5 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-khmer-burgundy text-white rounded-2xl shadow-lg shadow-khmer-burgundy/20">
                      <Calendar className="w-7 h-7" />
                   </div>
                   <h3 className="font-moul text-2xl text-khmer-burgundy tracking-wide">ពិធីពេលព្រឹក</h3>
                </div>
                <ul className="space-y-6 font-suwannaphum relative z-10">
                   {[
                     { time: "០៧:៣០ ព្រឹក", desc: "ជួបជុំភ្ញៀវកិត្តិយស" },
                     { time: "០៨:០០ ព្រឹក", desc: "ពិធីហែជំនូន និងកាត់ខាន់ស្លា" },
                     { time: "០៩:៣០ ព្រឹក", desc: "ពិធីបំពាក់ចិញ្ចៀន" }
                   ].map((item, idx) => (
                     <li key={idx} className="flex justify-between items-center group/item">
                        <span className="text-khmer-gold font-bold font-playfair text-lg">{item.time}</span>
                        <span className="h-px flex-1 mx-4 bg-khmer-gold/10 group-hover/item:bg-khmer-gold/30 transition-colors" />
                        <span className="text-lg">{item.desc}</span>
                     </li>
                   ))}
                </ul>
             </motion.div>

             {/* Evening Party */}
             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.4 }}
               className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-khmer-gold/5 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-khmer-gold/5 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-khmer-gold text-white rounded-2xl shadow-lg shadow-khmer-gold/20">
                      <Music className="w-7 h-7" />
                   </div>
                   <h3 className="font-moul text-2xl text-khmer-gold tracking-wide">ពិធីពេលល្ងាច</h3>
                </div>
                <ul className="space-y-6 font-suwannaphum relative z-10">
                   {[
                     { time: "០៤:៣០ ល្ងាច", desc: "ទទួលភ្ញៀវកិត្តិយស" },
                     { time: "០៦:០០ ល្ងាច", desc: "ចាប់ផ្តើមកម្មវិធីពិសាអាហារ" },
                     { time: "០៨:០០ យប់", desc: "កម្មវិធីរាំកម្សាន្ត" }
                   ].map((item, idx) => (
                     <li key={idx} className="flex justify-between items-center group/item">
                        <span className="text-khmer-burgundy font-bold font-playfair text-lg">{item.time}</span>
                        <span className="h-px flex-1 mx-4 bg-khmer-gold/10 group-hover/item:bg-khmer-gold/30 transition-colors" />
                        <span className="text-lg">{item.desc}</span>
                     </li>
                   ))}
                </ul>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Traditional Gallery Section */}
      <section className="py-40 px-6 bg-white relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="លម្អិតកម្មវិធីបញ្ចជាប់ពាក្យ" 
              subtitle="Traditional Khmer Rituals" 
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {[
              { 
                title: "ជំនូន និងផ្លែឈើ", 
                desc: "Traditional Fruit Offerings (Phkar Sla)",
                img: "https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=1000&auto=format&fit=crop"
              },
              { 
                title: "សម្លៀកបំពាក់ប្រពៃណី", 
                desc: "Traditional Silk Attire",
                img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
              },
              { 
                title: "ការបំពាក់ចិញ្ចៀន", 
                desc: "The Ring Ceremony",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-96 rounded-[2rem] overflow-hidden shadow-xl border border-khmer-gold/10"
              >
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-khmer-burgundy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <h4 className="font-moul text-xl mb-2">{item.title}</h4>
                  <p className="font-playfair italic text-sm text-khmer-gold">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section (User Images) */}
      <section className="py-40 px-6 bg-[#fcfaf7] relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="អនុស្សាវរីយ៍" 
              subtitle="Our Beautiful Memories" 
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            {[
              { img: "/images/IMG_2407.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ១" },
              { img: "/images/IMG_2410.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ២" },
              { img: "/images/IMG_2456.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ៣" },
              { img: "/images/IMG_2520.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ៤" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
              >
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-khmer-burgundy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section with Styled Map */}
      <section id="location" className="py-40 px-6 bg-white relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeIn} className="flex flex-col items-center gap-6 mb-12">
            <SectionHeading 
              title="ទីតាំងកម្មវិធី" 
              subtitle="Ceremony Location" 
            />
             <div className="p-5 bg-khmer-gold text-white rounded-full shadow-xl shadow-khmer-gold/30 scale-110 mt-6">
                <MapPin className="w-8 h-8" />
             </div>
             <p className="text-3xl font-moul text-khmer-burgundy mt-4">គេហដ្ឋាន ខាងស្រី</p>
             <p className="text-xl text-khmer-text/60 italic font-playfair uppercase tracking-widest">Venue Address</p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-khmer-cream group"
          >
             <iframe 
                src="https://www.google.com/maps?q=11.534336,104.9034752&output=embed"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              />
          </motion.div>

          <div className="mt-12">
            <motion.a 
              href="https://maps.app.goo.gl/fC1DPnzCQWMbmzZk8"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-khmer-burgundy text-white px-10 py-5 rounded-full font-moul shadow-xl hover:bg-khmer-burgundy/90 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              មើលក្នុង Google Maps
            </motion.a>
          </div>
        </div>
      </section>

      {/* RSVP Section with Rich Colors */}
      <section className="py-40 px-6 bg-khmer-burgundy text-khmer-cream relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/az-subtle.png')` }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="ទំនាក់ទំនង" 
              subtitle="RSVP and Wishes" 
            />
            <p className="font-suwannaphum text-xl mb-16 opacity-80 max-w-xl mx-auto leading-relaxed">
              សូមផ្តល់ព័ត៌មានសម្រាប់ការចូលរួមរបស់លោកអ្នកមុនថ្ងៃទី ១៥ ខែធ្នូ ដើម្បីយើងខ្ញុំបានរៀបចំការទទួលបដិសណ្ឋារកិច្ចឱ្យបានសមរម្យ។
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
             {[
               { side: "ខាងកូនប្រុស", phone: "012 345 678" },
               { side: "ខាងកូនស្រី", phone: "087 654 321" }
             ].map((contact, idx) => (
               <motion.a 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.2 }}
                href={`tel:${contact.phone.replace(/\s/g, '')}`} 
                className="flex items-center justify-center gap-6 bg-white/10 hover:bg-white/20 p-10 rounded-[2.5rem] transition-all border border-white/10 group hover:-translate-y-2 backdrop-blur-md"
               >
                  <div className="w-14 h-14 rounded-2xl bg-khmer-gold flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                    <Phone className="w-7 h-7 text-khmer-burgundy" />
                  </div>
                  <div className="text-left">
                     <p className="font-suwannaphum text-base opacity-70 mb-1">{contact.side}</p>
                     <p className="font-playfair font-bold text-2xl tracking-widest text-khmer-gold drop-shadow-sm">{contact.phone}</p>
                  </div>
               </motion.a>
             ))}
          </div>
        </div>
      </section>

      {/* Footer Blessing */}
      <footer className="py-20 bg-[#fdfaf5] text-center border-t border-khmer-gold/10">
         <motion.div {...fadeIn}>
           <div className="mb-8 flex items-center justify-center gap-4 text-khmer-gold/30">
              <div className="h-px w-20 bg-current" />
              <Heart className="w-6 h-6 fill-current" />
              <div className="h-px w-20 bg-current" />
           </div>
           <p className="font-moul text-khmer-burgundy text-2xl mb-4 leading-loose">សូមអរគុណ និងសូមជូនពរសុខភាពល្អ</p>
           <p className="font-playfair italic text-khmer-gold text-lg uppercase tracking-[0.4em]">Deth & Pich Wedding Invitation | 2026</p>
         </motion.div>
      </footer>
    </main>
  );
}
