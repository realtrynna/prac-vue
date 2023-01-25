<template>
    <div>
        <div class="card">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <h6>
                    <span class="badge bg-secondary">{{
                        type === "news" ? "뉴스" : "공지사항"
                    }}</span>
                </h6>
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "news",
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        console.log("This is CardComponent!");
        // console.log(props.name);
    },
};
</script>
