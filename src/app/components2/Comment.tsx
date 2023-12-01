"use client"
import React, { useState } from 'react';

// Define a comment component to display each comment and its replies
// const Comment = ({ comment }) => {
//   const [replyText, setReplyText] = useState('');
//   const [replies, setReplies] = useState([]);

//   // Function to handle adding a reply to a comment
//   const handleAddReply = () => {
//     if (replyText.trim() !== '') {
//       setReplies([...replies, { text: replyText, user: 'User' }]);
//       setReplyText('');
//     }
//   };

//   // Function to display replies for a comment
//   const renderReplies = (replies) => {
//     return replies.map((reply, index) => (
//       <div key={index} style={{ marginLeft: '20px', marginTop: '5px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
//         <div>
//           <span style={{ fontWeight: 'bold' }}>{reply.user}: </span>
//           <span>{reply.text}</span>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div style={{ marginTop: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
//       <div>
//         <span style={{ fontWeight: 'bold' }}>{comment.user}: </span>
//         <span>{comment.text}</span>
//       </div>
//       <div style={{ marginTop: '5px' }}>
//         <input
//           type="text"
//           value={replyText}
//           onChange={(e) => setReplyText(e.target.value)}
//           placeholder="Write a reply"
//           style={{ marginRight: '5px' }}
//         />
//         <button onClick={handleAddReply}>Reply</button>
//       </div>
//       {renderReplies(replies)}
//     </div>
//   );
// };


const Comment = ({ comment, handleReply }) => {
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState(comment.replies || []);
  
    const handleReplyClick = () => {
      setShowReply(!showReply);
    };
  
    const handleReplyChange = (e) => {
      setReplyText(e.target.value);
    };
  
    const handlePostReply = () => {
      if (replyText.trim() !== '') {
        const newReply = {
          id: replies.length + 1,
          content: replyText,
          user: {
            username: 'DummyUser',
            avatar: 'https://via.placeholder.com/40',
          },
          replies: [],
        };
  
        setReplies([...replies, newReply]);
        setReplyText('');
        setShowReply(false);
  
        // Handle reply posting logic here if needed
        console.log('Posted reply:', newReply);
      }
    };
  
    return (
      <div className="mt-4 ml-4 border-l-2 pl-4">
        <div className="flex items-center mb-2">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={comment.user.avatar}
            alt={comment.user.username}
            
          />
          <span className="font-semibold">{comment.user.username}</span>
        </div>
        <div className="ml-10 mb-2">
          <p className="mb-2">{comment.content}</p>
          {!showReply && (
            <button onClick={handleReplyClick} className="text-blue-500">
              Reply
            </button>
          )}
          {showReply && (
            <div className="flex mt-2">
              <textarea
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Your reply..."
              ></textarea>
              <button onClick={handlePostReply} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Post
              </button>
            </div>
          )}
        </div>
        {/* Recursive rendering for nested comments (replies) */}
        {replies && replies.length > 0 &&
          replies.map((reply) => (
            <Comment key={reply.id} comment={reply} handleReply={handleReply} />
          ))}
      </div>
    );
  };
  
  
export default Comment;