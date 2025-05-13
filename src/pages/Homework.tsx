
import Layout from "@/components/Layout";

const homeworks = [
  {
    id: 1,
    subject: "English",
    date: "2025-03-05",
    submissionDate: "2025-03-05",
    marks: 100
  },
  {
    id: 2,
    subject: "Mathematics",
    date: "2025-03-06",
    submissionDate: "2025-03-07",
    marks: 50
  },
  {
    id: 3,
    subject: "Science",
    date: "2025-03-08",
    submissionDate: "2025-03-10",
    marks: 75
  }
];

const Homework = () => {
  return (
    <Layout title="Homeworks" showBackButton={true}>
      <div className="p-4">
        {homeworks.map(homework => (
          <div key={homework.id} className="bg-white rounded-lg p-4 shadow mb-4 border-l-4 border-school-primary">
            <div className="mb-1">
              <span className="font-medium">Subject: </span>
              <span>{homework.subject}</span>
            </div>
            <div className="mb-1">
              <span className="font-medium">Date & Time: </span>
              <span>{homework.date}</span>
            </div>
            <div className="mb-1">
              <span className="font-medium">Submission Date: </span>
              <span>{homework.submissionDate}</span>
            </div>
            <div>
              <span className="font-medium">Marks: </span>
              <span>{homework.marks}</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Homework;
