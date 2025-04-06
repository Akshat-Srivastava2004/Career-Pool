import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Component/AuthProvider";
import Landingpage from "./Component/landing_page";
import EmployerRegistration from "./Pages/Company/Register";
import ApplicantRegistration from "./Pages/Job_seekers/Register";
import LoginPage from "./Pages/Company/Login";
import PostJobPage from "./Pages/Company/posting";
import FeedbackPage from "./Pages/Admin/feedback";
import CareerPortal from "./Pages/Admin/career";
import AdminPage from "./Pages/Admin/admin";
import AboutUsPage from "./Pages/Admin/aboutus";
import AdminLogin from "./Pages/Admin/login";
import JobSeekersPage from "./Pages/Job_seekers/display";
import ChatPage from "./Pages/Job_seekers/chat";
import { ChatProvider } from "./Component/ChatProvider";
import JobseekerNotifications from "./Pages/Job_seekers/notification";
import CompanyAdminPanel from "./Pages/Company/companypanel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <Routes>
        <Route path="/chat" element={<ChatPage />}/>
        <Route path="/display" element={<JobSeekersPage />}/>
        <Route path="/adminlogin" element={<AdminLogin />}/>
        <Route path="/aboutus" element={<AboutUsPage />}/>
        <Route path="/adminpage" element={<AdminPage />}/>
        <Route path="/career" element={<CareerPortal />}/>
        <Route path="/feedback" element={<FeedbackPage />}/>
        <Route path="/postjob" element={<PostJobPage />}/>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/jobseekersregister" element={<ApplicantRegistration />} />
        <Route path="/company/register" element={<EmployerRegistration />} />
        <Route path="/notification" element={<JobseekerNotifications />}/>
        <Route path="/companyadminpanel" element={<CompanyAdminPanel />}/>
       
      </Routes>
      </ChatProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
    
  );
}

export default App;
