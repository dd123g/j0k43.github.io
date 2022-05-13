var note_ring = 0;
$(document).ready(function() {
    //alert(height);
    var counters_sum = parseInt($("#counters_sum").val());
    var counter_increase = parseInt($("#counter_increase").val());
    var counter_value = counters_sum + counter_increase;
    play();
    function play(){
        timer = setInterval(function () {
            $("#counter").html(formatNumber(counter_value));
            counter_value += counter_increase;
        },1000);
    }

    get_notifications();

});

function add_url() {

    var url_num = get_all_order_url_num();
    var url_num_real = get_order_url_num();
    //alert(url_num);
    if(url_num_real != url_num) {
        $("#links_msg").text("هنالك حقول فارغة املاها قبل اضافة حقل جديد");
        return;
    }
    var result = fill_order_data('', 4);
    if (result) {

        if (url_num == 0) url_num = 1;
        var next_url_id = url_num + 1;
        for(var i=1; i<=url_num; i++) {
            $("#add_url" + i).hide();
            $("#remove_url" + i).hide();
        }
        $("#AddendUrl").append(
            '<div class="form-row" id="row' + next_url_id + '">' +
            '<div class="form-group col-md-9 clone" id="adedUrl">' +
            '<label for="url">إضافة رابط</label>' +
            '<input name="websites[]" type="url" class="form-control url" id="url' + next_url_id + '" maxlength="200" onkeyup="javascript:fill_order_data(this.value,1)">' +
            '</div>' +
            '<div class="form-group col-md-3" id="url_content' + next_url_id + '">' +
            '<a class="add_url btn btn-secondary" id="remove_url' + next_url_id + '" onClick="javascript:remove_url(' + next_url_id + ')" style="float: right">-</a>'+
            '<a class="add_url btn btn-secondary" id="add_url' + next_url_id + '" onClick="javascript:add_url()" style="float: right; margin-right: 10px;">+</a>' +
            '</div>' +
            '</div>'
        );
    }
    else
        $("#links_msg").text("عذرا لايمكنك اضافة رابط ضمن عدد الايام المختار");
};

function remove_url(num) {

    var url_num = get_all_order_url_num();
    var prev_num = url_num - 1;
    if (url_num == 1) return;

    $("#row" + num).remove();
    $("#add_url" + prev_num).show();
    $("#remove_url" + prev_num).show();
    fill_order_data('', 5);
};

