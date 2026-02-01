console.log("codeberg_api loaded");

$(document).ready(function () {
  $(".repobtn[provider='codeberg']").each(function () {

    var user = $(this).attr("user");
    var repo = $(this).attr("repo");
    var $el = $(this);

    $.ajax({
      type: "GET",
      url: "https://codeberg.org/api/v1/repos/" + user + "/" + repo,
      dataType: "json",
      success: function (data) {
        $el.find("span.star").html("&nbsp;" + data.stars_count);
        $el.find("span.fork").html("&nbsp;" + data.forks_count);
        // Codeberg has no watchers (Gitea doesn't expose it meaningfully)
        $el.find("span.watchers").html("&nbsp;—");
        $("div[repotext='" + repo + "']").find("span.desc").html(data.description);
      }
    });

  });
});
