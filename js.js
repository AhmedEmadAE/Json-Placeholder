function getPosts(userId) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=" + userId);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let posts = request.response;
            document.getElementById("posts").innerHTML = "";
            if (posts.length === 0) {
                document.getElementById("posts").innerHTML = `
                    <div class="empty-state rounded-3 p-5 text-center">
                        <h3 class="fs-5 fw-medium text-gray-300">No posts available for this user</h3>
                    </div>
                `;
            } else {
                for (post of posts) {
                    let content = `
                        <div id="post" class="post-card rounded-3 p-4 shadow-md">
                            <h3 class="fs-5 fw-medium text-white mb-1">${post.title}</h3>
                            <h4 class="fs-6 text-gray-300">${post.body}</h4>
                        </div>
                    `;
                    document.getElementById("posts").innerHTML += content;
                }
            }
        } else {
            document.getElementById("posts").innerHTML = `
                <div class="empty-state rounded-3 p-5 text-center">
                    <h3 class="fs-5 fw-medium text-gray-300">Error fetching posts</h3>
                </div>
            `;
        }
    };
}

function getUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let users = request.response;
            document.getElementById("users").innerHTML = "";
            for (user of users) {
                let content = `
                    <div id="user" class="user-card rounded-3 p-4 cursor-pointer shadow-lg d-flex align-items-center gap-3" onclick="userClicked(${user.id}, this)">
                        <i class="bi bi-person-circle fs-3 text-gray-300"></i>
                        <div>
                            <h3 class="fs-5 fw-semibold text-white mb-1">${user.name}</h3>
                            <h4 class="fs-6 text-gray-400">${user.email}</h4>
                        </div>
                    </div>
                `;
                document.getElementById("users").innerHTML += content;
            }
        } else {
            document.getElementById("users").innerHTML = `
                <div class="empty-state rounded-3 p-5 text-center">
                    <h3 class="fs-5 fw-medium text-gray-300">Error fetching users</h3>
                </div>
            `;
        }
    };
}

function userClicked(id, el) {
    getPosts(id);
    let selectedElements = document.getElementsByClassName("selected");
    for (element of selectedElements) {
        element.classList.remove("selected");
    }
    el.classList.add("selected");
}

getUsers();