function fill_order_data(val,type) {
    //alert(type);
    /*
    1 : change start date
    2 : first time call
    3 : change end date
    4 : add url
    5 : remove url
    */
    $("#links_msg").text("");
    var curr_days_num = $("#days").val();
    var less_visitors_per_day = $("#visitors_per_day").val();
    var capacity_per_day = $("#capacity_per_day").val();
    var less_capacity_per_day = $("#less_capacity_per_day").val();
    var capacity_per_link = $("#capacity_per_link").val();
    var visitors_num = $("#visitors_num").val();
    var date_start = ($("#date_start").val()).replace(/\//g, '-');
    var visitors_per_day_per_url = visitors_num;
    var visitors_per_day = visitors_num;
    var error = false;
    //alert(less_visitors_per_day +" "+capacity_per_day);
    if (less_visitors_per_day == 0 && capacity_per_day == 0)
        return;

    if(parseInt(capacity_per_day) == 0 || parseInt(visitors_num) <= parseInt(capacity_per_day)){
        capacity_per_day = visitors_num;
    }

    if(parseInt(less_capacity_per_day) == 0){
        less_capacity_per_day = less_visitors_per_day;
    }

    var url_num = get_order_url_num();
    if (url_num == 0) url_num = 1;
    if (type == 4) url_num++;

    if(type != 3) {

        var date_end_info = get_end_date_info(date_start, visitors_num, less_visitors_per_day, capacity_per_day, less_capacity_per_day, capacity_per_link, url_num);
        if (date_end_info[0].length == 0)
            return false;
        //alert($("#date_end").val());
        fill_end_date_options(date_end_info[0],$("#date_end").val());
    }

    var date_end_current = ($("#date_end").val()).replace(/\//g, '-');
    if(type == 2 && curr_days_num != "")
        var days_num = curr_days_num;
    else
        var days_num = get_days_between(date_start,date_end_current) + 1;


    if(parseInt(visitors_num) <  parseInt(capacity_per_day)) {
        visitors_per_day_per_url = capacity_per_day;
        visitors_per_day = capacity_per_day * url_num;
    }
    else {
        visitors_per_day_per_url = Math.ceil(Math.floor(visitors_num / url_num) / days_num);
        visitors_per_day = Math.ceil(visitors_num / days_num);
    }

    if(type == 4 && (Math.ceil(visitors_num / url_num) < less_visitors_per_day || visitors_num < visitors_per_day)) {
        error = true;
    }

    if(less_capacity_per_day != 0 && days_num != 1) {
        if (type == 4 && parseInt(capacity_per_link) != 0 && visitors_per_day_per_url < less_capacity_per_day)
            error = true;
        //alert(visitors_per_day_per_url);
        if (type == 4 && parseInt(capacity_per_link) == 0 && visitors_per_day < less_capacity_per_day)
            error = true;
    }

    if(error) {
        var date_end_info = get_end_date_info(date_start, visitors_num, less_visitors_per_day, capacity_per_day, less_capacity_per_day, capacity_per_link, (url_num-1));
        if (date_end_info[0].length == 0)
            return false;
        fill_end_date_options(date_end_info[0],"");
        return false;
    }

    $("#days").val(days_num);
    $("#daily_num").val(visitors_per_day_per_url);
    $("#all_daily_num").val(visitors_per_day);

    return true;
    //alert(visitors_per_day + " "+ url_num+" "+visitors_num);
}

function fill_end_date_options(date_end_arr, curr){

    var i;
    var arr_length = date_end_arr.length;
    $('#date_end').empty();

    for (i = 0; i < arr_length; i++) {
        if (date_end_arr[i] == curr)
            $('#date_end').append('<option selected value="' + date_end_arr[i] + '">' + date_end_arr[i] + '</option>');
        else
            $('#date_end').append('<option value="' + date_end_arr[i] + '">' + date_end_arr[i] + '</option>');
    }

}

function get_end_date_info(start_date , visitors_num, less_visitors, capacity_per_day, less_capacity_per_day, capacity_per_link, url_num) {

    //alert(days_num);
    var result_arr = new Array();
    var end_date_arr = new Array();

    var start = new Date(start_date);
    var end_date = new Date(start);
    //end_date.setDate(end_date.getDate() + parseInt(days_num - 2));

    //alert('aaa');
    if(parseInt(capacity_per_link) != 0) {
        var start_days_num = Math.ceil((visitors_num) / (capacity_per_day * url_num));
    }
    else {
        var start_days_num = capacity_per_day % visitors_num;
        //alert(start_days_num);
        if (start_days_num == 0 && parseInt(visitors_num) >= parseInt(capacity_per_day)) {
            start_days_num = visitors_num / capacity_per_day;
        }
        else if (parseInt(visitors_num) >= parseInt(capacity_per_day)) {
            start_days_num = Math.ceil(visitors_num / capacity_per_day);
        }
    }

    if (start_days_num == 0)
        start_days_num = 1;
    //alert(start_days_num+" "+url_num);
    var days_num = start_days_num;

    var visitors_per_day = Math.ceil(visitors_num  / days_num);
    if(parseInt(capacity_per_link) != 0)
        visitors_per_day = Math.ceil(Math.ceil(visitors_num / (days_num)) / url_num);

    if(days_num != 1 && visitors_per_day && parseInt(visitors_per_day) < parseInt(less_capacity_per_day)) {
        while (parseInt(visitors_per_day) < parseInt(less_capacity_per_day)) {
            start_days_num = start_days_num - 1;
            visitors_per_day = Math.ceil(visitors_num / start_days_num);
            if (parseInt(capacity_per_link) != 0)
                visitors_per_day = Math.ceil(Math.ceil(visitors_num / start_days_num) / url_num);
            //alert(visitors_per_day+" "+start_days_num);
        }
    }

    //alert(visitors_per_day+" "+start_days_num);

    if (start_days_num != 1) {
        end_date.setDate(end_date.getDate() + parseInt(start_days_num - 1));
    }

    //alert(end_date);
    end_date_arr.push(date_to_YMD(new Date(end_date)));


    if(parseInt(less_capacity_per_day) != parseInt(capacity_per_day)) {
        while (parseInt(visitors_per_day) >= parseInt(less_capacity_per_day)) {

            end_date.setDate(end_date.getDate() + parseInt(1));
            days_num = get_days_between(start, end_date) + 1;
            if(parseInt(capacity_per_link) == 0)
                visitors_per_day = Math.ceil(visitors_num / days_num);
            else
                visitors_per_day = Math.ceil(Math.ceil(visitors_num / days_num) / url_num);

            end_date_arr.push(date_to_YMD(new Date(end_date)));
        }
        if (end_date_arr.length > 1)
            end_date_arr.pop(end_date_arr.length - 1);
    }

    //alert(visitors_per_day_per_url +" "+end_date);
    //end_date.setDate(end_date.getDate() - parseInt(1));
    //alert(visitors_per_day_per_url +" "+end_date);
    var dd = end_date.getDate();
    var mm = end_date.getMonth() + 1;
    var y = end_date.getFullYear();

    var end_date = y + '-' + mm + '-' + dd;
    //alert(end_date);
    result_arr[0] = end_date_arr;
    result_arr[1] = end_date;
    return result_arr;
}

function get_date_array(start, end) {

    var arr = new Array();
    var dt = new Date(start);
    var de = new Date(end);

    while (dt < de) {
        arr.push(date_to_YMD(new Date(dt)));
        dt.setDate(dt.getDate() + parseInt(1));
    }
    arr.push(date_to_YMD(new Date(dt)));
    return arr;
}

function get_days_between(start, end) {

    var start_date = new Date(start);
    var end_date =   new Date(end);

    var oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    var start = Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
    var end = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());

    // so it's safe to divide by 24 hours
    var days = (start - end) / oneDay;
    //alert(ndays);

    return days;
}

function get_order_url_num(){

    var element = document.querySelectorAll('.url');
    var i;
    var url_num = 0;
    for (i = 0; i < element.length; i++) {
        if(element.item(i).value.trim() != '')
            url_num++;
    }
    return url_num;
}

function get_all_order_url_num(){

    var element = document.querySelectorAll('.url');
    var i;
    var url_num = 0;
    for (i = 0; i < element.length; i++) {
        url_num++;
    }
    return url_num;
}

function date_to_YMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '/' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
}

