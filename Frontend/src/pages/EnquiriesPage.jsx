import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Calendar, Clock, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const EnquiriesPage = () => {
  const { enquiries, viewPropertyDetails, navigateTo, showToast } = useApp();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#16a34a]" />
              <h1 className="text-2xl font-bold tracking-tight text-[#171717] dark:text-white">My Inspection Visits & Enquiries</h1>
            </div>
            <p className="text-xs text-[#888888] dark:text-[#a1a1a1] mt-1">
              Track your scheduled property visits, live 3D video tours, and owner responses
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="px-4 py-2 text-xs font-bold emerald-gradient-btn text-white rounded-xl transition-colors shadow-xs self-start sm:self-auto"
          >
            Book New Inspection
          </button>
        </div>

        {/* Enquiries List */}
        {enquiries.length > 0 ? (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white dark:bg-[#171717] rounded-2xl p-6 border border-[#ebebeb] dark:border-[#262626] shadow-xs hover:border-[#16a34a] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                      enq.status === 'Confirmed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {enq.status}
                    </span>

                    <span className="text-xs font-mono bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] px-2.5 py-1 rounded-full text-[#4d4d4d] dark:text-[#a1a1a1]">
                      {enq.type}
                    </span>
                  </div>

                  <div>
                    <h3 
                      onClick={() => viewPropertyDetails(enq.propertyId)}
                      className="text-lg font-bold text-[#171717] dark:text-white hover:text-[#16a34a] cursor-pointer transition-colors"
                    >
                      {enq.propertyTitle}
                    </h3>
                    <p className="text-xs text-[#888888] dark:text-[#a1a1a1] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#16a34a]" /> {enq.propertyCity}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-[#4d4d4d] dark:text-[#a1a1a1] pt-1">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-[#888888]" />
                      <span>{enq.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-4 h-4 text-[#888888]" />
                      <span>{enq.timeSlot}</span>
                    </div>
                    <div>
                      Host: <span className="font-semibold text-[#171717] dark:text-white">{enq.ownerName}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-[#ebebeb] dark:border-[#262626]">
                  <button
                    onClick={() => viewPropertyDetails(enq.propertyId)}
                    className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold emerald-gradient-btn text-white rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>View Property</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => showToast(`Reschedule request sent to ${enq.ownerName}`, 'info')}
                    className="flex-1 md:flex-none px-4 py-2 text-xs font-medium bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-[#4d4d4d] dark:text-[#a1a1a1] rounded-xl hover:bg-white transition-colors"
                  >
                    Reschedule
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#171717] rounded-2xl p-12 border border-[#ebebeb] dark:border-[#262626] text-center text-xs text-[#888888] dark:text-[#a1a1a1]">
            No inspection visits scheduled yet. Browse properties and click "Schedule Inspection Visit" to request a tour!
          </div>
        )}

      </div>
    </div>
  );
};
