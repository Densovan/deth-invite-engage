"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Heart, Calendar, MapPin, Music, Phone, ChevronDown, Music2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Petals from "@/components/ui/Petals";
import Countdown from "@/components/ui/Countdown";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

function GuestGreeting({ name }: { name?: string | null }) {
  const searchParams = useSearchParams();
  const guestName = name || searchParams.get("guest");

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
          <h2 className="font-moulpali text-2xl md:text-5xl text-khmer-gold-dark gold-shimmer text-center leading-[1.6] py-2">
            {guestName}
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-khmer-gold to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Invitation({ guestName }: { guestName?: string }) {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-khmer-cream font-suwannaphum">កំពុងដំណើរការ...</div>}>
      <InvitationContent guestName={guestName} />
    </Suspense>
  );
}

function InvitationContent({ guestName: propGuestName }: { guestName?: string }) {
  const searchParams = useSearchParams();
  const guestName = propGuestName || searchParams.get("guest");
  
  const engagementDate = "2026-06-21T08:00:00";
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/គគរង.mp3");
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
      setIsPlaying(true);
    }
    setIsOpened(true);
  };

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
      {/* Welcome Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-khmer-burgundy text-khmer-gold overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/IMG_2410.JPG"
                alt="Background"
                fill
                className="object-cover opacity-50 md:opacity-70 transition-all duration-1000"
                priority
              />
              {/* Premium cinematic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 z-1" />
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg md:max-w-4xl lg:max-w-5xl mx-auto"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-khmer-gold flex items-center justify-center mb-4 md:mb-8 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <Heart className="w-7 h-7 md:w-10 md:h-10 text-khmer-gold animate-pulse" />
              </div>
               <p className="font-suwannaphum text-base xs:text-lg md:text-2xl text-khmer-cream mb-4 md:mb-8 tracking-wide">
                សិរីសួស្តីពិធីភ្ជាប់ពាក្យ
              </p>
              <h1 
                className="font-moulpali text-xl xs:text-2xl md:text-4xl lg:text-6xl bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] mb-6 md:mb-10 leading-snug md:leading-relaxed tracking-wide pb-2"
                style={{ WebkitTextStroke: '1px #D4AF37', WebkitTextStrokeWidth: '1px' }}
              >
                ម៉ៅ វណ្ណដេត និង លឹម ស្រីពេជ្រ
              </h1>
              
              {guestName && (
                <div className="mb-12 flex flex-col items-center gap-3">
                  <p className="font-suwannaphum text-lg text-khmer-cream/80 italic">សូមគោរពអញ្ជើញ</p>
                  <h2 className="font-moulpali text-2xl md:text-4xl text-white gold-shimmer">{guestName}</h2>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-khmer-gold to-transparent mt-2" />
                </div>
              )}

              <motion.button 
                onClick={handleOpenInvitation}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: "0 0 50px rgba(212, 175, 55, 0.8)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 20px rgba(212,175,55,0.3)", "0 0 35px rgba(212,175,55,0.6)", "0 0 20px rgba(212,175,55,0.3)"]
                }}
                transition={{
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
                className="group relative px-10 py-5 overflow-hidden rounded-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] text-khmer-burgundy font-moulpali text-xl transition-all border border-khmer-gold/30 cursor-pointer"
              >
                {/* Shining golden sweep light */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 w-[150%]"
                  initial={{ left: "-150%" }}
                  animate={{ left: "150%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5, 
                    ease: "linear",
                    repeatDelay: 1.5
                  }}
                />
                
                <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                  បើកលិខិតអញ្ជើញ 
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="font-moulpali text-khmer-gold-light text-xl md:text-2xl tracking-[0.2em] mb-10 flex items-center gap-4 drop-shadow-lg"
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
                  src="/images/IMG_2520.png"
                  alt="Couple" 
                  fill 
                  className="object-cover"
                />
            </motion.div>

            <motion.div 
              className="flex flex-col items-center justify-center gap-6 my-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
            >
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full max-w-full px-2">
                <span 
                  className="font-moulpali text-2xl xs:text-3xl sm:text-5xl md:text-8xl bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] text-transparent bg-clip-text drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] tracking-wide inline-block pb-2 md:pb-6 pt-2 leading-relaxed shrink-0"
                  style={{ WebkitTextStroke: '1px #D4AF37', WebkitTextStrokeWidth: '1px' }}
                >
                  ម៉ៅវណ្ណ ដេត
                </span>
                <span className="font-moulpali text-sm xs:text-base sm:text-2xl md:text-5xl text-[#D4AF37] opacity-90 drop-shadow-md shrink-0">
                  និង
                </span>
                <span 
                  className="font-moulpali text-2xl xs:text-3xl sm:text-5xl md:text-8xl bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] text-transparent bg-clip-text drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] tracking-wide inline-block pb-2 md:pb-6 pt-2 leading-relaxed shrink-0"
                  style={{ WebkitTextStroke: '1px #D4AF37', WebkitTextStrokeWidth: '1px' }}
                >
                  លឹមស្រី ពេជ្រ
                </span>
              </div>
            </motion.div>
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
            <GuestGreeting name={guestName} />
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
          
          <div className="grid md:grid-cols-1 gap-16 pt-16">
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
                   <h3 className="font-moulpali text-2xl text-khmer-burgundy tracking-wide">ពិធីពេលព្រឹក</h3>
                </div>
                <ul className="space-y-6 font-suwannaphum relative z-10">
                   {[
                     { time: "០៧:៣០", desc: "ជួបជុំគ្រួសារបងប្អូន ភ្ញៀវកិត្តិយសពិសាអាហារព្រឹក" },
                     { time: "០៨:០០", desc: "ពិធីហែរជំនូន" },
                     { time: "០៨:៣០", desc: "ពិធីបំពាក់ចិញ្ចៀន" },
                     { time: "០៩:០០", desc: "ពិធីសុីស្លាម្លូ" },
                     { time: "០៩:៣០", desc: "ផ្ទឹមចងដៃពរជ័យ" },
                     { time: "១០:០០", desc: "ជួបជុំគ្រួសារបងប្អូន ភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់" }
                   ].map((item, idx) => (
                     <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 group/item border-b border-khmer-gold/5 pb-4 sm:pb-0 sm:border-0">
                        <div className="flex items-center gap-3 shrink-0">
                           <span className="w-2.5 h-2.5 rounded-full bg-khmer-gold/40 group-hover/item:bg-khmer-gold group-hover/item:scale-125 transition-all duration-300" />
                           <span className="text-khmer-gold font-bold font-playfair text-lg min-w-[60px]">{item.time}</span>
                        </div>
                        <span className="hidden sm:block h-[1px] flex-1 bg-khmer-gold/10 group-hover/item:bg-khmer-gold/30 transition-colors" />
                        <span className="text-base sm:text-lg text-khmer-text sm:text-right font-medium group-hover/item:text-khmer-burgundy transition-colors pl-5 sm:pl-0">{item.desc}</span>
                     </li>
                   ))}
                </ul>
             </motion.div>

             {/* Evening Party */}
             {/* <motion.div 
               {...fadeIn}
               transition={{ delay: 0.4 }}
               className="group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-khmer-gold/5 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-khmer-gold/5 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-khmer-gold text-white rounded-2xl shadow-lg shadow-khmer-gold/20">
                      <Music className="w-7 h-7" />
                   </div>
                   <h3 className="font-moulpali text-2xl text-khmer-gold tracking-wide">ពិធីពេលល្ងាច</h3>
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
             </motion.div> */}
          </div>
        </div>
      </section>

      {/* Traditional Gallery Section */}
      {/* <section className="py-40 px-6 bg-white relative z-10 overflow-hidden">
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
                  <h4 className="font-moulpali text-xl mb-2">{item.title}</h4>
                  <p className="font-playfair italic text-sm text-khmer-gold">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Video Memories Section */}
      <section className="py-40 px-6 bg-white relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="វីដេអូអនុស្សាវរីយ៍" 
              subtitle="Our Love Story Video" 
            />
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="w-full max-w-3xl mx-auto mt-16 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-black relative"
          >
            <video 
              src="/sounds/IMG_8665.MOV" 
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[600px] object-contain mx-auto"
              poster="/images/IMG_2520.png"
            />
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section (User Images) */}
      <section className="py-40 px-6 bg-[#fcfaf7] relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="រូបភាពអនុស្សាវរីយ៍" 
              subtitle="Our Beautiful Memories" 
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            {[
              { img: "/images/IMG_8955.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ១" },
              { img: "/images/IMG_8956.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ២" },
              { img: "/images/IMG_8694.jpg", title: "រូបភាពអនុស្សាវរីយ៍ ៤" },
              { img: "/images/IMG_2456.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ៣" },
              { img: "/images/IMG_2407.JPG", title: "រូបភាពអនុស្សាវរីយ៍ ៥" },
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
             <p className="text-3xl font-moulpali text-khmer-burgundy mt-4">គេហដ្ឋាន ខាងស្រី</p>
             {/* <p className="text-xl text-khmer-text/60 italic font-playfair uppercase tracking-widest">Venue Address</p> */}
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-khmer-cream group"
          >
             <iframe 
                src="https://maps.google.com/maps?q=10.61025,104.1825&z=16&output=embed"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              />
          </motion.div>

          <div className="mt-12">
            <motion.a 
              href="https://www.google.com/maps?q=10.61025,104.1825"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-khmer-burgundy text-white px-10 py-5 rounded-full font-moulpali shadow-xl hover:bg-khmer-burgundy/90 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              មើលក្នុង Google Maps
            </motion.a>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-40 px-6 bg-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/az-subtle.png')` }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <SectionHeading 
              title="ទំនាក់ទំនង" 
              subtitle="RSVP and Wishes" 
            />
            
            <div className="bg-[#f8f5f0] border border-khmer-gold/20 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-khmer-gold/5 max-w-3xl mx-auto">
              <p className="font-suwannaphum text-xl mb-12 text-khmer-text/80 leading-relaxed">
                សូមផ្តល់ព័ត៌មានសម្រាប់ការចូលរួមរបស់លោកអ្នកមុនថ្ងៃទី ២១ ខែមិថុនា ដើម្បីយើងខ្ញុំបានរៀបចំការទទួលបដិសណ្ឋារកិច្ចឱ្យបានសមរម្យ។
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
                 {[
                   { side: "ខាងកូនប្រុស", phone: "071 804 4454", displayPhone: "០៧១ ៨០៤ ៤៤៥៤" },
                   { side: "ខាងកូនស្រី", phone: "069 482 676", displayPhone: "០៦៩ ៤៨២ ៦៧៦" }
                 ].map((contact, idx) => (
                   <div key={idx} className="flex flex-col items-center gap-4 group">
                      <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-khmer-burgundy group-hover:scale-110 transition-transform">
                        <Phone className="w-7 h-7" />
                      </div>
                      <div>
                         <p className="font-suwannaphum text-lg text-khmer-text/60 mb-2">{contact.side}</p>
                         <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="font-suwannaphum font-bold text-2xl md:text-3xl tracking-widest text-khmer-gold hover:text-khmer-burgundy transition-colors">
                            {contact.displayPhone}
                         </a>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Blessing */}
      <footer className="py-20 bg-khmer-burgundy text-center border-t border-khmer-gold/20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/az-subtle.png')` }} />
         <div className="relative z-10">
           <motion.div {...fadeIn}>
             <div className="mb-8 flex items-center justify-center gap-4 text-khmer-gold/40">
                <div className="h-px w-20 bg-current" />
                <Heart className="w-6 h-6 fill-current" />
                <div className="h-px w-20 bg-current" />
             </div>
             <p className="font-moulpali text-[#D4AF37] text-2xl mb-4 leading-loose drop-shadow-md">សូមអរគុណ និងសូមជូនពរសុខភាពល្អ</p>
             {/* <p className="font-playfair italic text-white/60 text-lg uppercase tracking-[0.4em]">Deth & Pich Wedding Invitation | 2026</p> */}
           </motion.div>
         </div>
      </footer>
    </main>
  );
}
