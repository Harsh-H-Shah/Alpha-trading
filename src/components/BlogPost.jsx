import React from 'react';

const BlogPost = (blog) => {
  return (
    <article className="shadow-neuShadow rounded-sm m-6 p-10 font-sans w-3/4">
      <p>{blog.blog.pubDate.slice(5, 16)}</p>
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
    </article>
  );
};

export default BlogPost;
