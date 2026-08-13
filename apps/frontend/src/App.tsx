import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';

// Pages (placeholders - will be implemented in subsequent sub-tasks)
const Dashboard = () => <div className="p-8 text-forest-600 text-2xl">🌱 儀表板（開發中）</div>;
const Login = () => <div className="p-8 text-forest-600 text-2xl">🔐 登入（開發中）</div>;
const Register = () => <div className="p-8 text-forest-600 text-2xl">📝 註冊（開發中）</div>;
const Ingredients = () => <div className="p-8 text-forest-600 text-2xl">🥦 食材管理（開發中）</div>;
const Recipes = () => <div className="p-8 text-forest-600 text-2xl">🍳 食譜生成（開發中）</div>;
const Stats = () => <div className="p-8 text-forest-600 text-2xl">🌍 環保統計（開發中）</div>;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/ingredients" element={<ProtectedRoute><Ingredients /></ProtectedRoute>} />
      <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
