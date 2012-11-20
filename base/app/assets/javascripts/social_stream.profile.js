//= require jquery.fcbkcomplete

SocialStream.Profile = (function(SS, $, undefined){
	var showCallbacks = [];

	var addShowCallback = function(callback){
		showCallbacks.push(callback);
	};

	var show = function(options){
		$.each(showCallbacks, function(i, callback){ callback(options); });
	};

  var initEditButtons = function(options) {
    $("#profile-info .update").hide();

    $("#profile-info .edit_icon a[href=#]").click(function(){
      $("#profile-info .update").hide();

      var section = $(this).closest('.section');
      section.find('.briefing').hide('slow');
      section.find('.update').show('slow');
    });
  };

  var initTagsForm = function(options){
    if (options.tags === undefined)
      return;

    $('#profile_tag_list').fcbkcomplete({
      json_url: options.tags.path,
      cache: false,
      filter_case: true,
      filter_hide: true,
      newel: false,
      height: 6
    });

    $.each(options.tags.present, function(i, tag) {
      $('#profile_tag_list').trigger("addItem", { title: tag, value: tag });
    });
  };

  addShowCallback(initEditButtons);
  addShowCallback(initTagsForm);

  return {
    show: show
  };

})(SocialStream, jQuery);
