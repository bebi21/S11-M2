import axios from "axios";
import React, { useEffect, useState } from "react";

const url = "http://localhost:4070/user";
export default function Demo() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setPost(response.data);
    });
  }, []);

  const createPost = async () => {
    await axios
      .post("http://localhost:4070/user", {
        name: "Hello World!",
        title: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  };
  const editPost = async () => {
    await axios
      .put("http://localhost:4070/user/2", {
        name: "Hello !",
        title: "This is a new post 231.",
      })
      .then((response) => {
        setPost(response.data);
      });
  };
  const deletePost = async () => {
    await axios.delete("http://localhost:4070/user/2");
  };
  return (
    <div>
      <h1>Hello Word</h1>
      <button onClick={createPost}>Create Post</button>
      <button onClick={editPost}>Edit Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}
