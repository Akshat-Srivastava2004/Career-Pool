import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Component/AuthProvider";
import Landingpage from "./Component/landing_page";
import EmployerRegistration from "./Pages/Company/Register";
import ApplicantRegistration from "./Pages/Job_seekers/Register";
import LoginPage from "./Pages/Company/Login";
import PostJobPage from "./Pages/Company/posting";
import FeedbackPage from "./Pages/Admin/feedback";
import CareerPortal from "./Pages/Admin/career";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/career" element={<CareerPortal />}/>
        <Route path="/feedback" element={<FeedbackPage />}/>
        <Route path="/postjob" element={<PostJobPage />}/>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={< LoginPage />}/>
        <Route path="/job_seekersregister" element={<ApplicantRegistration />} />
        <Route path="/company/register" element={<EmployerRegistration />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
