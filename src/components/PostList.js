// packages
import { useQuery } from "@tanstack/react-query";
// customed files
import { getPosts, getPostsByUsername } from "../api";
import { FEED_VARIANT } from "../values";
import styles from "./PostList.module.css";
// components
import Post from "./Post";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
    let postsQueryKey;
    let postsQueryFn;

    if (variant === FEED_VARIANT.HOME_FEED) {
        postsQueryKey = ["posts"];
        postsQueryFn = getPosts;
    } else if (variant === FEED_VARIANT.MY_FEED) {
        const username = "codeit";
        postsQueryKey = ["posts", username];
        postsQueryFn = () => getPostsByUsername(username);
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

    if (isPending) return <LoadingPage />;

    if (isError) return <ErrorPage />;

    const posts = postsData?.results ?? [];

    return (
        <div className={styles.postList}>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
