import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Mission from './pages/Mission';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import './assets/styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/scan" component={Scan} />
              <Route path="/profile" component={Profile} />
              <Route path="/learn" component={Learn} />
              <Route path="/history" component={History} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/mission" component={Mission} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;