import { useState} from 'react'

const AddCommentForm = ({ onAddComment}) => {
    const [nameText, setNameText] = useState('')
    const [commentText, setCommentText] = useState('')
  return (
    // <div>
    //     <h3>Add a Comment</h3>
    //     <label>
    //         Name:
    //         <input type='text' value={nameText} onChange={e => setNameText(e.target.value)}/>
    //     </label>
    //     <label>
    //         Comments
    //         <input type='text' value={commentText} onChange={e => setCommentText(e.target.value)}/>
    //     </label>
    //     <button onClick={() => {onAddComment({ nameText, commentText});
    //         setNameText('');
    //         setCommentText('');
    //     }}>Add Comment</button>
    // </div>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Add a Comment</h3>
              <div className="space-y-4">
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                         Name:
                     </label>
                     <input
                         type='text'
                         value={nameText}
                         onChange={e => setNameText(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                         placeholder="Enter your name"
                     />
                 </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                         Comment:
                     </label>
                     <textarea
                         value={commentText}
                         onChange={e => setCommentText(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        rows="4"
                        placeholder="Enter your comment"
                     />
                </div>
                <button
                    onClick={() => {
                        onAddComment({ nameText, commentText});
                        setNameText('');
                        setCommentText('');
                    }}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 
       rounded-md transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                 >
                     Add Comment
                 </button>
             </div>
             </div>
  )
}

export default AddCommentForm;