import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Online Keep Notes</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/support">Support</Link></li>
      </ul>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Welcome to Online Keep Notes</h1>
      <p>Your notes, anytime, anywhere.</p>
      <button className="cta-button">Get Started</button>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2>Key Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Rich Text Editing</h3>
          <p>Edit your notes with ease using our rich text editor.</p>
        </div>
        <div className="feature-item">
          <h3>Cloud Sync</h3>
          <p>Sync your notes across all your devices.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Storage</h3>
          <p>Your notes are encrypted and stored securely.</p>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="pricing">
      <h2>Pricing Plans</h2>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Free</h3>
          <p>Basic features</p>
          <button className="pricing-button">Sign Up</button>
        </div>
        <div className="pricing-card">
          <h3>Premium</h3>
          <p>Advanced features, unlimited notes</p>
          <button className="pricing-button">Upgrade</button>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-list">
        <div className="testimonial-item">
          <p>"Best note-taking app I've ever used!"</p>
          <p>- John Doe</p>
        </div>
        <div className="testimonial-item">
          <p>"Syncs perfectly across all my devices."</p>
          <p>- Jane Smith</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Online Keep Notes. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </footer>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
    </div>
  );
};

const Features = () => {
  return (
    <div>
      <h1>Features</h1>
      <p>Explore our advanced features.</p>
    </div>
  );
};

const Pricing = () => {
  return (
    <div>
      <h1>Pricing</h1>
      <p>Choose a plan that fits your needs.</p>
    </div>
  );
};

const Support = () => {
  return (
    <div>
      <h1>Support</h1>
      <p>Need help? Contact our support team.</p>
    </div>
  );
};

const Homepage = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Homepage;