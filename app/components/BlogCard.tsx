import { Link } from "remix";

export const BlogCard = (props) => {
  const { title, teaser, link } = props;

  return (
    <div className="">
      <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
        {/* <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">Jun 1, 2020</span>
          <a
            href="#"
            className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500"
          >
            Laravel
          </a>
        </div> */}
        <div className="mt-2">
          <a
            href="#"
            className="text-2xl font-bold text-gray-700 hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-600">{teaser}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link className="text-blue-500 hover:underline" to={link}>
            Read more
          </Link>
          {/* <div>
            <a href="#" className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                alt="avatar"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 className="font-bold text-gray-700 hover:underline">
                Alex John
              </h1>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};
