import React from "react";

const BlogPost = (blog) => {
  return (
    <div className="shadow-neuShadow rounded-sm m-6 tb:m-10 p-6 tb:p-10 font-sans max-w-4xl">
      <p className="text-sm tb:text-lg my-2 tb:my-1">
        {blog.blog.pubDate.slice(4, 16)}
      </p>
      <a
        href={blog.blog.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-lg lp:text-xl text-gray-900"
      >
        {blog.blog.title}
      </a>
      <p className="text-gray-700 mt-6 font-medium text-sm tb:text-lg">
        {blog.blog.description}
      </p>
      <p className="text-sm tb:text-lg my-2 tb:my-1">
        To know more{" "}
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