function get_notifications() {

    var url = "ajax/get_notifications";
    var old_notes_num = parseInt($("#notes_num").text());
    var timerID = setInterval(function() {
        old_notes_num = parseInt($("#notes_num").text());
        $.ajax({
            "type":"POST",
            "url":url,
            "data":{action:"get_notifications"},
            "success":function(data){
                //alert(data+" "+old_notes_num+" "+note_ring);
                if(parseInt(data) > 0 && (parseInt(data) != parseInt(old_notes_num) || note_ring == 0)) {
                    //alert('aaa');
                    $('#notes_num').text(data);
                    var $audio = new Audio('style/sounds/note.mp3');
                    $audio.volume = 0.3;
                    $audio.play();
                    note_ring = 1;
                    if(parseInt(data) != parseInt(old_notes_num))
                        $("#notes_num").text(data);
                }
                else if(data == -1){
                    clearInterval(timerID);
                }
            }/*,
            "error":function(data){
                alert("An error has occurred");
                window.location.reload();
            }*/
        });

    }, 60 * 1000);
}

function formatNumber(number) {

    var number = number.toFixed(0) + '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function show_info(num){
    //alert(num);
    if ($("#info"+num).hasClass('active')){
        //alert(num);
        $("#info"+num).slideUp('slow');
        $("#info"+num).removeClass('active');
    }
    else {
        $(".desc-MonOper").hide();
        $(".desc-MonOper").removeClass('active');
        $("#info"+num).slideDown('slow');
        $("#info"+num).addClass('active');
    }
}

