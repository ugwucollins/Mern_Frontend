import Loading from "../content/loading";
import { Link } from "react-router-dom";

interface Props {
  posts: any;
  loading: boolean;
  err: any;
  TextsNum: any;
}

function Blog({ posts, loading, err, TextsNum }: Props) {
  return (
    <section className="h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-[2px] overflow-hidden">
            {posts.map((post: any, index: any) => (
              <div
                key={index}
                className="mb-4 mt-1 w-full shadow-gray-400 hover:shadow-neutral-500 transition-all rounded-lg
               text-black bg-slate-50/30 hover:bg-slate-50/50 
               glass shadow-md  hover:shadow-xl drop-shadow-xl h-auto p-1"
              >
                <div className="p-2 m-1">
                  <div className="cursor-pointer text-black ">
                    <Link
                      to={`${post._id}`}
                      className="font-semibold text-xl capitalize hover:underline hover:text-slate-600"
                    >
                      {post.titles}
                    </Link>
                  </div>

                  <div className="mt-1 hidden sm:block transition font-medium text-black/70">
                    {/* {post.body} */}
                    {TextsNum(post.body, 80)}
                  </div>
                  <div className="mt-1 sm:hidden block transition font-medium text-black/70">
                    {TextsNum(post.body, 30)}
                  </div>
                  <div className="flex mt-1 sm:mt-0 sm:flex-row sm:gap-2 gap-0 flex-col">
                    <div className="text-gray-700/80 font-normal">
                      Posted by: {post.name},
                    </div>
                    <div className="text-gray-700/80 font-normal">
                      Date: {post.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="flex flex-col justify-center capitalize text-center text-red-700 mt-[300px] font-medium text-2xl">
              Your Blog is Empty Or Not Found
              <Link
                to={"/create"}
                className="text-blue-600 font-normal cursor-pointer text-base"
              >
                Create One
              </Link>
            </div>
          )}

          {err && (
            <div className="flex flex-col justify-center capitalize text-center text-red-700 mt-[300px] font-medium text-2xl">
              Server Error: {err}
              <Link
                to={"/create"}
                className="text-blue-600 font-normal cursor-pointer text-base"
              >
                Try Again
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Blog;
