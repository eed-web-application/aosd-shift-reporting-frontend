import React from 'react';
import { Sidebar } from 'react-pro-sidebar';
import '../App.css';

function Layout({ children }) {
  return (
    // Main container for the layout
    <div className="Layout">
      {/* Sidebar component for navigation */}
      <Sidebar />
      
      {/* Main content container */}
      <main className="Main">
        {/* Render the child components passed to Layout */}
        {children}
      </main>
    </div>
  );
}

export default Layout;