function get_spackages(package_id){
    $(".mainL").removeClass('active');
    $("#mainL"+package_id).addClass('active');
    $(".sp_main").hide();
    $(".sp_main"+package_id).fadeIn(800,'linear');
}

function get_mpackages(){

    var main_package_id = $("#main_packages_id").val();
    var packages = $("#main"+main_package_id).val();
    //alert(packages);
    var options = "<option value='-1'>----- أختر -----</option>";
    var packages_arr = packages.split(',');
    for(i = 0; i < packages_arr.length; i++){
        var id_title_arr = packages_arr[i].split(':');
        options += "<option value='"+id_title_arr[0]+"'>"+id_title_arr[1]+"</option>";
    }
    $("#packages_id").html(options);
    //$(".mp_main").css("display", "none");
    //$(".mp_main"+package_id).css("display", "block");
}

function calc_price(){
    var url = "ajax/calc_price";
    var package_id = $("#packages_id").val();
    var quantity = $("#quantity").val();
    var objRegExp  = /(^-?\d\d*$)/;

    if(package_id != -1 && objRegExp.test(quantity)) {
        $.ajax({
            "type":"POST",
            "url":url,
            "data":{action:"calc_price",id:package_id,quantity:quantity},
            "success":function(data){
                $("#price").val(data);
            },
            "error":function(data){
                alert("An error has occurred");
                window.location.reload();
            }
        });
    }
    else {
        if((package_id == -1 && !objRegExp.test(quantity)) && quantity.length > 1) {
            $("#price").val("");
            if((!objRegExp.test(quantity)) && quantity.length > 1)
                alert("ادخل عدد زوار صحيح");
        }
    }
}

function get_vn_info(){
    var url = "ajax/get_vn_info";
    var package_id = $("#packages_id").val();

    if(package_id != -1) {
        $.ajax({
            "type":"POST",
            "url":url,
            "data":{action:"get_vn_info",id:package_id},
            "success":function(data){
                $(".manual_order_message").html(data);
            },
            "error":function(data){
                alert("An error has occurred");
                window.location.reload();
            }
        });
    }
    else {
        $(".manual_order_message").html("أختر الباقة التي تريد شرائها");
    }
}

function get_mp_options(){
    var url = "ajax/get_mp_options";
    var package_id = $("#main_packages_id").val();
    $("#packages_id").html("");

        $.ajax({
            "type":"POST",
            "url":url,
            "data":{action:"get_mp_options",id:package_id},
            "success":function(data){
                $("#packages_id").html(data);
            },
            "error":function(data){
                alert("An error has occurred");
                window.location.reload();
            }
        });
}

function get_card_price(old_price,package_id,package_quantity){
    var url = "ajax/get_card_price";
    var card_num = $(".card_num").val();
    if(card_num == '')
        return;
    $(".card_num").attr('readonly','readonly');
    $("#load_img").show();
    //alert(old_price+" "+package_id+" "+package_quantity+" "+card_num);
    if(old_price != 0 && old_price != "") {
        $.ajax({
            "type":"POST",
            "url":url,
            "data":{action:"calc_card_price",card_num:card_num,old_price:old_price,package_id:package_id,package_quantity:package_quantity},
            "success":function(t){
                $("#load_img").hide();
                $(".card_num").removeAttr('readonly');
                $("#card_price").html(t);
            },
            "error":function(data){
                alert("An error has occurred");
                window.location.reload();
            }
        });
    }
    else {
        //$("#card_link").show();
        $("#load_img").hide();
    }
}

function get_orders(num){
    //alert(num);
    $(".list-inline-item").removeClass("active-color");
    $("#btn"+num).addClass("active-color");
    if(num == 0) {
        $(".state").fadeIn('slow');
        return;
    }
    $(".state").hide();
    $(".state"+num).fadeIn('slow');
}

