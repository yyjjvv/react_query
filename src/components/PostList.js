import { useQuery } from "@tanstack/react-query";
// customed files
import { getPosts } from "../api";
import styles from "./PostList.module.css";
// components
import Post from "./Post";

function PostList() {
    const { data: postsData } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

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
