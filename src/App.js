import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebNavigation from './Components/Navigation/Navigation';
import Contacts from './Components/Contacts/Contacts';
import Posts from './Components/Posts/Posts';
import PopularPosts from './Components/PopularPosts/PopularPosts';
import Logo from './Assets/logo.png';
import Footer from './Components/Footer/Footer';
function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [postReactions, setPostReactions] = useState({});
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setUsers(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=10')
      .then((response) => {
        setBlogs(response.data);
      });
  }, []);

  // Initialize postReactions with default values
  useEffect(() => {
    const initialReactions = {};
    posts.forEach((post) => {
      initialReactions[post.id] = { likes: 0, dislikes: 0 };
    });
    setPostReactions(initialReactions);
  }, [posts]);

  const handleLike = (postId) => {
    // Update likes count in the state for the specified post
    setPostReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: {
        ...prevReactions[postId],
        likes: prevReactions[postId].likes + 1,
      },
    }));
    // You can also make an API request to update the likes count in the database.
  };

  const handleDislike = (postId) => {
    // Update dislikes count in the state for the specified post
    setPostReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: {
        ...prevReactions[postId],
        dislikes: prevReactions[postId].dislikes + 1,
      },
    }));
    // You can also make an API request to update the dislikes count in the database.
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);

    axios.post('http://localhost:8000/api/posts', data).then((response) => {
      setPosts([...posts, response.data.post]);
      setFormData({ title: '', description: '', image: null });
    });
  };

  return (
    <>
      <WebNavigation />
      <div className={'md:grid grid-cols-7  px-[20px] pb-[25px] pt-[100px]'}>
        <Contacts />
        <Posts />
        <PopularPosts />
      </div>
      <Footer />
    </>
  );
}

export default App;
