
import Layout from "@/components/Layout";

const announcements = [
  {
    id: 1,
    title: "Admissions Open for 2025-2026",
    content: "We are excited to announce that admissions are now open for the academic year 2025-2026! Explore a range of programs designed to shape your future and elevate your career. Key Details: Programs Offered: [List of courses] Application Deadline: [Insert Deadline] Eligibility: [Insert Eligibility Criteria] How to Apply: [Insert application process link or instructions] Start your journey towards a bright future today! For more information, visit www.srivedatheschool.com or contact us at [Email/Phone].",
    date: "2024-10-12 19:28:16"
  },
  {
    id: 2,
    title: "Annual Sports Day",
    content: "The Annual Sports Day will be held on June 15th, 2025. All students are encouraged to participate in various events. Registration for events starts from May 20th.",
    date: "2024-10-10 14:30:00"
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    content: "A parent-teacher meeting is scheduled for July 5th, 2025, from 10:00 AM to 2:00 PM. All parents are requested to attend to discuss their child's progress.",
    date: "2024-10-08 09:15:22"
  }
];

const Announcements = () => {
  return (
    <Layout title="Announcements" showBackButton={true}>
      <div className="p-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="bg-white rounded-lg p-4 shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">{announcement.title}</h2>
            <p className="text-gray-700 mb-3">{announcement.content}</p>
            <p className="text-xs text-gray-500 text-right">{announcement.date}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Announcements;
