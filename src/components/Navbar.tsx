import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface NavbarProps {
  onPickUpClick: () => void;
}

export default function Navbar({ onPickUpClick }: NavbarProps) {
  return (
    <nav className="fixed top-[2%] sm:top-0 left-0 right-0 z-[100] bg-transparent py-3 sm:py-5">
      <div className="max-w-[1450px] mx-auto w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* 1. Brand Logo Capsule (Matching screenshot styling, custom wing logo in Orange) */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02, boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.6)" }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="flex items-center gap-2 sm:gap-3 bg-[#131416] border border-[#23252a] rounded-[12px] sm:rounded-[18px] px-3 sm:px-5 py-2 sm:py-3 shadow-md shadow-black/40 cursor-pointer shrink-0"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C11.5 2 6 5.5 2.5 10C1 12 1 14 2 15C3 16 5 16.5 7 15.5C9 14.5 12.5 11 14.5 9.5C14.5 9.5 11.5 11 9 12C7 12.8 5 13 4 12C3 11 4.5 9 6.5 8C9.5 6.5 13.5 5 17 4.5C21 4 23 2.5 23 2.5C23 2.5 18 2 12 2Z"/>
            <path d="M11.5 7.5C10 8 7 9.5 5.5 11C4.5 12 5.5 12 6.5 11.5C8 10.8 11.5 9 13.5 8C15 7.2 16.5 6.8 17.5 6.5C15 6.8 13 7 11.5 7.5Z"/>
          </svg>
          <div className="flex flex-col leading-[1.1]">
            <span className="text-[11px] sm:text-[13px] font-black tracking-widest text-white uppercase">Vantra</span>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.18em] text-[#737373] uppercase">Logistics</span>
          </div>
        </motion.div>
 
        {/* 2. Middle Navigation Capsule */}
        <motion.div 
          whileHover={{ y: -3, boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.6)" }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="hidden md:flex items-center gap-8 bg-[#131416] border border-[#23252a] rounded-[18px] px-8 py-3.5 shadow-md shadow-black/40 text-[13px] font-semibold text-[#A3A3A3]"
        >
          <motion.a href="#" whileHover={{ scale: 1.05, color: '#ffffff' }} transition={{ type: "spring", stiffness: 450, damping: 14 }} className="hover:text-white transition-colors duration-200">Containers</motion.a>
          <motion.a href="#" whileHover={{ scale: 1.05, color: '#ffffff' }} transition={{ type: "spring", stiffness: 450, damping: 14 }} className="hover:text-white transition-colors duration-200">About us</motion.a>
          <motion.a href="#" whileHover={{ scale: 1.05, color: '#ffffff' }} transition={{ type: "spring", stiffness: 450, damping: 14 }} className="hover:text-white transition-colors duration-200">Contacts</motion.a>
        </motion.div>
 
        {/* 3 & 4. Right Side Actions (Call-to-Action & Plus button matching screenshot) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* "Pick up a Container" Capsule */}
          <motion.button 
            whileHover={{ 
              y: -6, 
              scale: 1.03, 
              boxShadow: "0 20px 25px -5px rgba(255, 69, 0, 0.35), 0 10px 10px -5px rgba(255, 69, 0, 0.2)" 
            }}
            whileTap={{ y: -2, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={onPickUpClick}
            className="bg-white hover:bg-[#FF4500] hover:text-white text-[#0A0A0A] font-bold text-[11px] sm:text-[13px] px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-[12px] sm:rounded-[18px] transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-md shadow-black/25" 
            id="pick-up-btn"
          >
            <span className="hidden sm:inline">Pick up a Container</span>
            <span className="sm:hidden">Pick up</span>
          </motion.button>
          
          {/* Plus Button Capsule */}
          <motion.button 
            whileHover={{ 
              y: -6, 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(255, 69, 0, 0.35), 0 10px 10px -5px rgba(255, 69, 0, 0.2)" 
            }}
            whileTap={{ y: -2, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={onPickUpClick}
            className="bg-white hover:bg-[#FF4500] hover:text-white text-[#0A0A0A] p-2.5 sm:p-3.5 rounded-[12px] sm:rounded-[18px] transition-all duration-300 cursor-pointer flex items-center justify-center aspect-square shadow-md shadow-black/25" 
            id="add-container-btn"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
          </motion.button>
        </div>

      </div>
    </nav>
  );
}
