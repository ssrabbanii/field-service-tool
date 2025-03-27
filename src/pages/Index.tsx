
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // We're using the Layout in App.tsx directly, so we just redirect to the root route
  return <Navigate to="/" replace />;
};

export default Index;
