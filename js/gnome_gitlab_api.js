console.log("gnome_gitlab_api loaded");
$(document).ready(function() {
  let users = [];
  let repos = [];

  $(".repobtn[provider='gnome-gitlab']").each(function () {
    var user = $(this).attr('user');
    var repo = $(this).attr('repo');
    repos.push(user + '/' + repo);
    if (users.indexOf(user) === -1) {
      users.push(user);
    }
  });

  for (let i = 0; i < repos.length; i++) {
    let projectPath = encodeURIComponent(repos[i]); // GitLab requires URL-encoded paths
    $.ajax({
      type: "GET",
      url: "https://gitlab.gnome.org/api/v4/projects/" + projectPath,
      dataType: "json",
      success: function(data) {
        let x = data.name;
        $("div[repo='" + x + "']").find("span[class='star']").html("&nbsp;" + data.star_count);
        $("div[repo='" + x + "']").find("span[class='fork']").html("&nbsp;" + data.forks_count);
        $("div[repo='" + x + "']").find("span[class='watchers']").html("&nbsp;—"); // GitLab does not have watchers
        $("div[repotext='" + x + "']").find("span[class='desc']").html(data.description);
      }
    });
  }
});