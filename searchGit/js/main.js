$(document).ready(() => {
    $('#searchUser').on('keyup', (e) => {
        let username = e.target.value;

        fetch('https://api.github.com/users/' + username)
        .then((res) => res.json())
        .then((user) => {
            $('#profile').html(`
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${user.name}</h4>
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                          <img class="card-img-top" src="${user.avatar_url}" alt="Card   image cap">
                          <a href="${user.html_url}" class="btn btn-primary btn-block" id="visitBtn" target="_blank">Visit Profile</a>
                        </div>
                        <div class="col-md-9">
                          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                          <span class="badge badge-success">Public Gists: ${user.public_gists}</span>
                          <span class="badge badge-info"> Followers: ${user.followers}</span>
                          <span class="badge badge-dark">Following: ${user.following}</span>
                          <br><br>
                          <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                            
                          </ul>
                        </div>
                    </div>
                
                </div>
          </div>
          <br>
          <h3 id="repoTitle" class="text-primary">Repos</h3>
          <div id="repos"></div>  

            `);
            console.log(user)

            return fetch('https://api.github.com/users/' + username + '/repos')
            .then((res) => res.json())
            .then((repos) => {
                $.each(repos, (index, repo) =>{
                    $('#repos').append(`
                        <div class="card" id="repoCard">
                            <div class="row">
                                <div class="col-md-7" id="repoText">
                                    <p><strong>${repo.name}</strong>: ${repo.description}</p>
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-info">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" class="btn btn-primary btn-block align-middle" id="visitBtn" target="_blank">Visit Repo</a>
                                </div>
                            </div>
                        </div>
                    `);

                })
            })

           

        })
    })

})