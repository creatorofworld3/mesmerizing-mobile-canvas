
import Layout from "@/components/Layout";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const feeData = [
  {
    id: 1,
    term: "Term 1",
    amount: 25000,
    dueDate: "2025-06-15",
    status: "paid",
    paidDate: "2025-06-10",
    transactionId: "TXN123456"
  },
  {
    id: 2,
    term: "Term 2",
    amount: 25000,
    dueDate: "2025-09-15",
    status: "unpaid"
  },
  {
    id: 3,
    term: "Term 3",
    amount: 25000,
    dueDate: "2025-12-15",
    status: "unpaid"
  }
];

const FeeInfo = () => {
  const { student } = useAppContext();
  
  const totalFees = feeData.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feeData.filter(fee => fee.status === "paid").reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = totalFees - paidFees;
  
  return (
    <Layout title="Fee Info" showBackButton={true}>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 bg-school-primary text-white">
            <h2 className="text-center text-lg font-medium">Fee Summary 2025-26</h2>
            <p className="text-center text-sm opacity-80">
              Student: {student.name} | Class: {student.class}
            </p>
          </div>
          
          <div className="grid grid-cols-3 text-center py-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="font-bold">₹{totalFees.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="font-bold text-green-600">₹{paidFees.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="font-bold text-red-600">₹{pendingFees.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium mb-3">Payment Schedule</h3>
            <div className="space-y-4">
              {feeData.map(fee => (
                <div key={fee.id} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{fee.term}</span>
                    {fee.status === "paid" ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Paid</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Amount: ₹{fee.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Due Date: {fee.dueDate}
                  </div>
                  
                  {fee.status === "paid" ? (
                    <div className="text-xs text-gray-500">
                      Paid on {fee.paidDate} | Txn ID: {fee.transactionId}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-school-primary text-school-primary hover:bg-school-primary hover:text-white"
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeeInfo;
