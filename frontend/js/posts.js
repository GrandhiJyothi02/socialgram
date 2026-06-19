function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

const posts = [
{
    username: "Priya",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    content: "Enjoying my morning coffee ☕",
    likes: 124,
    comments: ["Nice!", "Looks great!"]
},
{
    username: "Rahul",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    content: "Weekend hiking adventure 🏔️",
    likes: 89,
    comments: ["Amazing!", "Beautiful view"]
},
{
    username: "Ananya",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    content: "Reading my favorite book 📚",
    likes: 156,
    comments: ["Which book?", "Love this"]
},
{
    username: "Arjun",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
    content: "Gym session completed 💪",
    likes: 203,
    comments: ["Strong!", "Keep going"]
},
{
    username: "Sneha",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    content: "Captured this beautiful sunset 🌅",
    likes: 175,
    comments: ["Beautiful shot!", "Wow"]
}
];

function likePost(index) {
    posts[index].likes++;
    loadPosts();
}

function commentPost(index) {

    const comment = prompt("Enter your comment");

    if(comment && comment.trim() !== "") {
        posts[index].comments.push(comment);
        loadPosts();
    }
}

function createPost() {

    const content =
        document.getElementById("content").value;

    if(!content) {
        alert("Write something first");
        return;
    }

    posts.unshift({
        username: "Jyothi",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
        content: content,
        likes: 0,
        comments: []
    });

    document.getElementById("content").value = "";

    loadPosts();
}

function loadPosts() {

    const postsDiv =
        document.getElementById("posts");

    postsDiv.innerHTML = "";

    posts.forEach((post,index) => {

        postsDiv.innerHTML += `

        <div class="post">

            <div class="post-header">

                <div class="avatar"></div>

                <div class="username">
                    ${post.username}
                </div>

            </div>

            <img
                src="${post.image}"
                style="
                    width:100%;
                    border-radius:10px;
                    margin-top:10px;
                "
            >

            <div class="post-content"
                 style="margin-top:10px">
                 ${post.content}
            </div>

            <div class="post-actions">

                <button
                    onclick="likePost(${index})">
                    ❤️ ${post.likes}
                </button>

                <button
                    onclick="commentPost(${index})">
                    💬 ${post.comments.length}
                </button>

                <button>
                    ➕ Follow
                </button>

            </div>

            <div style="margin-top:10px">

                ${post.comments.map(
                    c=>`<p>💬 ${c}</p>`
                ).join("")}

            </div>

        </div>

        `;
    });
}

loadPosts();
profile: "https://randomuser.me/api/portraits/women/44.jpg"
