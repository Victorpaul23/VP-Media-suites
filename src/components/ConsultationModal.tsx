import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AGENCY_INFO } from '../data/agencyData';
import { X, MessageSquare, Send, Sparkles } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [packageType, setPackageType] = useState('SMB Website (₦90,000)');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const text = `Hi Victor, I would like to request a custom proposal for VP Media Suites:
Name: ${name}
Requested Package: ${packageType}
Project Details: ${note}`;

    window.open(`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
            <Sparkles className="w-3 h-3" /> Quick Proposal Request
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Get Custom Quote From Victor</h3>
          <p className="text-xs text-slate-500">
            Tell us about your brand and jump straight into WhatsApp!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Victor"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Package Interest</label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-600"
            >
              <option value="Portfolio Website (₦30,000)">Portfolio Website (₦30,000)</option>
              <option value="SMB Website (₦90,000)">SMB Website (₦90,000)</option>
              <option value="Enterprise Platform (₦500k+)">Enterprise Platform (₦500k+)</option>
              <option value="Elite Social Marketing">Elite Social Marketing</option>
              <option value="Paid Ads Campaign">Paid Ads Campaign</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Project Details / Goals</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Briefly describe what you need..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect Victor on WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
