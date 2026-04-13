"use client";

import { Info, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Data matching the user's screenshots
const termDataData: Record<string, any> = {
  "Fall - 2023": {
    termTitle: "Fall 2023",
    dueDate: "8/16/2023",
    credits: "14.0",
    holds: "$0.00",
    totalCharges: "$8,345.01",
    totalPayments: "$8,345.01CR",
    totalBalance: "$0.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$196.50" },
      { id: 2, desc: "PIRG", amount: "$13.01" },
      { id: 3, desc: "STUDENT FEE", amount: "$1,104.00" },
      { id: 4, desc: "SCHOOL FEE", amount: "$155.50" },
      { id: 5, desc: "NK FALL TRANSFER", amount: "$39.00" },
      { id: 6, desc: "TUITION", amount: "$6,837.00" }
    ],
    payments: [
      { id: 1, desc: "REFUND - 02/02", amount: "$2,683.00" },
      { id: 2, desc: "RUTP PAYMENT - 10/16", amount: "$5,584.01CR" },
      { id: 3, desc: "PAYMENT - 12/08", amount: "$2,722.00CR" },
      { id: 4, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$990.00CR" },
      { id: 5, desc: "Federal Direct Loan -\nSubsidized", amount: "$1,732.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$8,345.01" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Spring - 2024": {
    termTitle: "Spring 2024",
    dueDate: "2/07/2024",
    credits: "12.0",
    holds: "$0.00",
    totalCharges: "$8,306.01",
    totalPayments: "$8,306.01CR",
    totalBalance: "$0.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$196.50" },
      { id: 2, desc: "PIRG", amount: "$13.01" },
      { id: 3, desc: "STUDENT FEE", amount: "$1,104.00" },
      { id: 4, desc: "SCHOOL FEE", amount: "$155.50" },
      { id: 5, desc: "NK SPRING TRANSFER", amount: "$39.00CR" },
      { id: 6, desc: "TUITION", amount: "$6,837.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$39.00" }
    ],
    payments: [
      { id: 1, desc: "RUTP PAYMENT - 01/15", amount: "$5,584.01CR" },
      { id: 2, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$990.00CR" },
      { id: 3, desc: "Federal Direct Loan -\nSubsidized", amount: "$1,732.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$8,306.01" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Fall - 2024": {
    termTitle: "Fall 2024",
    dueDate: "9/06/2024",
    credits: "9.0",
    holds: "$0.00",
    totalCharges: "$4,933.94",
    totalPayments: "$4,251.94CR",
    totalBalance: "$682.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$182.00" },
      { id: 2, desc: "PIRG", amount: "$6.50" },
      { id: 3, desc: "STUDENT FEE", amount: "$342.50" },
      { id: 4, desc: "COURSE/OTHER FEES", amount: "$31.00" },
      { id: 5, desc: "SCHOOL FEE", amount: "$93.00" },
      { id: 6, desc: "TUITION", amount: "$4,131.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$147.94" }
    ],
    payments: [
      { id: 1, desc: "REFUND - 02/18", amount: "$1.00" },
      { id: 2, desc: "PAYMENT - 09/19", amount: "$2,211.94CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$1,900.00CR" },
      { id: 4, desc: "Federal Direct Loan -\nSubsidized", amount: "$141.00CR" }
    ]
  },
  "Spring - 2025": {
    termTitle: "Spring 2025",
    dueDate: "1/15/2025",
    credits: "9.0",
    holds: "$0.00",
    totalCharges: "$4,755.00",
    totalPayments: "$4,074.00CR",
    totalBalance: "$681.00",
    charges: [
      { id: 1, desc: "TECHNOLOGY FEE", amount: "$182.00" },
      { id: 2, desc: "PIRG", amount: "$6.50" },
      { id: 3, desc: "STUDENT FEE", amount: "$342.50" },
      { id: 4, desc: "SCHOOL FEE", amount: "$93.00" },
      { id: 5, desc: "TUITION", amount: "$4,131.00" }
    ],
    payments: [
      { id: 1, desc: "TERM BILL PAYMENT - 03/09", amount: "$1,043.00CR" },
      { id: 2, desc: "Federal Direct Loan -\nSubsidized", amount: "$142.00CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$2,889.00CR" }
    ],
    feesLine: { label: "Tuition & Fees:", amount: "$4,755.00" },
    insuranceLine: { label: "Student Insurance Premium", amount: "$0.00" }
  },
  "Fall - 2025": {
    termTitle: "Fall 2025",
    dueDate: "9/05/2025",
    credits: "10.0",
    holds: "$0.00",
    totalCharges: "$6,895.99",
    totalPayments: "$6,895.99CR",
    totalBalance: "$0.00",
    showFinAid: true,
    showPaymentOptions: true,
    charges: [
      { id: 1, desc: "PRIOR YEAR BALANCE", amount: "$1,363.00" },
      { id: 2, desc: "TECHNOLOGY FEE", amount: "$199.50" },
      { id: 3, desc: "PIRG", amount: "$6.50" },
      { id: 4, desc: "STUDENT FEE", amount: "$359.50" },
      { id: 5, desc: "SCHOOL FEE", amount: "$97.50" },
      { id: 6, desc: "TUITION", amount: "$4,820.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$49.99" }
    ],
    payments: [
      { id: 1, desc: "PAYMENT - 08/11", amount: "$1,363.00CR" },
      { id: 2, desc: "PAYMENT - 11/17", amount: "$2,316.99CR" },
      { id: 3, desc: "Federal Direct Loan -\nUnsubsidized", amount: "$3,216.00CR" }
    ]
  },
  "Spring - 2026": {
    termTitle: "Spring 2026",
    dueDate: "1/15/2026",
    credits: "10.0",
    holds: "$0.00",
    totalCharges: "$6,895.99",
    totalPayments: "$0.00",
    totalBalance: "$6,895.99",
    showFinAid: false,
    showPaymentOptions: true,
    showPayBillButtons: true,
    charges: [
      { id: 1, desc: "PRIOR YEAR BALANCE", amount: "$1,363.00" },
      { id: 2, desc: "TECHNOLOGY FEE", amount: "$199.50" },
      { id: 3, desc: "PIRG", amount: "$6.50" },
      { id: 4, desc: "STUDENT FEE", amount: "$359.50" },
      { id: 5, desc: "SCHOOL FEE", amount: "$97.50" },
      { id: 6, desc: "TUITION", amount: "$4,820.00" },
      { id: 7, desc: "DIGITAL BOOK CHARGE", amount: "$49.99" }
    ],
    payments: [
      { id: 1, desc: "PAYMENT - 08/11", amount: "$1,363.00CR" },
      { id: 2, desc: "PAYMENT - 11/17", amount: "$2,316.99CR" }
    ]
  }
};

export default function TermBillPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Term Selection");
  const [semester, setSemester] = useState("Fall - 2025"); // Defaulting to one of the available ones
  const [selectedTermData, setSelectedTermData] = useState<any>(null);

  const semesters = [
    "Summer - 2026",
    "Spring - 2026",
    "Winter - 2026",
    "Fall - 2025",
    "Spring - 2025",
    "Fall - 2024",
    "Spring - 2024",
    "Fall - 2023",
    "Spring - 2023",
    "Fall - 2022"
  ];

  const handleContinue = () => {
    // If we have data for it, use it. Otherwise use a fallback to let us "figure it out".
    const data = termDataData[semester] || {
      termTitle: semester.replace(" - ", " "),
      dueDate: "TBD",
      credits: "0.0",
      holds: "$0.00",
      totalCharges: "$0.00",
      totalPayments: "$0.00CR",
      totalBalance: "$0.00",
      charges: [],
      payments: []
    };
    setSelectedTermData(data);
    setActiveTab("Account Summary");
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Header */}
      <header className="bg-[#cc0033] px-8 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-serif font-bold tracking-tighter">R</span>
            <span className="text-2xl font-bold tracking-widest mt-2">RUTGERS</span>
          </div>
          <div className="mt-2 border-l-2 border-white/40 pl-6">
            <p className="text-sm font-medium tracking-wide">Student Accounting, Billing, and Cashier Services</p>
            <h1 className="text-2xl font-bold">Student Account</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto mt-8 max-w-6xl min-h-[600px] pb-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-300 text-sm font-medium">
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === 'Term Selection' ? 'bg-[#555555] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setActiveTab("Term Selection")}
          >
            Term Selection
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === 'Account Summary' ? 'bg-[#555555] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
            onClick={() => {
              if (selectedTermData) setActiveTab("Account Summary");
            }}
          >
            Account Summary
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === 'Payment Adjustments' ? 'bg-[#555555] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
            onClick={() => {
              if (selectedTermData) setActiveTab("Payment Adjustments");
            }}
          >
            Payment Adjustments
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === 'Verify Payment Adjustments' ? 'bg-[#555555] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
            onClick={() => {
              if (selectedTermData) setActiveTab("Verify Payment Adjustments");
            }}
          >
            Verify Payment Adjustments
          </div>
        </div>

        {/* Content Container based on Tab */}
        <div className="border-t-4 border-[#cc0033] bg-white shadow min-h-[500px]">
          
          {activeTab === "Term Selection" && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 p-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute right-0 top-0 flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-black">
                    <HelpCircle className="h-4 w-4" /> help
                  </div>
                  <h2 className="text-3xl font-light text-slate-800">Choose Semester</h2>
                </div>
                
                <div className="mt-8 text-sm font-medium text-slate-700">
                  <p className="mb-4">View Student Account for TARUN TATA</p>
                  
                  <div className="flex items-start gap-4 mt-6">
                    <div className="relative w-48">
                      <select
                        className="w-full cursor-pointer appearance-none border border-slate-400 bg-white px-3 py-2 text-[15px] font-normal text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                      >
                        {semesters.map((term) => (
                          <option key={term} value={term}>
                            {term}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>

                    <button 
                      className="bg-[#0088ff] px-6 py-2 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8 p-8 pt-0">
                <section>
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-medium text-[#cc0033]">
                    <Info className="h-6 w-6 rounded-full bg-[#cc0033] text-white p-1" />
                    Financial Responsibility Statement
                  </h3>
                  <div className="space-y-4 text-[15px] leading-relaxed text-slate-800">
                    <p>By clicking <strong>Continue</strong> to view my student account, I acknowledge that I understand, and agree to the following terms and Conditions of the Financial Responsibility Statement.</p>
                    <p>By registering for class(es), I acknowledge that I am agreeing to the following terms and conditions. I understand that I am signing a legally binding contract to pay all tuition and fees assessed to my student account and all additional costs and expenses related to my enrollment at Rutgers University...</p>
                    <button className="flex items-center text-[#cc0033] hover:underline font-medium">
                      <ChevronRight className="h-4 w-4" /> Show more info
                    </button>
                  </div>
                </section>
                <section>
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-medium text-[#cc0033]">
                    <Info className="h-6 w-6 rounded-full bg-[#cc0033] text-white p-1" />
                    Payment Plan
                  </h3>
                  <div className="space-y-4 text-[15px] leading-relaxed text-slate-800">
                    <p>Rutgers University partners with Nelnet Campus Commerce to help you pay your tuition and fees over time...</p>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === "Account Summary" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                {/* Header Text */}
                <div className="text-center mb-6">
                  <h2 className="text-[17px] text-slate-800 font-normal">
                    Account Summary - NEWARK COLLEGE OF ARTS & SCIENCES - {selectedTermData.termTitle}
                  </h2>
                  <p className="text-[17px] text-slate-800 font-normal mt-1">TARUN TATA / 222007507</p>
                </div>

                {/* Status Banner */}
                <div className="bg-[#d2ebef] mb-8 p-6 pl-8 border-l-[6px] border-[#005b6b]">
                  <h3 className="flex items-center text-[19px] gap-2 text-[#005b6b] mb-4">
                    <Info className="h-5 w-5 bg-[#005b6b] text-white rounded-full p-[2px]" /> 
                    Your Student Account Status
                  </h3>
                  <ul className="space-y-1 pl-7 list-disc text-[#005b6b] text-[15px]">
                    {selectedTermData.showFinAid && (
                      <li className="mb-2">
                        To view and accept your <strong>2025-2026</strong> financial aid awards:
                        <ol className="list-decimal pl-6 mt-1 space-y-1">
                          <li>Log in at <a href="#" className="underline">my.rutgers.edu</a></li>
                          <li>Locate the My Financial Aid widget</li>
                          <li>Go to the Award tab within the widget and click Award Detail and Information to access the Financial Aid Student Portal</li>
                          <li>Click the Financial tab on the top menu</li>
                          <li>Click <strong>SEP 2025 - MAY 2026</strong> to view your awards</li>
                          <li><a href="#" className="underline">Accept your loans</a> as soon as possible.</li>
                        </ol>
                      </li>
                    )}
                    <li>Term Bill has been received.</li>
                    <li>Your Term Bill is due on {selectedTermData.dueDate}.</li>
                    <li>Financial Holds {selectedTermData.holds}</li>
                    <li>Term Billable Credit Hours {selectedTermData.credits}</li>
                  </ul>
                </div>

                <div className="flex gap-6">
                  {/* Left Column - Outstanding Balance */}
                  <div className="flex-1 bg-white border-t-[3px] border-[#cc0033] shadow-sm">
                    <div className="p-5 pb-0 flex justify-between items-start">
                      <h3 className="text-[22px] font-normal text-slate-800">Outstanding Balance</h3>
                      <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-black">
                        <HelpCircle className="h-4 w-4" /> help
                      </button>
                    </div>

                    <div className="px-5 py-4 space-y-2 text-[14px]">
                      <div className="flex justify-between text-slate-700">
                        <span>Total Charges</span>
                        <span>{selectedTermData.totalCharges}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>Total Payments</span>
                        <span>{selectedTermData.totalPayments}</span>
                      </div>
                    </div>

                    <div className="bg-black text-white px-5 py-2.5 flex justify-between font-bold text-[15px]">
                      <span>Total Balance:</span>
                      <span>{selectedTermData.totalBalance}</span>
                    </div>

                    <div className="px-4 py-4">
                      {/* Grid Headers */}
                      <div className="grid grid-cols-2 text-[13px] font-bold text-black border-b border-slate-300 pb-2 mb-2">
                        <div>Charges</div>
                        <div className="text-center">Payments / Account Credits</div>
                      </div>

                      {/* Flex container for rows */}
                      <div className="flex gap-4 min-h-[140px]">
                        {/* Charges Col */}
                        <div className="flex-1 space-y-1 text-[13px]">
                          {selectedTermData.charges.map((c: any) => (
                            <div key={c.id} className="flex justify-between text-slate-700">
                              <span className="uppercase">{c.desc}</span>
                              <span className="text-right">{c.amount}</span>
                            </div>
                          ))}
                        </div>
                        {/* Payments Col */}
                        <div className="flex-1 space-y-1 text-[13px]">
                          {selectedTermData.payments.map((p: any) => (
                            <div key={p.id} className="flex justify-between text-slate-700 items-start">
                              <span className="whitespace-pre-line leading-tight">{p.desc}</span>
                              <span className="text-right">{p.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Optional separation lines like Tuition & Fees */}
                      {(selectedTermData.feesLine || selectedTermData.insuranceLine) && (
                        <div className="border-t border-slate-200 mt-4 pt-2 mb-2 space-y-1 text-[13px]">
                          {selectedTermData.feesLine && (
                            <div className="flex w-1/2 justify-between pr-2 text-slate-700">
                              <span>{selectedTermData.feesLine.label}</span>
                              <span>{selectedTermData.feesLine.amount}</span>
                            </div>
                          )}
                          {selectedTermData.insuranceLine && (
                            <div className="flex w-1/2 justify-between pr-2 text-[#cc0033]">
                              <span>{selectedTermData.insuranceLine.label}</span>
                              <span>{selectedTermData.insuranceLine.amount}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="border-t border-slate-300 mt-4 pt-3 flex justify-between text-[14px] font-bold text-black">
                        <div className="flex justify-between w-[48%]">
                          <span>Total Charges:</span>
                          <span>{selectedTermData.totalCharges}</span>
                        </div>
                        <div className="flex justify-between w-[48%]">
                          <span>Total Payments:</span>
                          <span>{selectedTermData.totalPayments}</span>
                        </div>
                      </div>

                      {selectedTermData.showPaymentOptions && !selectedTermData.showPayBillButtons && (
                        <div className="mt-8 mb-4">
                          <button 
                            className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-4 py-2 font-medium text-sm"
                            onClick={() => setActiveTab("Payment Adjustments")}
                          >
                            Adjust Your Payment
                          </button>
                        </div>
                      )}

                      {selectedTermData.showPayBillButtons && (
                        <div className="mt-8 mb-4 flex gap-4">
                          <button 
                            className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium text-[15px]"
                            onClick={() => setActiveTab("Payment Adjustments")}
                          >
                            Pay My Bill
                          </button>
                          <button className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium text-[15px]">
                            Print My Bill (Mail Payments)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column / Sidebar */}
                  <div className="w-[300px] text-[14px] text-slate-700">
                    {selectedTermData.showPaymentOptions ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-[#cc0033] text-xl font-normal mb-3">Payment Options</h3>
                          <h4 className="font-bold text-black mb-2">Pay Online By Electronic Check</h4>
                          <p className="leading-relaxed mb-4 text-[13px]">You may pay by e-check, which is an electronic withdrawal from your checking or savings bank account. No additional fee is charged for the e-check.</p>
                          <h4 className="font-bold text-black mb-2">Pay Online By Credit Card</h4>
                          <p className="leading-relaxed mb-2 text-[13px]">MasterCard, Visa, American Express and Discover Card may be used to pay tuition and fees online. A service fee will be assessed to your credit card for this convenience. In-person credit card payments are no longer accepted by the Cashier's Offices at the University.</p>
                          <p className="leading-relaxed text-[13px]">NOTE: Any payments made online will be reflected on your account within three to five business days.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-2">Payment Plan</h4>
                          <p className="leading-relaxed text-[13px]">Rutgers University partners with Nelnet Campus Commerce to help you pay your tuition and fees over time. You can split your tuition into convenient monthly payments with zero interest. Sign up for a tuition payment plan and make budgeting for tuition and fees a little easier.</p>
                        </div>
                      </div>
                    ) : (
                      <p className="leading-relaxed">
                        A printable term bill has been provided for your record keeping and payment. You may <a href="#" className="text-[#cc0033] underline hover:text-[#990022]">PRINT YOUR TERM BILL</a>.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer text */}
              {selectedTermData.showPaymentOptions && (
                 <div className="mx-auto max-w-5xl mt-12 bg-white p-6 shadow-sm border border-slate-200">
                   <h3 className="uppercase text-slate-800 font-bold mb-3">RU BOOK ADVANCE FOR FINANCIAL AID STUDENTS IN NEWARK</h3>
                   <p className="text-[14px] text-slate-700 leading-relaxed">
                     If you are a full-time student with a financial aid refund of greater than $500, $500 of your financial aid refund will be automatically transferred to a RU Book Advance Account for your convenience...
                   </p>
                 </div>
              )}
            </div>
          )}

          {activeTab === "Payment Adjustments" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-normal text-slate-800 mb-6">Payment Adjustments</h2>
                <div className="bg-white shadow border-t-[3px] border-[#cc0033]">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl text-slate-800">Payment Reductions</h3>
                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-black">
                      <HelpCircle className="h-4 w-4" /> help
                    </button>
                  </div>
                  <div className="p-6 text-[15px] text-slate-800 space-y-6">
                    <p>For your payment, you may be able to reduce the Total Balance by claiming certain adjustments listed below. Check only the boxes that apply to your account.</p>
                    
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 cursor-pointer accent-[#cc0033]" />
                        <span>I am receiving financial aid that was not reflected on my term bill.</span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 cursor-pointer accent-[#cc0033]" />
                        <span>I have an external scholarship/third party payment but I am paying for part of my term bill.</span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 cursor-pointer accent-[#cc0033]" />
                        <span>I will be receiving remission for TA/GA/Fellow/Staff/Dependant Child.</span>
                      </label>
                    </div>

                    <h3 className="text-xl text-slate-800 pt-4">Adjust Principal Payment Amount</h3>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-2xl py-2">
                      <div className="text-slate-700">Total Balance</div>
                      <div className="text-right font-medium">{selectedTermData.totalBalance.replace('$', '')}</div>
                      
                      <div className="text-slate-700 mt-2">Principal Payment</div>
                      <div className="text-right">
                        <div className="bg-gray-200 px-3 py-1.5 inline-block min-w-[200px] border border-gray-300 text-right">
                          {selectedTermData.totalBalance.replace('$', '')}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium"
                        onClick={() => setActiveTab("Verify Payment Adjustments")}
                      >
                        Verify Payment Adjustments
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Verify Payment Adjustments" && selectedTermData && (
            <div className="bg-[#f3f3f3] pt-6 pb-20">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl font-normal text-slate-800 mb-6">Verify Payment Adjustments</h2>
                
                <div className="bg-[#d2ebef] mb-6 p-6 border-l-[6px] border-[#005b6b]">
                  <h3 className="flex items-center text-[19px] gap-2 text-[#005b6b] mb-4">
                    <Info className="h-5 w-5 bg-[#005b6b] text-white rounded-full p-[2px]" /> 
                    Payment Reductions
                  </h3>
                  <p className="text-[#005b6b] text-[15px] mb-4">You have chosen the following payment options which may reduce your payment. You can navigate back to the Payment Adjustments page to make any changes.</p>
                  <ul className="space-y-1.5 pl-7 list-disc text-[#005b6b] text-[15px]">
                    <li>I am receiving additional financial aid this semester which is not on the statement.</li>
                    <li>I will receive a payment from a third party (external scholarship or company billing).</li>
                    <li>I will be receiving Rutgers Remission for T.A.'s, G.A.'s, fellows, staff or dependent child, so I have subtracted my remission benefit from my balance due.</li>
                  </ul>
                </div>

                <div className="bg-white shadow border-t-[3px] border-[#cc0033]">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl text-slate-800">Payment Options</h3>
                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-black">
                      <HelpCircle className="h-4 w-4" /> help
                    </button>
                  </div>
                  
                  <div className="p-6 text-[15px] text-slate-800 space-y-6">
                    <p className="text-lg">Pay by e-Check, credit card or International Transfer</p>
                    <p>A convenience fee of 2.40% of your balance paid will be added to your credit card payments.</p>
                    <p>A convenience fee of 4.00% of your balance paid will be added to your international credit card payments.</p>
                    <p className="text-[#cc0033]">MasterCard, Visa, Discover Card, and American Express are accepted.</p>
                    
                    <div className="grid grid-cols-2 gap-4 py-4 pt-6 border-b border-gray-100 font-bold">
                      <div>Principal Payment</div>
                      <div className="text-center">{selectedTermData.totalBalance.replace('$', '')}</div>
                    </div>

                    <div className="pt-4">
                      <button 
                        className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-6 py-2.5 font-medium mb-4"
                        onClick={() => router.push('/make-payment')}
                      >
                        Continue to Online Payment
                      </button>
                      <p className="text-xs text-gray-500">You will be redirected to a third party vendor, QuickPay, for payment processing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
