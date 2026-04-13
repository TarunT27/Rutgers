"use client";

import { useState } from "react";
import { Info, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuikPayMockup() {
  const router = useRouter();
  const [activeSidebarTab, setActiveSidebarTab] = useState("Make Payment");
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState("1608.00");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const sidebarLinks = [
    "Message Board",
    "Payment Methods",
    "Authorize Payers",
    "User Preferences",
    "Make Payment",
    "Transaction History",
    "Payment Plan",
    "Messages"
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-white px-8 py-2 shadow-sm border-b border-red-700 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#cc0033]">
          <span className="text-4xl font-serif font-bold tracking-tighter">R</span>
          <span className="text-xl font-bold tracking-widest">RUTGERS</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer font-bold text-sm">
          <User className="w-4 h-4 bg-gray-200 text-gray-600 rounded-full" /> Profile
        </div>
      </header>
      
      <div className="bg-[#cc0033] h-[3px] w-full" />

      {/* Main Content Layout */}
      <div className="flex mx-auto min-h-[800px] border-l border-r border-[#e0e0e0] bg-white max-w-[1400px]">
        
        {/* Sidebar */}
        <div className="w-[200px] border-r border-[#e0e0e0] flex flex-col bg-[#fbfbfb]">
          {sidebarLinks.map((link) => (
            <div 
              key={link}
              onClick={() => {
                setActiveSidebarTab(link);
                if (link === "Make Payment") setPaymentStep(1);
              }}
              className={`py-6 px-4 text-sm font-medium cursor-pointer transition-colors ${
                activeSidebarTab === link 
                  ? 'bg-[#f4e6e8] border-l-4 border-[#cc0033]' 
                  : 'text-slate-700 hover:bg-slate-100 hover:text-black border-l-4 border-transparent'
              }`}
            >
              {link}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#f7f8f9]">
          <div className="p-8">
            {activeSidebarTab === "Make Payment" && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-2">
                  <h1 className="text-2xl font-light text-[#0070cc]">Make Payment</h1>
                  <div className="flex items-center gap-8 text-sm">
                    <div className={`flex items-center gap-2 ${paymentStep === 1 ? 'text-[#0070cc] font-medium' : 'text-slate-500'}`}>
                      <span className={`rounded-full text-white w-6 h-6 flex items-center justify-center ${paymentStep === 1 ? 'bg-[#0070cc]' : 'bg-slate-400'}`}>1</span>
                      Payment Information
                    </div>
                    <div className={`flex items-center gap-2 ${paymentStep === 2 ? 'text-[#0070cc] font-medium' : 'text-slate-500'}`}>
                      <span className={`rounded-full text-white w-6 h-6 flex items-center justify-center ${paymentStep === 2 ? 'bg-[#0070cc]' : 'bg-slate-400'}`}>2</span>
                      Payment Method
                    </div>
                    <div className={`flex items-center gap-2 ${paymentStep === 3 ? 'text-[#0070cc] font-medium' : 'text-slate-500'}`}>
                      <span className={`rounded-full text-white w-6 h-6 flex items-center justify-center ${paymentStep === 3 ? 'bg-[#0070cc]' : 'bg-slate-400'}`}>3</span>
                      Payment Confirmation
                    </div>
                  </div>
                </div>

                {paymentStep === 1 && (
                  <div className="bg-white border border-gray-200">
                    <div className="bg-white p-4 border-b border-gray-200">
                      <h2 className="text-[17px] font-bold text-[#005b82]">Paying Student Account Payment</h2>
                      <p className="text-xs text-[#cc0033] mt-1">Required fields are marked with an *</p>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-12">
                      <div>
                        <label className="block text-[13px] text-gray-700 mb-1">Payment Amount <span className="text-[#cc0033]">*</span></label>
                        <div className="flex">
                          <span className="bg-gray-100 border border-gray-300 border-r-0 px-3 py-1 text-gray-600">$</span>
                          <input 
                            type="text" 
                            className="border border-gray-300 px-3 py-1 w-full bg-[#f8f8f8]"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] text-gray-700 mb-1">Account</label>
                        <select className="border border-gray-300 px-3 py-1.5 w-full bg-[#f8f8f8] text-sm">
                          <option>Tuition and Fees</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 mt-4 text-center py-6 text-[15px]">
                      Total amount to pay: <strong className="text-lg">${paymentAmount}</strong>
                    </div>
                    
                    <div className="border-t border-dashed border-gray-300 p-6 flex justify-center">
                      <button 
                        className="bg-[#cc0033] hover:bg-[#aa0022] text-white px-4 py-1.5 font-bold rounded shadow-sm text-[13px]"
                        onClick={() => setPaymentStep(2)}
                      >
                        Next - Payment Method
                      </button>
                    </div>
                  </div>
                )}

                {paymentStep === 2 && (
                  <div className="bg-white border border-gray-200">
                    <div className="bg-[#f0f9ff] text-[#005b82] p-3 text-[15px] font-bold border-b border-gray-200">
                      Select A Payment Method
                    </div>
                    <div className="p-8 grid grid-cols-[1fr_minmax(350px,auto)] gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 text-[15px] mb-1">Credit / Debit</h3>
                          <p className="text-xs text-gray-500 mb-3">Card transactions for Rutgers University are processed by Nelnet Campus Commerce, USA.</p>
                          
                          {!showCreditCardForm ? (
                            <label 
                              className="flex items-center gap-2 text-[#0070cc] text-sm cursor-pointer hover:underline ml-2"
                              onClick={() => setShowCreditCardForm(true)}
                            >
                              <span className="text-xl font-light text-gray-400">+</span> enter new credit / debit information
                            </label>
                          ) : (
                            <div className="bg-[#f8f8f8] border border-gray-300 p-4 mt-3 ml-2 space-y-4 rounded-sm">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Credit Card Number</label>
                                <input type="text" className="w-[80%] border border-gray-300 px-3 py-1.5 text-sm" placeholder="•••• •••• •••• ••••" />
                              </div>
                              <div className="grid grid-cols-2 gap-4 w-[80%]">
                                <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">Expiration Date</label>
                                  <input type="text" className="w-full border border-gray-300 px-3 py-1.5 text-sm" placeholder="MM/YY" />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                                  <input type="text" className="w-full border border-gray-300 px-3 py-1.5 text-sm" placeholder="123" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Cardholder Name</label>
                                <input type="text" className="w-[80%] border border-gray-300 px-3 py-1.5 text-sm" placeholder="Name on card" />
                              </div>
                              <div className="pt-2">
                                <button 
                                  className="bg-[#cc0033] hover:bg-[#aa0022] text-white px-4 py-1.5 font-bold rounded shadow-sm text-[13px]"
                                  onClick={() => setPaymentStep(3)}
                                >
                                  Confirm & Continue
                                </button>
                                <button 
                                  className="ml-3 text-sm text-gray-500 hover:text-gray-700 hover:underline"
                                  onClick={() => setShowCreditCardForm(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-800 text-[15px] mb-2">eCheck</h3>
                          <div className="space-y-3 ml-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="radio" name="payment_method" className="w-3.5 h-3.5" />
                              Madhavi TD Account ( CHECKING ending with 3464 )
                            </label>
                            <label className="flex items-center gap-2 text-[#0070cc] text-sm cursor-pointer hover:underline">
                              <span className="text-xl font-light text-gray-400">+</span> enter new eCheck information
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-800 text-[15px] mb-3 flex items-center gap-1">International Payments <Info className="w-4 h-4 text-[#0070cc] bg-[#d5efff] rounded-full" /></h3>
                          <div className="space-y-3 ml-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="radio" name="payment_method" className="w-3.5 h-3.5" />
                              Flywire
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="radio" name="payment_method" className="w-3.5 h-3.5" />
                              CIBC International Student Pay
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Info Box */}
                      <div>
                        <div className="border border-[#75bfe0] rounded-sm bg-[#f2fafd] p-4 text-sm">
                          <h4 className="flex items-center gap-2 text-[#005b82] font-bold mb-3">
                            <Info className="w-4 h-4" /> Payment Method Disclosure:
                          </h4>
                          <p className="text-[#0070cc] mb-3">The following service fees apply to Student Account Payment:</p>
                          <ul className="list-disc pl-5 text-[#0070cc] space-y-1">
                            <li>Domestic Credit / Debit Card - 2.40%</li>
                            <li>International Credit / Debit Card - 4.00%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 3 && (
                  <div className="bg-white border border-[#4caf50] shadow-sm max-w-2xl mx-auto mt-6">
                    <div className="bg-[#e8f5e9] text-[#2e7d32] p-4 text-[17px] font-bold border-b border-[#4caf50] flex items-center gap-3">
                      <div className="bg-[#4caf50] text-white rounded-full w-6 h-6 flex items-center justify-center">✓</div>
                      Payment Confirmed
                    </div>
                    <div className="p-8 space-y-6 text-slate-800 text-[15px]">
                      <div>
                        <p className="font-bold text-gray-800 mb-1">Thank you for your payment.</p>
                        <p className="text-sm text-gray-600">Your transaction has been approved and successfully processed. A confirmation email has been sent to your registered academic email address.</p>
                      </div>

                      <div className="bg-[#f8f8f8] border border-gray-200 p-5 rounded-sm">
                        <div className="grid grid-cols-[150px_1fr] gap-3 text-sm">
                          <div className="text-gray-500 font-bold">Confirmation #:</div>
                          <div className="font-mono text-[#0070cc]">1003{Math.floor(100000 + Math.random() * 900000)}</div>

                          <div className="text-gray-500 font-bold">Date:</div>
                          <div>04/13/2026</div>

                          <div className="text-gray-500 font-bold">Amount Paid:</div>
                          <div className="font-bold text-[#cc0033]">${paymentAmount}</div>

                          <div className="text-gray-500 font-bold">Account:</div>
                          <div>Tuition and Fees</div>

                          <div className="text-gray-500 font-bold">Payment Method:</div>
                          <div>CREDIT CARD</div>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-gray-300 pt-6 flex gap-4">
                        <button 
                          className="bg-[#0070cc] hover:bg-[#005fb0] text-white px-5 py-2 font-bold rounded shadow-sm text-sm"
                          onClick={() => setActiveSidebarTab("Transaction History")}
                        >
                          View Transaction History
                        </button>
                        <button 
                          className="border border-[#0070cc] text-[#0070cc] hover:bg-blue-50 px-5 py-2 font-bold rounded shadow-sm text-sm"
                          onClick={() => router.push('/term-bill')}
                        >
                          Return to Student Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSidebarTab === "Transaction History" && (
              <div className="max-w-[1100px] mx-auto">
                <div className="mb-4">
                  <h1 className="text-2xl font-light text-[#0070cc]">Online Transaction History</h1>
                </div>
                
                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white text-gray-600 border-b border-gray-200 uppercase text-xs font-bold">
                      <tr>
                        <th className="py-3 px-4">CONFIRMATION #</th>
                        <th className="py-3 px-4">DATE</th>
                        <th className="py-3 px-4">AMOUNT</th>
                        <th className="py-3 px-4">ACCOUNT</th>
                        <th className="py-3 px-4">PAYMENT METHOD</th>
                        <th className="py-3 px-4 whitespace-nowrap flex items-center gap-1">PAYMENT STATUS <Info className="w-3 h-3 text-[#0070cc] rounded-full" /></th>
                        <th className="py-3 px-4">PAYER</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { conf: "1003847039", date: "11/16/2025", amt: "$2,316.99", acc: "Tuition and Fees", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1003508010", date: "08/09/2025", amt: "$1,363.00", acc: "Tuition and Fees", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1003155833", date: "03/09/2025", amt: "$1,043.00", acc: "Tuition and Fees", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1002709150", date: "09/18/2024", amt: "$2,211.94", acc: "Tuition and Fees", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1001655294", date: "01/15/2024", amt: "$1,861.33", acc: "Student Accounts Payment Plan", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1001655293", date: "12/15/2023", amt: "$1,861.34", acc: "Student Accounts Payment Plan", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1001986912", date: "12/07/2023", amt: "$2,722.00", acc: "Tuition and Fees", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1001655292", date: "11/15/2023", amt: "$1,861.34", acc: "Student Accounts Payment Plan", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                        { conf: "1001655290", date: "10/16/2023", amt: "$1,396.01", acc: "Student Accounts Payment Plan", method: "CHECKING", status: "Accepted", payer: "TARUN TATA" },
                      ].map((row, i) => (
                        <tr key={i} className={`hover:bg-blue-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                          <td className="py-3 px-4 text-[#0070cc] hover:underline cursor-pointer">{row.conf}</td>
                          <td className="py-3 px-4">{row.date}</td>
                          <td className="py-3 px-4">{row.amt}</td>
                          <td className="py-3 px-4">{row.acc}</td>
                          <td className="py-3 px-4">{row.method}</td>
                          <td className="py-3 px-4">{row.status}</td>
                          <td className="py-3 px-4">{row.payer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeSidebarTab !== "Make Payment" && activeSidebarTab !== "Transaction History" && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-light text-[#0070cc] mb-8 border-b border-gray-300 pb-2">{activeSidebarTab}</h1>
                <p className="text-gray-500">Content for {activeSidebarTab} goes here...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-300 mt-2 bg-white text-xs text-slate-500 py-6 px-8 flex justify-end gap-2">
        <div className="flex flex-col items-end max-w-6xl">
          <div className="flex gap-2 text-[#0070cc] mb-2">
            <a href="#" className="hover:underline">Contact Us</a> | 
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
          <p>QuikPAY is a registered trademark of Nelnet Business Solutions, Inc. Version 2025.2.7</p>
          <p>© 2026 Nelnet, Inc. and Affiliates. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}