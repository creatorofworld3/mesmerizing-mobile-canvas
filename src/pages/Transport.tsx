
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const transportDetails = {
  busNumber: "B-034",
  route: "Route 12: School - Downtown - Westside",
  driverName: "Mr. Johnson",
  driverContact: "9876543210",
  pickupTime: "7:30 AM",
  dropTime: "3:30 PM",
  pickupLocation: "Main Street Corner",
  dropLocation: "Main Street Corner"
};

const busStops = [
  { time: "7:00 AM", location: "School", status: "start" },
  { time: "7:15 AM", location: "Central Park", status: "stop" },
  { time: "7:25 AM", location: "Library Junction", status: "stop" },
  { time: "7:30 AM", location: "Main Street Corner", status: "stop" },
  { time: "7:45 AM", location: "Market Square", status: "stop" },
  { time: "8:00 AM", location: "School", status: "end" }
];

const Transport = () => {
  return (
    <Layout title="Transport" showBackButton={true}>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 bg-school-primary text-white">
            <h2 className="text-lg font-medium">Transport Details</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Bus Number</span>
              <span>{transportDetails.busNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Route</span>
              <span>{transportDetails.route}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Driver</span>
              <span>{transportDetails.driverName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Contact</span>
              <Button 
                variant="link" 
                className="p-0 h-auto text-school-primary"
                onClick={() => window.location.href = `tel:${transportDetails.driverContact}`}
              >
                {transportDetails.driverContact}
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Pickup Time</span>
              <span>{transportDetails.pickupTime}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Drop Time</span>
              <span>{transportDetails.dropTime}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Pickup Location</span>
              <span>{transportDetails.pickupLocation}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Drop Location</span>
              <span>{transportDetails.dropLocation}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 bg-school-primary text-white">
            <h2 className="text-lg font-medium">Bus Route</h2>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {busStops.map((stop, index) => (
                <div key={index} className="flex items-start">
                  <div className="relative mr-4">
                    <div className={`w-4 h-4 rounded-full ${
                      stop.status === "start" ? "bg-green-500" :
                      stop.status === "end" ? "bg-red-500" : "bg-school-primary"
                    } mt-1`}></div>
                    {index < busStops.length - 1 && (
                      <div className="absolute top-4 bottom-0 left-2 w-0.5 bg-gray-300 -ml-px h-8"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{stop.location}</div>
                    <div className="text-sm text-gray-500">{stop.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transport;
