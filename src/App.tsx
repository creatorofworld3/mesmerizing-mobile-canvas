
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import StudentInfo from "./pages/StudentInfo";
import Attendance from "./pages/Attendance";
import FeeInfo from "./pages/FeeInfo";
import ClassDiary from "./pages/ClassDiary";
import Examinations from "./pages/Examinations";
import TimeTables from "./pages/TimeTables";
import Transport from "./pages/Transport";
import Announcements from "./pages/Announcements";
import Homework from "./pages/Homework";
import { AppContextProvider } from "./context/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContextProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student-info" element={<StudentInfo />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/fee-info" element={<FeeInfo />} />
            <Route path="/class-diary" element={<ClassDiary />} />
            <Route path="/examinations" element={<Examinations />} />
            <Route path="/time-tables" element={<TimeTables />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/homework" element={<Homework />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
