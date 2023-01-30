import axios from "axios";

export const posts = [
    { id: 1, title: "1번 제목", content: "1번 내용" },
    { id: 2, title: "2번 제목", content: "2번 내용" },
    { id: 3, title: "3번 제목", content: "3번 내용" },
    { id: 4, title: "4번 제목", content: "4번 내용" },
    { id: 5, title: "5번 제목", content: "5번 내용" },
    { id: 6, title: "마지막 게시글 제목", content: "6번 내용" },
];

const baseUrl = "http://localhost:3000";

export const findPostById = async (postId: number) => {
    const req = await axios.get(`${baseUrl}/posts/${postId}`);

    return req?.data;
};

export const getPostList = async () => {
    const req = await axios.get(`${baseUrl}/posts`);

    return req.data ? req.data : null;
};

export const createPost = async (
    id: number,
    title: string,
    content: string
) => {
    const req = await axios.post(`${baseUrl}/posts`, {
        id,
        title,
        content,
    });

    return req;
};
