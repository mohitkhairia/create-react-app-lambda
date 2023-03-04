import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import "./App.css";
import Home from "./pages/Home.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Navbar from "./components/Navbar.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [postToUpdate, setPostToUpdate] = useState(null);

  const handleSignup = (credentials) => {
    // Handle signup logic
    setIsLoggedIn(true);
  };

  const handleLogin = (credentials) => {
    // Handle login logic
    setIsLoggedIn(true);
    setUserPosts([
      { id: 1, title: 'My first post', content: 'Lorem ipsum dolor sit amet.' },
      { id: 2, title: 'My second post', content: 'Consectetur adipiscing elit.' },
      { id: 3, title: 'My third post', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    ]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPosts([]);
    setPostToUpdate(null);
  };
  const handleDelete = (postId) => {
    // Filter out the post with the given postId from userPosts
    const updatedPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedPosts);
  };

  const handleUpdate = (postId, { title, content }) => {
    // Find the post with the given postId in userPosts and update it
    const updatedPosts = userPosts.map((post) => {
      if (post.id === postId) {
        return { id: post.id, title, content };
      } else {
        return post;
      }
    });
    setUserPosts(updatedPosts);
  };
  
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {isLoggedIn ? (
        <Posts userPosts={userPosts} onDelete={handleDelete} onUpdate={handleUpdate} onLogout={handleLogout} postToUpdate={postToUpdate} setPostToUpdate={setPostToUpdate} />
      ) : (
        <>
          <Home />
          <Signup onSignup={handleSignup} />
          <Login onLogin={handleLogin} />
        </>
      )}
    </>
  );
};

export default App;