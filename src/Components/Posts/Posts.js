import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [postReactions, setPostReactions] = useState({});
  useEffect(() => {
    axios
      .get('https://blog-service-bik7.onrender.com/api/posts')
      .then((response) => {
        setPosts(response.data);
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

    axios
      .post('https://blog-service-bik7.onrender.com/api/posts', data)
      .then((response) => {
        toast.success('New Post Created', { autoClose: 3000 });
        setPosts([...posts, response.data.post]);
        setFormData({ title: '', description: '', image: null });
      });
  };

  const handleDelete = (postId) => {
    console.log('Deleting post with ID:', postId);
    axios
      .delete(`https://blog-service-bik7.onrender.com/api/posts/${postId}`)
      .then(() => {
        // Remove the deleted post from the state
        setPosts(posts.filter((post) => post.id !== postId));
        toast.success('Post deleted successfully', { autoClose: 3000 });
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        toast.error('Error deleting post. Please try again.', {
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div className="col-span-3 p-4 shadow-lg">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="mb-4  md:shadow-lg md:px-[20px] px-[5px] md:py-[15px] py-[7px]"
        >
          <h1 className="md:text-xl text-blue-950  font-bold mb-4">New Post</h1>
          <div className="mb-4 md:text-base text-sm">
            <label htmlFor="title" className="block font-medium text-gray-700 ">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md h-[40px] text-blue-950 px-[5px]"
              required
            />
          </div>
          <div className="mb-4 md:text-base text-sm">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-md  text-blue-950 px-[5px]"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4 md:text-base text-sm">
            <label htmlFor="image" className="block font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 pt-[5px]"
              accept="image/*"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded"
            >
              Create Post
            </button>
          </div>
        </form>
        <div className={'pb-[20px] pt-[30px]'}>
          <span className={'text-xl  text-blue-950  font-bold '}>
            {' '}
            My Posts
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 bg-white">
          {posts.map((post, index) => (
            <div
              key={index}
              className=" rounded-xl border-2 border-gray-200 font-serif  overflow-hidden hover:bg-gray-50 shadow-xl"
            >
              <img
                src={`https://blog-service-bik7.onrender.com/${post.imageUrl}`}
                alt={post.title}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4 bg-white hover:bg-gray-50">
                <h2 className="text-xl font-bold mb-2 text-blue-950">
                  {post.title}
                </h2>
                <p className="">{post.description}</p>

                <div className={'pt-[30px] grid grid-cols-7 md:gap-[50px]'}>
                  <div className={'col-span-2'}>
                    <button
                      className={'hover:bg-gray-100'}
                      onClick={() => handleDelete(post._id)}
                    >
                      <RiDeleteBinLine size={25} />
                    </button>
                  </div>
                  <div className={'col-span-3 invisible'}>
                    <span> Hello</span>
                  </div>
                  <div className={'col-span-2 flex gap-4 '}>
                    <button onClick={() => handleLike(post.id)}>
                      <AiOutlineLike size={25} /> (
                      {postReactions[post.id]?.likes || 0})
                    </button>
                    <button onClick={() => handleDislike(post.id)}>
                      <AiOutlineDislike size={25} /> (
                      {postReactions[post.id]?.dislikes || 0})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center md:pt-[80px] pt-[40px]">
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default Posts;
