
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const diaryEntries = [
  {
    id: 1,
    date: "2025-05-12",
    subject: "General",
    message: "School will remain closed on May 15th due to local elections.",
    sender: "Principal"
  },
  {
    id: 2,
    date: "2025-05-11",
    subject: "Homework",
    message: "Please complete pages 45-48 in Mathematics textbook for tomorrow's class.",
    sender: "Math Teacher"
  },
  {
    id: 3,
    date: "2025-05-10",
    subject: "Behavior",
    message: "Your child was exceptionally well-behaved during the field trip today. Great job!",
    sender: "Class Teacher"
  },
  {
    id: 4,
    date: "2025-05-09",
    subject: "Reminder",
    message: "Please send the signed permission slip for the upcoming science fair by tomorrow.",
    sender: "Science Teacher"
  }
];

const ClassDiary = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredEntries = activeTab === "all" 
    ? diaryEntries 
    : diaryEntries.filter(entry => entry.subject.toLowerCase() === activeTab);
  
  return (
    <Layout title="Class Diary" showBackButton={true}>
      <div className="p-4">
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
            <TabsTrigger value="general" onClick={() => setActiveTab("general")}>General</TabsTrigger>
            <TabsTrigger value="homework" onClick={() => setActiveTab("homework")}>Homework</TabsTrigger>
            <TabsTrigger value="behavior" onClick={() => setActiveTab("behavior")}>Behavior</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white rounded-lg p-4 shadow border-l-4 border-school-primary">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{entry.subject}</h3>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </div>
              <p className="text-gray-700 mb-3">{entry.message}</p>
              <p className="text-xs text-gray-600 font-medium">From: {entry.sender}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClassDiary;
