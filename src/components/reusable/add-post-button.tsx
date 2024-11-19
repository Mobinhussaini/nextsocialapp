"use client"; 

import React from 'react'
import { useFormStatus } from 'react-dom';

const AddPostButton = () => {
    const {pending } = useFormStatus(); 

  return (
    <button className='bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed' disabled={pending} > 
        {pending ? "Adding..." : "Add Post"}
    </button>
  )
}

export default AddPostButton
