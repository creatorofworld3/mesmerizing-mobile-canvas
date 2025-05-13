
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const examSchedule = [
  {
    id: 1,
    name: "First Term Examination",
    startDate: "2025-07-15",
    endDate: "2025-07-22",
    subjects: [
      { name: "English", date: "2025-07-15", time: "09:00 AM - 11:00 AM" },
      { name: "Mathematics", date: "2025-07-17", time: "09:00 AM - 11:00 AM" },
      { name: "Science", date: "2025-07-19", time: "09:00 AM - 11:00 AM" },
      { name: "Social Studies", date: "2025-07-22", time: "09:00 AM - 11:00 AM" }
    ]
  },
  {
    id: 2,
    name: "Mid-Term Examination",
    startDate: "2025-10-10",
    endDate: "2025-10-18",
    subjects: [
      { name: "English", date: "2025-10-10", time: "09:00 AM - 11:00 AM" },
      { name: "Mathematics", date: "2025-10-12", time: "09:00 AM - 11:00 AM" },
      { name: "Science", date: "2025-10-15", time: "09:00 AM - 11:00 AM" },
      { name: "Social Studies", date: "2025-10-18", time: "09:00 AM - 11:00 AM" }
    ]
  }
];

const examResults = [
  {
    id: 1,
    name: "First Term Examination",
    totalMarks: 400,
    scoredMarks: 352,
    grade: "A+",
    subjects: [
      { name: "English", maxMarks: 100, marks: 89, grade: "A" },
      { name: "Mathematics", maxMarks: 100, marks: 95, grade: "A+" },
      { name: "Science", maxMarks: 100, marks: 92, grade: "A+" },
      { name: "Social Studies", maxMarks: 100, marks: 76, grade: "B+" }
    ]
  }
];

const Examinations = () => {
  return (
    <Layout title="Examinations" showBackButton={true}>
      <div className="p-4">
        <Tabs defaultValue="schedule">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-4">
            {examSchedule.map(exam => (
              <div key={exam.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-3 bg-school-primary text-white">
                  <h3 className="font-medium">{exam.name}</h3>
                  <p className="text-xs opacity-90">
                    {exam.startDate} to {exam.endDate}
                  </p>
                </div>
                
                <div className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Subject</th>
                        <th className="text-left pb-2">Date</th>
                        <th className="text-left pb-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.subjects.map((subject, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-2">{subject.name}</td>
                          <td className="py-2">{subject.date}</td>
                          <td className="py-2">{subject.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {examResults.map(result => (
              <div key={result.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-3 bg-school-primary text-white">
                  <h3 className="font-medium">{result.name}</h3>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Total Marks</p>
                      <p className="font-bold">{result.scoredMarks}/{result.totalMarks}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Percentage</p>
                      <p className="font-bold">{Math.round((result.scoredMarks / result.totalMarks) * 100)}%</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Grade</p>
                      <p className="font-bold">{result.grade}</p>
                    </div>
                  </div>
                  
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Subject</th>
                        <th className="text-right pb-2">Marks</th>
                        <th className="text-right pb-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((subject, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-2">{subject.name}</td>
                          <td className="py-2 text-right">{subject.marks}/{subject.maxMarks}</td>
                          <td className="py-2 text-right">{subject.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Examinations;
