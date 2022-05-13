function check_email(email) {
	var emailFilter=/^[_a-zA-Z0-9-]+(\.[_A-Za-z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
	var error = "";
	if (email == "" || !(emailFilter.test(email))) { 
		   return false;
	}
	return true;
}

function check_int(num) {
	var numFilter=/^\d+$/;
	var error = "";
	if (num == "" || !(numFilter.test(num))) { 
		   return false;
	}
	return true;
}

function check_isNumeric(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

function check_register_form(form_name)
{
	x = document.forms[form_name];
	val1 = x.real_name.value;
	val2 = x.email.value;
	val3 = x.password.value;
	val4 = x.code.value;
	
	error = 0;
	error_text = "";

	if(val1 == "" || val2 == "" || val3.length < 4 || val4 == "")
	{
		error_text = "أدخل كامل الحقول .. وكلمة مرور أكثر من ثلاث محارف";
		error=1;
	}
	else if(!check_email(val2))
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".register_error_message").html(error_text);
		return false;
	}
}

function check_personal_info_form(form_name)
{
	x = document.forms[form_name];
	//val1 = x.real_name.value;
	val2 = x.npassword.value;
	val3 = x.rpassword.value;
	val4 = x.code.value;
	
	error = 0;
	error_text = "";
		
	if(val4 == "")
	{
		error_text = "أدخل الحقول المطلوبة";
		error=1;
	} 
	else if(val2 != val3 || (val2.length != 0 && val3.length < 4))
	{
		error_text = "ادخل كلمتا مرور متطابقتين .. وكلمة مرور أكثر من ثلاث محارف";
		error=1;
	}
	if(error == 1)	
	{
		$(".personal_info_message").html(error_text);
		return false;
	}
}

function check_forget_pass_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.email.value;
	val2 = x.code.value;
	val3 = x.password.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3.length < 4)
	{
		error_text = "أدخل كامل الحقول .. وكلمة مرور أكبر من ثلاث محارف";
		error=1;
	} 
	else if(!check_email(val1))
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_callus_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.real_name.value;
	val2 = x.email.value;
	val3 = x.content.value;
	val4 = x.code.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3 == "" || val4 == "")
	{
		error_text = "كل الحقول مطلوبة";
		error=1;
	} 
	else if(!check_email(val2))
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_payment_form(form_name)
{
	x = document.forms[form_name];
	var val1 = document.getElementsByName("websites[]")[0].value;
	var val2 = x.member_sdate.value;
	var url_num = get_order_url_num();
	var all_url_num = get_all_order_url_num();

	error = 0;
	error_text = "";

    if(url_num != all_url_num){
        error_text = "أدخل روابط الصفحات الفارغة";
        error=1;
    }
	if(val1 == '')
	{
		error_text = "أدخل روابط الصفحات التي تريدها";
		error=1;
	}
	if(error == 1)
	{
		$(".payment_error_message").html(error_text);
		return false;
	}
	else {
		x.pay.disable; x.pay.style.setProperty('background-color','GrayText');
	}
}

function check_design_payment_form(form_name)
{
	/*x = document.forms[form_name];
	var val1 = document.getElementsByName("file")[0].value;

	error = 0;
	error_text = "";

	if(val1 == '')
	{
		error_text = "أدخل الملف المرفق من فضلك";
		error=1;
	}
	if(error == 1)
	{
		$(".payment_error_message").html(error_text);
		return false;
	}*/
    return true;
}

function check_manual_order_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.packages_id.value;
	val2 = x.quantity.value;
	//val3 = x.price.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "" || val1 == "-1" || val2 == "")
	{
		error_text = "كل الحقول مطلوبة";
		error=1;
	}
	else if(!check_int(val2))
	{
		error_text = "ادخل عدد زوار صحيح ";
		error=1;
	}	
	if(error == 1)	
	{
		$(".manual_order_message").html(error_text);
		return false;
	}
	else {
		x.pay.disable; x.pay.style.setProperty('background-color','GrayText');
	}
}

