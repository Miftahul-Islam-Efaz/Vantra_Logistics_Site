import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { CONTAINER_TYPES } from '../constants';
import { ContainerId, BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContainer: ContainerId;
}

export default function BookingModal({ isOpen, onClose, selectedContainer }: BookingModalProps) {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    count: 1,
    notes: ''
  });
  const [origin, setOrigin] = useState('Port of Los Angeles (US)');

  if (!isOpen) return null;

  const currentContainer = CONTAINER_TYPES.find(c => c.id === selectedContainer);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
      // Save to local storage history
      const bookings = JSON.parse(localStorage.getItem('container_bookings') || '[]');
      bookings.push({
        id: Date.now(),
        containerType: selectedContainer,
        origin,
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('container_bookings', JSON.stringify(bookings));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4" id="booking-modal">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[24px] max-w-md w-full p-6 relative shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A3A3A3] hover:text-white transition-colors cursor-pointer text-sm font-mono"
        >
          [esc] CLOSE
        </button>

        {bookingStatus === 'success' ? (
          <div className="text-center py-8 space-y-4" id="booking-success-view">
            <div className="w-16 h-16 bg-[#FF4500]/10 rounded-full flex items-center justify-center mx-auto text-[#FF4500]">
              <Plus className="w-8 h-8 rotate-45" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">CONTAINER RESERVED</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Your request for a <span className="text-white font-semibold">{currentContainer?.tabLabel}</span> container has been received. Our freight operations desk will coordinate delivery.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#FF4500] hover:bg-[#ff5511] text-white font-semibold rounded-[16px] transition-colors cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-5" id="booking-form">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white uppercase">Request Container</h3>
              <p className="text-xs text-[#737373] mt-1 font-mono">
                TYPE: <span className="text-[#FF4500] font-bold">{currentContainer?.tabLabel.toUpperCase()}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Richard Hendricks" 
                  className="w-full bg-[#121212] border border-[#1A1A1A] rounded-[12px] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF4500]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">Business Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. richard@piedpiper.com" 
                  className="w-full bg-[#121212] border border-[#1A1A1A] rounded-[12px] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF4500]/60 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    required
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#121212] border border-[#1A1A1A] rounded-[12px] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF4500]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">Port of Origin</label>
                  <select 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-[#121212] border border-[#1A1A1A] rounded-[12px] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF4500]/60 transition-colors"
                  >
                    <option>Port of Los Angeles (US)</option>
                    <option>Port of Rotterdam (NL)</option>
                    <option>Port of Shanghai (CN)</option>
                    <option>Port of Singapore (SG)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] uppercase mb-1.5">Special Instructions (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special logistics or temperature instructions..." 
                  className="w-full bg-[#121212] border border-[#1A1A1A] rounded-[12px] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF4500]/60 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={bookingStatus === 'submitting'}
                className="w-full py-3.5 bg-[#FF4500] hover:bg-[#ff5511] disabled:bg-gray-700 text-white font-bold text-sm rounded-[16px] transition-all tracking-wide uppercase cursor-pointer"
              >
                {bookingStatus === 'submitting' ? 'Processing Reserve...' : 'Request Pickup'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
