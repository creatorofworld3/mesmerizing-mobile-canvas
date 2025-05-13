
import { useAppContext } from "@/context/AppContext";
import Layout from "@/components/Layout";

const StudentInfo = () => {
  const { student } = useAppContext();
  
  return (
    <Layout title="Student Info" showBackButton={true}>
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-4 bg-school-primary flex flex-col items-center justify-center">
            <div className="h-24 w-24 bg-school-secondary rounded-full overflow-hidden flex items-center justify-center mb-2">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#FFBB33"/>
                <path d="M30 15C24.477 15 20 19.477 20 25V26.5C20 32.023 24.477 36.5 30 36.5C35.523 36.5 40 32.023 40 26.5V25C40 19.477 35.523 15 30 15Z" fill="#333333"/>
                <path d="M30 20C27.5 20 26 22.5 26 25H34C34 22.5 32.5 20 30 20Z" fill="#FFFFFF"/>
                <path d="M35 30.5H25C25 33.5 27.239 36 30 36C32.761 36 35 33.5 35 30.5Z" fill="#FFFFFF"/>
                <path d="M25 42V40C25 38.895 25.895 38 27 38H33C34.105 38 35 38.895 35 40V42L37 44H23L25 42Z" fill="#333333"/>
                <path d="M30 10L34 13H26L30 10Z" fill="#333333"/>
                <path d="M30 6V10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-white">{student.name}</h2>
            <p className="text-white opacity-90">Class: {student.class}</p>
            <p className="text-white opacity-90">Section: {student.section}</p>
          </div>
          
          <div className="grid grid-cols-2 border-b border-gray-200">
            <div className="p-4 border-r border-gray-200">
              <h3 className="text-xs text-gray-500">Admission Number</h3>
              <p className="text-gray-800 font-medium">{student.admissionNumber}</p>
            </div>
            <div className="p-4">
              <h3 className="text-xs text-gray-500">Roll Number</h3>
              <p className="text-gray-800 font-medium">{student.rollNumber}</p>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium mb-2">Contact Information:</h3>
            <p className="text-gray-800">{student.mobileNumber}</p>
            <p className="text-gray-800">{student.address}</p>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Personal Info</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="text-xs text-gray-500">Branch</h4>
                <p className="text-gray-800">{student.branch}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Admission Type</h4>
                <p className="text-gray-800">{student.admissionType || "-"}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Admission Date</h4>
                <p className="text-gray-800">{student.admissionDate || "-"}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Date of Birth</h4>
                <p className="text-gray-800">{student.dateOfBirth}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Category</h4>
                <p className="text-gray-800">{student.category || "-"}</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Mobile Number</h4>
                <p className="text-gray-800">{student.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentInfo;