function check_charge_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.amount.value;
	val2 = x.ppmail.value;
	//val3 = x.less_charge.value;
	/*val1 = parseFloat(val1);
	val3 = parseFloat(val3);*/
	error = 0;
	error_text = "";
	//alert(val1+" "+val3);	
	if(val1 == "" || val2 == "")
	{
		error_text = "كل الحقول مطلوبة";
		error=1;
	}
	else if(!check_int(val1))
	{
		error_text = "ادخل مبلغ صحيح";
		error=1;
	}
	/*else if(parseInt(val1) < parseInt(val3))
	{
		error_text = "ادخل مبلغ صحيح";
		error=1;
	}*/
	else if(!check_email(val2))
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".charge_error_message").html(error_text+"<br><br>");
		return false;
	}
}

function charge_method_form(form_name)
{
	x = document.forms[form_name];
	val1 = x.amount.value;
	val2 = x.charge_info.value;

	error = 0;
	error_text = "";

	if(val1 == "" || val2 == "")
	{
		error_text = "أدخل الحقول المطلوبة";
		error=1;
	}
    else if(!check_isNumeric(val1)){
        error_text = "أدخل مجرد رقم في خانة المبلغ من فضلك";
        error=1;
    }

	if(error == 1)
	{
		$(".charge_error_message").html(error_text);
		return false;
	}
}

function check_charge_packages_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.charge_package.value;
	val2 = x.ppmail.value;

	error = 0;
	error_text = "";

	if(!check_int(val1))
	{
		error_text = "أختر باقة شحن";
		error=1;
	}
	else if(!check_email(val2) || val2 == "")
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".charge_packages_error_message").html(error_text+"<br><br>");
		return false;
	}
}

function check_login_form(form_name)
{
	x = document.forms[form_name];
	val1 = x.email.value;
	val2 = x.password.value;
	val3 = x.code.value;

	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3 == "")
	{
		error_text = "كل الحقول مطلوبة";
		error=1;
	} 
	if(error == 1)	
	{
		$(".login_message").html(error_text);
		return false;
	}
}

function check_login_auth_form(form_name)
{
    x = document.forms[form_name];
    val1 = x.code.value;

    error = 0;
    error_text = "";

    if(val1 == "")
    {
        error_text = "أدخل كود تسجيل الدخول";
        error=1;
    }
    if(error == 1)
    {
        $(".login_message").html(error_text);
        return false;
    }
}

function check_add_ticket_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.title.value;
	val2 = x.content.value;
	val3 = x.code.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3 == "")
	{
		error_text = "ادخل الحقول المطلوبة";
		error=1;
	} 
	if(error == 1)	
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_visitor_add_ticket_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.title.value;
	val2 = x.content.value;
	val3 = x.email.value;
	val4 = x.code.value;

	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3 == "" || val4 == "")
	{
		error_text = "ادخل الحقول المطلوبة";
		error=1;
	} 
	else if(!check_email(val3))
	{
		error_text = "ادخل بريد الكتروني صحيح";
		error=1;
	}	
	if(error == 1)	
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_add_order_ticket_form(form_name)
{
	x = document.forms[form_name];
	val1 = x.content.value;

	error = 0;
	error_text = "";

	if(val1 == "")
	{
		error_text = "ادخل الحقول المطلوبة";
		error=1;
	}
	if(error == 1)
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_add_replay_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.content.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "")
	{
		error_text = "ادخل الحقول المطلوبة";
		error=1;
	} 
	if(error == 1)	
	{
		$(".error_message").html(error_text);
		return false;
	}
}

function check_free_test_form(form_name)
{	
	x = document.forms[form_name];
	val1 = x.websites.value;
	
	error = 0;
	error_text = "";
		
	if(val1 == "" || val2 == "" || val3 == "")
	{
		error_text = "أدخل رابط الموقع";
		error=1;
	} 
	if(error == 1)	
	{
		$(".free_test_message").html(error_text);
		return false;
	}
}