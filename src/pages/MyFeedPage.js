// packages
import { ToastContainer } from "react-toastify";
// customed files
import { FEED_VARIANT } from "../values";
import styles from "./MyFeedPage.module.css";
// components
import PostList from "../components/PostList";
import Container from "../components/Container";

function MyFeedPage() {
    return (
        <Container className={styles.container}>
            <ToastContainer position="top-center" autoClose={2000} />
            <PostList variant={FEED_VARIANT.MY_FEED} showPostForm={true} />
        </Container>
    );
}

export default MyFeedPage;
