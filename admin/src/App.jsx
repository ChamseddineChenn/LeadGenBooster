import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminBlogs from './pages/AdminBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogPreview from './pages/BlogPreview';
import AdminCareers from './pages/AdminCareers';
import CreateCareer from './pages/CreateCareer';
import CareerPreview from './pages/CareerPreview';
import AdminMeetings from './pages/AdminMeetings';
import AdminQuotations from './pages/AdminQuotations';
import AdminNewsletter from './pages/AdminNewsletter';
import AdminApplications from './pages/AdminApplications';
import ApplicationDetail from './pages/ApplicationDetail';
import QuotationDetail from './pages/QuotationDetail';
import LoadingPage from './pages/LoadingPage';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={admin ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<CreateBlog />} />
        <Route path="blogs/preview/:id" element={<BlogPreview />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="careers/create" element={<CreateCareer />} />
        <Route path="careers/edit/:id" element={<CreateCareer />} />
        <Route path="careers/preview/:id" element={<CareerPreview />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="applications/:id" element={<ApplicationDetail />} />
        <Route path="meetings" element={<AdminMeetings />} />
        <Route path="quotations" element={<AdminQuotations />} />
        <Route path="quotations/:id" element={<QuotationDetail />} />
        <Route path="newsletter" element={<AdminNewsletter />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
