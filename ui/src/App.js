import './App.css';
import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import Layout from './components/Layout';
import { UserContextProvider } from './context/userContext';
import { AuthContextProvider } from './context/authContext';

function App() {
  return (
    <AuthContextProvider >
      <UserContextProvider>
        <Routes >
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
