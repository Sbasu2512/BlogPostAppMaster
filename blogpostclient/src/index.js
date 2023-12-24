import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Posts from './components/Post/Post';
import ProtectedRoute  from './utility/protectedRoute.js';
import {Provider} from 'react-redux';
import store from './Redux/store.js'
import CreatePost from './components/createPost/createPost.js';
import PostDetailPage from './components/PostDetailPage/PostDetailPage.js';


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/posts',
    element: <ProtectedRoute><Posts/></ProtectedRoute>
  },
  {
    path:'/createNewPost',
    element: <ProtectedRoute><CreatePost/></ProtectedRoute>
  },
  {
    path:'/post/:id',
    element:<ProtectedRoute><PostDetailPage/></ProtectedRoute>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
