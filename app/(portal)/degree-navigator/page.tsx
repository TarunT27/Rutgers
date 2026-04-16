"use client";

import { useState } from "react";
import { Tabs } from "@/app/components/ui/tabs";

export default function DegreeNavigatorPage() {
  const [tab, setTab] = useState("Audit Report");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Degree Navigator</h1>
          <p className="text-sm text-gray-600">
            TARUN TATA (222007507) | School Code: 21 (Newark College of Arts and Sciences) | NetID: tt580
          </p>
          <p className="text-sm text-gray-600">
            Expected Graduation: May 2028
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">My Programs of Study</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-rutgers">Major in Computer Science (NK) (NK198J)</span>
          </div>
          <div className="text-sm pt-2">
            <strong>My Planned Courses:</strong> You have 2 courses in your course plan.
          </div>
        </div>
      </div>

      <Tabs options={["Audit Report", "Course List"]} value={tab} onChange={setTab} />

      {tab === "Audit Report" && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Full Audit Report</h2>
              <button className="text-sm text-blue-600 underline" onClick={() => window.print()}>Print</button>
            </div>
            <div className="text-xs text-gray-600 mb-6 bg-gray-50 p-4 rounded">
              Degree Navigator is an advising tool designed to help students make informed decisions regarding their academic progress...
              Your Degree Navigator report will help you to forecast degree completion and is intended for planning purposes only.
              Date: April 16 2026 | Report for Subject: Major in Computer Science (NK) (Spring 2013)
            </div>

            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="border rounded p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-blue-800">Overall Degree Progress</h3>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Needs 20 Credits</span>
                </div>
                <div className="text-sm grid grid-cols-2 gap-4 mb-4">
                  <div><strong>Minimum Required For Graduation:</strong> 130 Credits</div>
                  <div><strong>Total Completed & Planned/Current:</strong> 110 Credits</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: "84.6%" }}></div>
                </div>
                <p className="text-xs text-gray-600 text-right">84.6% Completed</p>
              </div>

              {/* R1: Core Courses */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-red-600">Incomplete Requirement R1: Required Core Courses</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Needs 9 Credits</span>
                </div>
                <div className="text-sm grid grid-cols-2 gap-4 mb-4">
                  <div><strong>Total Credits:</strong> 30</div>
                  <div><strong>Completed:</strong> 21</div>
                </div>
                <div className="text-sm mb-2">
                  <strong>Description:</strong> A total of 30 credits from:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li className="text-green-700">21:198:101 (3 Credits) (Fulfilled)</li>
                    <li className="text-green-700">21:198:102 (3 Credits) (Fulfilled)</li>
                    <li className="text-blue-600">21:198:251 (3 Credits) (Planned)</li>
                    <li className="text-yellow-600">21:198:280 (3 Credits) (Current)</li>
                    <li className="text-blue-600">21:198:288 (3 Credits) (Planned)</li>
                    <li className="text-gray-500">21:198:332 (3 Credits)</li>
                    <li className="text-green-700">21:198:335 (3 Credits) (Fulfilled)</li>
                    <li className="text-green-700">21:198:435 (3 Credits) (Fulfilled)</li>
                    <li className="text-gray-500">21:198:490 (3 Credits)</li>
                    <li className="text-gray-500">21:198:491 (3 Credits)</li>
                  </ul>
                </div>
                
                <div className="text-sm mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-bold mb-1">Required Elective Subsection</h4>
                  <p className="mb-2">The following electives are required while taking <strong>Computer Systems (3 Credits)</strong>:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-yellow-600">Operating Systems (6 Credits) - Current</li>
                    <li className="text-yellow-600">Machine Learning (6 Credits) - Current</li>
                  </ul>
                </div>
              </div>

              {/* R2: Math Core */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-red-600">Incomplete Requirement R2: Math Core Courses</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Needs 5 Credits</span>
                </div>
                <div className="text-sm grid grid-cols-2 gap-4 mb-4">
                  <div><strong>Total Credits:</strong> 21</div>
                  <div><strong>Completed:</strong> 16</div>
                </div>
                <div className="text-sm mb-2">
                  <strong>Description:</strong> A total of 21 credits from:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li className="text-green-700">21:640:135 (4 Credits) (Fulfilled)</li>
                    <li className="text-green-700">21:640:136 (4 Credits) (Fulfilled)</li>
                    <li className="text-green-700">21:640:235 (4 Credits) (Fulfilled)</li>
                    <li className="text-green-700">21:640:237 (4 Credits) (Fulfilled)</li>
                    <li className="text-gray-500">21:640:327 (3 Credits)</li>
                    <li className="text-gray-500">21:640:473 (2 Credits)</li>
                  </ul>
                </div>
              </div>

              {/* R4: Writing */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-red-600">Incomplete Requirement R4: Writing Intensive Course</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Needs 1 Course</span>
                </div>
                <div className="text-sm grid grid-cols-2 gap-4 mb-4">
                  <div><strong>Total Courses:</strong> 1</div>
                  <div><strong>Completed:</strong> 0</div>
                </div>
                <div className="text-sm">
                  <strong>Description:</strong> A total of 1 course from Computer Science Major Writing Intensive Requirement.
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {tab === "Course List" && (
        <div className="card">
          <p>Your planned courses and complete history will appear here.</p>
        </div>
      )}
    </div>
  );
}