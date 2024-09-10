import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();

  const {
    mutate: followUnFollow,
    data: followStatus,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (user_id) => {
      try {
        const res = await fetch(`/api/user/follow/${user_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      //TODO
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error(error.message);
    },
  });
  return { followUnFollow, isSuccess, followStatus };
};

export default useFollow;