function get_orders_new(num){
    $(".btn").removeClass("active");
    $("#btn"+num).addClass("active");
    $(".state").hide();
    if($("#orders_state"+num+"_num").val() != 0)
        $(".state"+num).fadeIn('slow');
    else
        $(".state0").fadeIn('slow');
}

function calc_charge_fee(fee,less_charge){
    var amount = $("#amount").val();
    var fee_value = "0$";
    if(parseInt(amount) < parseInt(less_charge) && parseInt(amount) > 0) {
        fee_value = ((parseInt(amount)*parseInt(fee))/100)  + 0.5;
        fee_value += "$";
    }
    $("#charge_fee_value").text(fee_value);
}

function hide_closed_tickets(){
    if ($("#hide_btn").hasClass('hide')){
        $("#hide_btn").text("اظهار التذاكر المغلقة").removeClass('hide');
        $(".closed_ticket").fadeOut('slow');
    }
    else {
        $("#hide_btn").text("اخفاء التذاكر المغلقة").addClass('hide');
        $(".closed_ticket").fadeIn('slow');
    }
}

function add_design_price(input,value,type,id){
    var old_price = $("#design_price").text();
    var free_num = 0;
    var checked_num = 1;
    var price_text = '';
    var li_new_id = 'li' + id;
    var li_price_new_id = 'li' + id;
    var  li_price_class = '';
    if(type == 1){
        free_num = parseInt($("#free_suffixes_num").val());
        checked_num = parseInt($("#suffixes_checked").val());
        price_text = 'اللاحقة '+ $("#ext"+id).text();
        li_new_id = 'li_ext' + id;
        li_price_new_id = 'li_price_ext' + id;
        li_price_class = 'li_price_ext';
    }
    else if(type == 2){
        free_num = parseInt($("#free_sizes_num").val());
        checked_num = parseInt($("#sizes_checked").val());
        price_text = 'مقاس '+ $("#size"+id).text();
        li_new_id = 'li_size' + id;
        li_price_new_id = 'li_price_size' + id;
        li_price_class = 'li_price_size';
    }
    else if(type == 3){
        price_text = $("#offer"+id).text();
        li_new_id = 'li_offer' + id;
        li_price_new_id = 'li_price_offer' + id;
        li_price_class = 'li_price_offer';
    }
    //alert(free_num+" "+checked_num+" "+price_text)
    if($(input).is(':checked')){
        checked_num = checked_num + 1;
        if(checked_num > free_num) {
            $("#design_price").text(parseFloat(old_price) + parseFloat(value) + '$');
        }
        else value = 0;

        $("#price_block").append('<li id="'+li_price_new_id+'" class="list-group-item">'+price_text+' <span id="'+li_price_new_id+'" class="float-right '+li_price_class+'" style="color: #990000">' + ' '+parseFloat(value)+'$ </span> </li>');
    }
    else {
        checked_num = checked_num - 1;
        if(checked_num >= free_num) {
            $("#design_price").text(parseFloat(old_price) - parseFloat(value) + '$');
        }
        else {
            value = 0;
        }

        if(checked_num <= free_num && type != 3) {
            $("."+li_price_class).text("0$");
        }

        $("#"+li_price_new_id).remove();
    }

    //alert(free_num+" "+checked_num)
    if(type == 1){
        $("#suffixes_checked").val(checked_num);
    }
    if(type == 2){
        $("#sizes_checked").val(checked_num);
    }
}

function smooth_goto(to){
    $('html, body').animate({scrollTop: $("#"+to).offset().top - 50}, 1000);
}

function show_dorders_comments(type){
    if(type == 1){
        $("#add_comments_block").show();
        $("#receipt_block").hide();
        $("#receipt_done").hide();
    }
    else if(type == 2){
        $("#add_comments_block").hide();
        $("#receipt_block").hide();
        $("#receipt_done").show();
    }
}
