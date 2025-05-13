
import Layout from "@/components/Layout";
import { useAppContext } from "@/context/AppContext";

const subjects = [
  { name: "English", link: "/english" },
  { name: "Hindi", link: "/hindi" },
  { name: "Mathematics", link: "/mathematics" },
  { name: "Science", link: "/science" },
  { name: "Social Studies", link: "/social-studies" }
];

const TimeTables = () => {
  const { student } = useAppContext();
  
  return (
    <Layout title="Time Tables" showBackButton={true}>
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-center text-xl font-medium">Time Table</h2>
            <p className="text-center text-gray-500">Class: {student.class} | Section: {student.section}</p>
          </div>
          
          <div className="divide-y">
            {subjects.map((subject, index) => (
              <a key={index} href={subject.link} className="block p-4 hover:bg-gray-50">
                <span className="text-blue-500 font-medium">{subject.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeTables;
