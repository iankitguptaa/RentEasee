import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScheduleVisitModal = ({ property, isOpen, onClose }) => {
  const { addEnquiry } = useApp();

  const [visitType, setVisitType] = useState('In-Person Visit');
  const [selectedDate, setSelectedDate] = useState('2026-08-18');
  const [selectedSlot, setSelectedSlot] = useState('04:00 PM');
  const [notes, setNotes] = useState('');

  if (!isOpen || !property) return null;

  const timeSlots = [
    '10:30 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCity: property.city,
      ownerName: property.owner.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      type: visitType,
      notes: notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-[#171717] rounded-2xl max-w-lg w-full border border-[#ebebeb] dark:border-[#262626] shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-[#ebebeb] dark:border-[#262626] bg-[#fafafa] dark:bg-[#0f0f0f] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#16a34a] font-bold">Direct Owner Scheduling</span>
            <h3 className="text-lg font-bold text-[#171717] dark:text-white">Schedule Property Inspection</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#888888] hover:text-[#171717] dark:hover:text-white hover:bg-white dark:hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Brief Summary */}
        <div className="p-4 bg-[#fafafa]/50 dark:bg-[#0f0f0f]/50 border-b border-[#ebebeb] dark:border-[#262626] flex items-center gap-3">
          <img src={property.images[0]} alt={property.title} className="w-14 h-14 rounded-xl object-cover border border-[#ebebeb] dark:border-[#262626]" />
          <div>
            <h4 className="text-xs font-bold text-[#171717] dark:text-white line-clamp-1">{property.title}</h4>
            <p className="text-[11px] text-[#888888] dark:text-[#a1a1a1] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#16a34a]" /> {property.locality}, {property.city}
            </p>
            <p className="text-xs font-mono font-bold text-[#171717] dark:text-white mt-0.5">
              ₹{property.price.toLocaleString('en-IN')} / mo
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Visit Type Toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-2">Inspection Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVisitType('In-Person Visit')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  visitType === 'In-Person Visit'
                    ? 'emerald-gradient-btn text-white border-[#16a34a] shadow-sm'
                    : 'bg-[#fafafa] dark:bg-[#0f0f0f] text-[#4d4d4d] dark:text-[#a1a1a1] border-[#ebebeb] dark:border-[#262626] hover:bg-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>In-Person Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setVisitType('Virtual Tour')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  visitType === 'Virtual Tour'
                    ? 'emerald-gradient-btn text-white border-[#16a34a] shadow-sm'
                    : 'bg-[#fafafa] dark:bg-[#0f0f0f] text-[#4d4d4d] dark:text-[#a1a1a1] border-[#ebebeb] dark:border-[#262626] hover:bg-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>3D Live Virtual Tour</span>
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Preferred Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#888888] absolute left-3 top-3" />
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
              />
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-2">Select Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg text-xs font-mono font-medium border transition-all ${
                    selectedSlot === slot
                      ? 'bg-[#16a34a] text-white border-[#16a34a] shadow-xs font-bold'
                      : 'bg-[#fafafa] dark:bg-[#0f0f0f] text-[#4d4d4d] dark:text-[#a1a1a1] border-[#ebebeb] dark:border-[#262626] hover:border-[#16a34a]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Message / Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#171717] dark:text-white mb-1">Message to Owner (Optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. I am looking to move in next month with my family..."
              className="w-full p-3 text-xs bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] rounded-lg focus:outline-none focus:border-[#16a34a] text-[#171717] dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 emerald-gradient-btn text-white text-xs font-bold rounded-xl hover:bg-[#15803d] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Confirm Visit Request with {property.owner.name}</span>
          </button>

        </form>

      </div>
    </div>
  );
};
