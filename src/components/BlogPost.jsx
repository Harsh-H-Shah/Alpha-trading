import React from 'react';

const BlogPost = (blog) => {
  return (
    <div className="shadow-neuShadow rounded-sm m-10 p-10 font-sans max-w-4xl">
      <p>{blog.blog.pubDate.slice(6, 16)}</p>
      <a
        href={blog.blog.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-xl text-gray-900"
      >
        {blog.blog.title}
      </a>
      <p className="text-gray-700 mt-6 font-medium">{blog.blog.description}</p>
      <p>
        To know more{' '}
        <a
          href={blog.blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          Click here
        </a>
      </p>
    </div>
  );
};

export default BlogPost;
