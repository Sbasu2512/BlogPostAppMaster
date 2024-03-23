import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";
import { ToastContainer, toast } from "react-toastify";
import { addAllPostsAction, addUserPostsAction } from "../../Actions/postAction";


export default function PostDetailPage(props) {
  
  const [changeLikes, setChangeLikes] = useState(false);
  const [changeDislikes, setChangeDislikes] = useState(false);
  const [pullPosts, setPullPosts] = useState(false);

  const dispatch = useDispatch();
  
  const allPosts = useSelector((state) => state?.posts?.AllPosts);

  const user = useSelector((state)=> state?.users?.userDetails);

  const post_id = useParams();

  const post = allPosts.filter((x) => x.id === post_id.id)[0];
let likes = 0
let dislikes = 0;
if(Array.isArray(post.likes) && Array.isArray(post.dislikes)){
  likes = post.likes.length
  dislikes = post.dislikes.length
}
  console.log(post)

  const timePostCreated = `${new Date(post.createdon).getDate()}/${new Date(post.createdon).getMonth()+1}/${new Date(post.createdon).getFullYear()}`

  useEffect(()=>{
    if(changeLikes){
      axios.post(`${env.REACT_APP_Posts_API}/likes`,{
        user_id:user.userId,
        post_id:post.id
      }).then((res)=>{
        console.log(res);
        if(res.status === 200){
          toast.info(res.data);
          setPullPosts(true);
        }
      })
    }

    return ()=>{
      setChangeLikes(false);
    }

  },[changeLikes])

  useEffect(()=>{
    if(changeDislikes){
      axios.post(`${env.REACT_APP_Posts_API}/dislikes`,{
        user_id:user.userId,
        post_id:post.id
      }).then((res)=>{
        console.log(res);
        if(res.status === 200){
          toast.info(res.data);
          setPullPosts(true);
        }
      })
    }

    return ()=>{
      setChangeDislikes(false);
    }

  },[changeDislikes])

  useEffect(()=>{
    const userId = user.userId;
    if(pullPosts && userId){
      axios.all(
        [axios.get(`${env.REACT_APP_Posts_API}/postsAll`),
        axios.get(`${env.REACT_APP_Posts_API}/posts/${userId}`)]
      ).then((axios.spread((allPosts,userPosts)=>{
        //save all posts to store
        dispatch(addAllPostsAction(allPosts.data.result));
        //save user posts to store with user_id
        const userPostObj = {
          user_id:userId,
          user_posts:userPosts.data.result
        }
        dispatch(addUserPostsAction(userPostObj));
      })))

    }

    return () => {
      setPullPosts(false);
    }
  },[pullPosts])

  return (
    <>
    <ToastContainer/>
      <div className="container h-[600px] w-[100vw]">
        <div className="col-span-1"></div>
        <div className="col-span-2 flex flex-col content-center flex-wrap w-[100vw]">
          <div className="overflow-auto w-[100vw] h-[100vh]">
            <div className="h-15 rounded  light-orange font-mono mx-5 my-5">
              <div className="flex mx-3 text-xs">
                <p className="mt-2">Posted By <strong>{post.displayname}</strong></p>
                <p className="mt-2 ml-1">on {timePostCreated}</p>
              </div>
              <div className="mx-2 mt-2">
              <span className="text-2xl font-bold" >{post.post_title}</span>
              <span className="float-right flex  ring-black rounded-full bg-black text-white p-1">
              {post.tag}
              </span>

              </div>
              <br />
              <div className="mx-5 my-5">{post.post_body}</div>
              <div className="flex flex-row bg-yellow-200">
                <span className="w-[50%] flex content-center justify-center justify-items-center" onClick={()=>setChangeLikes(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mx-5 my-2"
                  >
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                  <p className="mt-2">{likes}</p>
                </span>
                <span className="w-[50%] flex content-center justify-center justify-items-center" onClick={()=>setChangeDislikes(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mx-5 my-2"
                  >
                    <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                  </svg>
                  <p className="mt-2">{dislikes}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
