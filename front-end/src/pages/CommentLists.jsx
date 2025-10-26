import React from 'react'

const CommentLists = ({comments}) => {
  return (
    <>
        <h3>Comments:</h3>
        {comments.map(comment => (
            <div key={comment.text}>
                <h4>Author: {comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </>
  )
}

export default CommentLists