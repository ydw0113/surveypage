Survey
  .StylesManager
  .applyTheme("default");


function getParams() {
  var url = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  var result = {};
  url.forEach(function(item) {
    var param = item.split("=");
    result[param[0]] = param[1];
  });
  return result;
}

function init() {
  Survey.dxSurveyService.serviceUrl = "";

  var css = {
    root: "sv_main sv_frame sv_default_css"
  };

  var surveyId = decodeURI(getParams()["id"]);
  var model = new Survey.Model({
    surveyId: surveyId,
    surveyPostId: surveyId
  });
  model.css = css;
  window.survey = model;
  model.locale="ko";
  model.showProgressBar="bottom";
  model.render("surveyElement");

  model.onComplete.add(function(result) {

    var q1 = result.data.q1;
    var q2 = result.data.q2[0];

  });

  function animate(animitionType, duration) {
      if (!duration)
          duration = 1000;
      var element = document.getElementById("surveyElement");
      $(element).velocity(animitionType, {duration: duration});
  }

  var doAnimantion = true;

  model
      .onCurrentPageChanged
      .add(function (sender) {
          animate("fadeIn", 500,);
      });
  model
      .onCompleting
      .add(function (sender, options) {
          if (!doAnimantion)
              return;
          options.allowComplete = false;
          setTimeout(function () {
              doAnimantion = false;
              sender.doComplete();
              doAnimantion = true;
          }, 500);
          animate("slideUp", 500);
      });
  animate("slideDown", 1000);
}

init();
