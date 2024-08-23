///React routes and Imports
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

///React component
import Navbar from "./component/navbar";
import Create from "./component/create";
import Blog from "./component/blog";
import Edit from "./component/edit";
import Api from "./Axios/Api";
import EditById from "./component/editById";

export default function App() {
  const locate = useNavigate();
  // All the Posts
  const [posts, setposts] = useState([]);
  const [searchResult, setsearchResult] = useState([]);

  // errors and loading
  const [err, seterr] = useState<any>();
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");

  // // Create useState
  const [name, setname] = useState("");
  const [titles, settitles] = useState("");
  const [body, setbody] = useState("");

  // // Edit useState
  const [editName, seteditName] = useState("");
  const [editTitles, seteditTitles] = useState("");
  const [editBody, seteditBody] = useState("");

  const [inputErrors, setinputErrors] = useState({
    name: "",
    titles: "",
    body: "",
  });

  useEffect(() => {
    const FetchApi = async () => {
      try {
        const res = await Api.get("/users");
        const data = res.data;
        console.log(data);
        setposts(data.posts);
        setloading(false);
      } catch (error: unknown) {
        seterr(error);
      }
    };

    setTimeout(() => {
      FetchApi();
      setloading(false);
    }, 1500);
  }, []);
  const TextsNum = (posts: any, num: any) => {
    if (posts.length >= num) {
      return posts.slice(0, num) + "...";
    } else {
      return posts;
    }
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    let errors = {
      name: "",
      titles: "",
      body: "",
    };

    const now = Date.now();
    const date = new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(
      now
    );
    const creatListPost = {
      date: date,
      name,
      titles,
      body,
    };

    // const myPost: any = [...posts, creatListPost];
    //setposts(myPost);

    // For Api

    try {
      if (creatListPost.name === "") {
        errors.name = " UserName is Required";
      } else if (creatListPost.name.length <= 4) {
        errors.name = "UserName most be more than 5 characters";
      } else if (creatListPost.titles === "") {
        errors.titles = "Title Is Required";
      } else if (creatListPost.titles.length <= 9) {
        errors.titles = "Title most be more than 10 characters";
      } else if (creatListPost.body === "") {
        errors.body = "Your  body content is required";
      } else if (creatListPost.body.length <= 29) {
        errors.body = "your content most be more than 30 characters";
      } else {
        const response = await Api.post("/users", creatListPost);
        const myPost: any = [...posts, response.data];
        setposts(myPost);
        console.log(posts);
        setname("");
        settitles("");
        setbody("");
        locate("/");
        window.location.reload();
      }
    } catch (error: any) {
      seterr(error.message);
    }
    setinputErrors({ ...errors });
  };

  const deleteHandle = async (_id: any) => {
    try {
      await Api.delete(`/users/${_id}`);
      const deletes = posts.filter((post: any) => post._id !== _id);
      setposts(deletes);
      locate("/");
    } catch (error: any) {
      seterr(error.message);
    }
  };

  const editHandle = async (_id: any) => {
    const now = Date.now();
    const updatedDate = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
    }).format(now);

    const editListPost = {
      _id,
      updatedDate: updatedDate,
      name: editName,
      titles: editTitles,
      body: editBody,
    };

    // const checks: any = posts.map((post: any) =>
    //   post._id === _id ? { ...editListPost } : post
    // );
    // setposts(checks);
    // locate("/");

    //for Api

    try {
      const response = await Api.put(`/users/${_id}`, editListPost);
      if (response) {
        const checks: any = posts.map((post: any) =>
          post._id === _id ? { ...response.data } : post
        );
        setposts(checks);
        locate("/");
        window.location.reload();
      } else {
        seterr({ message: "Post Id Not Found" });
      }
    } catch (error: any) {
      seterr(error.message);
    }
  };

  useEffect(() => {
    const filterPosts = posts.filter(
      (post: any) =>
        post.name.toLowerCase().includes(search.toLowerCase()) ||
        post.titles.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filterPosts);

    setsearchResult(filterPosts.reverse());
  }, [posts, search]);

  return (
    <>
      <Navbar search={search} setsearch={setsearch} />
      <main className="p-3 max-[300px]:p-0 bg-slate-300/50 min-h-max overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <Blog
                TextsNum={TextsNum}
                posts={searchResult}
                err={err}
                loading={loading}
              />
            }
          />
          <Route
            path="/:_id"
            element={<Edit posts={posts} deleteHandle={deleteHandle} />}
          />
          <Route
            path="/editById/:_id"
            element={
              <EditById
                editHandle={editHandle}
                editName={editName}
                seteditName={seteditName}
                editTitles={editTitles}
                seteditTitles={seteditTitles}
                editBody={editBody}
                seteditBody={seteditBody}
                posts={posts}
              />
            }
          />
          <Route
            path="/create"
            element={
              <Create
                name={name}
                setname={setname}
                titles={titles}
                settitles={settitles}
                inputErrors={inputErrors}
                body={body}
                setbody={setbody}
                submitHandle={submitHandle}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

// const { _id, name, titles, body, date } = result;
// const [posts, setposts] = useState([{ result }]);
// const [posts, setposts] = useState([{ _id, date, name, body, titles }]);
