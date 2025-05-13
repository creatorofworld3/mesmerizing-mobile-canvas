
import { useState } from "react";
import Layout from "@/components/Layout";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const attendanceData = [
  { date: "2025-05-01", status: "present" },
  { date: "2025-05-02", status: "present" },
  { date: "2025-05-03", status: "weekend" },
  { date: "2025-05-04", status: "weekend" },
  { date: "2025-05-05", status: "present" },
  { date: "2025-05-06", status: "absent" },
  { date: "2025-05-07", status: "present" },
  { date: "2025-05-08", status: "present" },
  { date: "2025-05-09", status: "present" },
  { date: "2025-05-10", status: "weekend" },
  { date: "2025-05-11", status: "weekend" },
  { date: "2025-05-12", status: "present" },
  { date: "2025-05-13", status: "present" }
];

const Attendance = () => {
  const { student } = useAppContext();
  const [month, setMonth] = useState("May 2025");
  
  // Calculate statistics
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(day => day.status === "present").length;
  const absentDays = attendanceData.filter(day => day.status === "absent").length;
  const weekendDays = attendanceData.filter(day => day.status === "weekend").length;
  const schoolDays = totalDays - weekendDays;
  const attendancePercentage = Math.round((presentDays / (schoolDays)) * 100);
  
  return (
    <Layout title="Attendance" showBackButton={true}>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 bg-school-primary text-white">
            <h2 className="text-center text-lg font-medium">Attendance Summary</h2>
            <p className="text-center text-sm opacity-80">
              Class: {student.class} | Section: {student.section}
            </p>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMonth("April 2025")}
              >
                &lt; Prev
              </Button>
              <span className="font-medium">{month}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setMonth("June 2025")}
              >
                Next &gt;
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={index} className="text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              
              {attendanceData.map((day, index) => {
                let bgColor = "bg-gray-100";
                let textColor = "text-gray-400";
                
                if (day.status === "present") {
                  bgColor = "bg-green-100";
                  textColor = "text-green-800";
                } else if (day.status === "absent") {
                  bgColor = "bg-red-100";
                  textColor = "text-red-800";
                }
                
                return (
                  <div 
                    key={index} 
                    className={`${bgColor} ${textColor} h-8 rounded-full flex items-center justify-center text-sm`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{presentDays}</div>
                <div className="text-xs text-gray-500">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{absentDays}</div>
                <div className="text-xs text-gray-500">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{attendancePercentage}%</div>
                <div className="text-xs text-gray-500">Attendance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
