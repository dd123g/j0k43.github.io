$(function () {

    $("#main_packages_id").on("change", function(e){

        var main_id =  $(this).val();
        //alert(main_id);
        var options = "<option value='-1'>----- أختر -----</option>";
        if($("#main" + main_id).val()) {
            var packages = $("#main" + main_id).val();
            //alert(packages);
            var packages_arr = packages.split(',');
            for (i = 0; i < packages_arr.length; i++) {
                var id_title_arr = packages_arr[i].split(':');
                options += "<option value='" + id_title_arr[0] + "'>" + id_title_arr[1] + "</option>";
            }
        }
        $("#packages_id").html(options);
    })


//  Show Add Input

// counter ads custoer
$('.count').each(function() {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 8000,
    easing: 'swing',
    step: function(now) {
      $(this).text(Math.ceil(now));
    }
  });
});

// toggel clasaa
$("#show-desc").click(function(){
  $(".active-tow").hide(),
  $(".active-three").hide(),
  $(".active-one").slideToggle();

})

$("#show-desc2").click(function(){
  $(".active-one").hide(),
  $(".active-three").hide(),
  $(".active-tow").slideToggle();
})

$("#show-desc3").click(function(){
  $(".active-one").hide(),
  $(".active-tow").hide(),  
  $(".active-three").slideToggle();
})


// delate animate css in mobile screen
  var winW = $( window ).width();

  if (winW <= 768) {

    $("link[href*='animate']").attr("href","#"),
    $("script[src*='wow']").attr("src","#");

  }


})