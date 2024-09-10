import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../Skeletons/PostSkeleton";
import Post from "./Post";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts";
      case "following":
        return "/api/posts/following";
      default:
        return "/api/posts";
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  const {
    data: POSTS,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);
  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && POSTS?.data.length === 0 && (
        <p className="text-center my-4">No Post in this tab.</p>
      )}
      {!isLoading && POSTS.status && (
        <div>
          {POSTS.data.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
