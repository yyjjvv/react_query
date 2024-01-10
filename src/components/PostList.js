// packages
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
// customed files
import { getPosts, getPostsByUsername, uploadPost } from "../api";
import { LoginContext } from "../context/LoginContext";
import { FEED_VARIANT, QUERY_KEYS } from "../values";
import styles from "./PostList.module.css";
// components
import Post from "./Post";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import PostForm from "./PostForm";

function PostList({ variant = FEED_VARIANT.HOME_FEED, showPostForm }) {
    const { currentUsername } = useContext(LoginContext);
    const queryClient = useQueryClient();

    let postsQueryKey;
    let postsQueryFn;

    if (variant === FEED_VARIANT.HOME_FEED) {
        postsQueryKey = ["posts"];
        postsQueryFn = getPosts;
    } else if (variant === FEED_VARIANT.MY_FEED) {
        postsQueryKey = [QUERY_KEYS.POSTS, currentUsername];
        postsQueryFn = () => getPostsByUsername(currentUsername);
    } else {
        console.warn("Invalid feed request.");
    }

    const {
        data: postsData,
        isPending,
        isError,
    } = useQuery({
        queryKey: postsQueryKey,
        queryFn: postsQueryFn,
    });

    const uploadPostMutation = useMutation({
        mutationFn: (newPost) => uploadPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
        },
    });

    const handleUploadPost = (newPost) => {
        uploadPostMutation.mutate(newPost, {
            onSuccess: () => {
                toast("포스트가 성공적으로 업로드 되었습니다!");
            },
        });
    };

    if (isPending) return <LoadingPage />;

    if (isError) return <ErrorPage />;

    const posts = postsData?.results ?? [];

    return (
        <div className={styles.postList}>
            {showPostForm ? (
                <PostForm
                    onSubmit={handleUploadPost}
                    buttonDisabled={uploadPostMutation.isPending}
                />
            ) : (
                ""
            )}
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
