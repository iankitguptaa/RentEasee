import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, Shield } from 'lucide-react';

export const RentAgreementModal = ({ property, user, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  const tenantName = user?.name || 'Aarav Sharma (Tenant)';
  const ownerName = property?.owner?.name || 'Vikram Malhotra (Landlord)';
  const propertyAddress = property?.address || 'Diplomatic Enclave, Vasant Vihar, New Delhi';
  const rentAmount = property?.price ? property.price.toLocaleString('en-IN') : '45,000';
  const depositAmount = property?.deposit ? property.deposit.toLocaleString('en-IN') : '1,35,000';
  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#171717] rounded-3xl max-w-3xl w-full border border-[#ebebeb] dark:border-[#262626] shadow-2xl overflow-hidden relative my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#fafafa] dark:bg-[#0f0f0f] border-b border-[#ebebeb] dark:border-[#262626] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#171717] dark:text-white">Digital Residential Rental Agreement</h3>
              <p className="text-xs text-[#888888]">Legal draft compliant with Model Tenancy Act India</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold bg-[#16a34a] text-white rounded-xl hover:bg-[#15803d] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#888888] hover:text-[#171717] dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 overflow-y-auto print:p-0 text-[#171717] dark:text-white text-xs leading-relaxed font-sans">
          
          <div className="text-center border-b pb-4 space-y-1 border-[#ebebeb] dark:border-[#262626]">
            <h1 className="text-xl font-bold uppercase tracking-wider text-[#16a34a]">RENTAL LEASE AGREEMENT</h1>
            <p className="text-[11px] text-[#888888]">Executed on {currentDate} via RentEasee Verified Platform</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-2xl border border-[#ebebeb] dark:border-[#262626]">
            <div>
              <p className="font-bold text-[#888888] uppercase text-[10px]">LANDLORD / OWNER (FIRST PARTY)</p>
              <p className="font-bold text-sm">{ownerName}</p>
              <p className="text-[#888888] text-[11px]">Phone: {property?.owner?.phone || '+91 98201 44512'}</p>
            </div>
            <div>
              <p className="font-bold text-[#888888] uppercase text-[10px]">TENANT (SECOND PARTY)</p>
              <p className="font-bold text-sm">{tenantName}</p>
              <p className="text-[#888888] text-[11px]">Email: {user?.email || 'tenant@example.com'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#16a34a] border-b pb-1 border-[#ebebeb] dark:border-[#262626]">1. LEASED PROPERTY DETAILS</h4>
            <p>
              The Landlord hereby agrees to lease out the residential property titled <strong>"{property.title}"</strong> located at:
            </p>
            <div className="p-3 bg-[#fafafa] dark:bg-[#0f0f0f] rounded-xl font-medium border border-[#ebebeb] dark:border-[#262626]">
              {propertyAddress} ({property.bhk} BHK {property.type}, {property.areaSqFt} Sq. Ft.)
            </div>

            <h4 className="font-bold text-sm text-[#16a34a] border-b pb-1 border-[#ebebeb] dark:border-[#262626]">2. RENT & SECURITY DEPOSIT TERMS</h4>
            <ul className="list-disc pl-5 space-y-1 text-[#4d4d4d] dark:text-[#a1a1a1]">
              <li><strong>Monthly Rent:</strong> ₹{rentAmount} payable on or before the 5th day of every calendar month.</li>
              <li><strong>Security Deposit:</strong> ₹{depositAmount} paid to the Landlord as refundable security.</li>
              <li><strong>Tenure & Notice Period:</strong> 11 months lease tenure with 1 month advance lock-in notice period.</li>
            </ul>

            <h4 className="font-bold text-sm text-[#16a34a] border-b pb-1 border-[#ebebeb] dark:border-[#262626]">3. GENERAL TERMS & CONDITIONS</h4>
            <ol className="list-decimal pl-5 space-y-1 text-[#4d4d4d] dark:text-[#a1a1a1]">
              <li>The Tenant shall use the premises strictly for residential purposes.</li>
              <li>Electricity, water, and society maintenance charges shall be paid directly by the Tenant.</li>
              <li>No major structural alterations shall be made without prior written consent from the Landlord.</li>
            </ol>
          </div>

          {/* Digital Signatures Box */}
          <div className="pt-6 border-t border-[#ebebeb] dark:border-[#262626] grid grid-cols-2 gap-8">
            <div className="p-4 rounded-2xl bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-center space-y-2">
              <div className="text-emerald-600 font-serif italic text-lg">{ownerName}</div>
              <div className="text-[10px] text-[#888888] font-mono">DIGITALLY SIGNED BY LANDLORD</div>
              <div className="text-[9px] text-[#16a34a] flex items-center justify-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> RentEasee ID Verified
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafafa] dark:bg-[#0f0f0f] border border-[#ebebeb] dark:border-[#262626] text-center space-y-2">
              <div className="text-emerald-600 font-serif italic text-lg">{tenantName}</div>
              <div className="text-[10px] text-[#888888] font-mono">DIGITALLY SIGNED BY TENANT</div>
              <div className="text-[9px] text-[#16a34a] flex items-center justify-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> RentEasee ID Verified
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#fafafa] dark:bg-[#0f0f0f] border-t border-[#ebebeb] dark:border-[#262626] flex items-center justify-between text-[11px] text-[#888888] shrink-0">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#16a34a]" />
            <span>Digital Lease Contract Security Hash: {Date.now().toString(36).toUpperCase()}</span>
          </div>
          <span>Confidential • RentEasee Legal</span>
        </div>

      </div>
    </div>
  );
};
