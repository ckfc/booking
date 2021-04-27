  


function chkbox_liststr(tmpobj, room_para, tdate_str, userid, admin) {
  var output = "";
  var cnt = 1;
  var hiddenstr = "(hidden remark)";
  for (var c in tmpobj) {

                var q = tmpobj[c];                
                key = room_para + cnt;
                cnt=cnt+1; 
                var remarkcontent = '';
                if (q[3] == '')
                  remarkcontent = '';
                else if (q[3] == hiddenstr) {
                  remarkcontent = '<label class="booklabel">'  + q[3] + '</label>';
                }
                else { 
                  remarkcontent = '<textarea class="tremark" style="fontSize:6px;"  rows="4" cols="30" readonly>'  + q[3] + '</textarea>';
                
                }    
                if ((userid == (q[2])) || (admin.length > 0)) {
                  output += '<input type="checkbox"  style="vertical-align:middle" name="cancelchk" id="' + key + '" value="' + tdate_str+ ',' + q[0]+ ',' + q[1]+ ','+q[2] + '"/>' +
                            '<label for="' + key + '"  style="vertical-align:sub">' + q[1] + '</label><label class="booklabel"  style="vertical-align:sub">' + q[2] + '</label>' + remarkcontent + '<br>' ;

                }    
                else {
                  output += '<label for="' + key + '"  style="vertical-align:sub">' + q[1] + '</label><label class="booklabel"  style="vertical-align:sub">' + q[2] + '</label>' + remarkcontent + '<br>' ;

                }        

                  }

   
   


  return output ;
}

$(document).ready(function(){

$("#querybooking").click(function(){   
var t0018_server_display_booking = "https://script.google.com/macros/s/AKfycbw7ZelHl9uwIggm1LJ6TmnxkCFUNQfADcjXqQXYQgdPpJ3EZh9KkLbVNSHfc5xYkZor/exec"
$.ajax({
    url: t0018_server_display_booking,

    data: {
        "tmpdate": $('#tmpdate').val(),
        "userid":$('#userid').val(),
        "userpw":$('#userpw').val(),
        //"tmpdate": "2021-03-02" ,
    },
    success: function(response) {

    $('#r11m_div').empty(); 	
    $('#r11m_div').empty(); 		
    $('#r11b_div').empty(); 	
    $('#r25i_div').empty(); 	
    $('#r25m_div').empty(); 	
    $('#r25c_div').empty(); 	
	
	
	
    try {
        var display_msg_status = false;      
        var obj = JSON.parse(response);  //[["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"],["11m","03:30pm-04:00pm","mary","mary job"]]
        var cnt = 1;
        var tmp_chkbox_content = "";
        var tmp_date_str = "";
        var userid = "";
        var admin = "";
		var tmp_link = "";
       
        for (var b in obj) {   //test     //["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"]
          //$('#testspan').text(b);
          

          if (b=='error') {
            if (!display_msg_status) {
            $('#snackbar').text(obj[b]);
            show_my_msg();
            display_msg_status = true;
            }
			alert(obj[b])
          }

          if (b=='userid') {
            userid = obj[b];
          }          

          if (b=='admin') {
            admin = obj[b];
            $('#admin').text(admin);

          }          


          if (b=='date') {
            $('#testspan').text(obj[b]);
            tmp_date_str = obj[b];
          }
		  
          if (b=='link') {
			tmp_link = obj[b];          
			tmp_link = "<a href='" + tmp_link + "'  target='_blank'>請按這裏觀看" + tmp_date_str + "時間表</a>"
			
			 target="_blank"
			
            $('#link_div').html(tmp_link);

          }          
		  

          if (b == '11m') {   
            tmp_chkbox_content = chkbox_liststr(obj[b], '11m', tmp_date_str, userid, admin);
			$('#r11m_div').html(tmp_chkbox_content);
          }  
          else if (b == '11b') {  
            tmp_chkbox_content = chkbox_liststr(obj[b], '11b', tmp_date_str, userid, admin);
            $('#r11b_div').html(tmp_chkbox_content);
          }  
          else if (b == '25i') {
            tmp_chkbox_content = chkbox_liststr(obj[b], '25i', tmp_date_str, userid, admin);
            $('#r25i_div').html(tmp_chkbox_content);
          }  

          else if (b == '25m') {
            tmp_chkbox_content = chkbox_liststr(obj[b], '25m', tmp_date_str, userid, admin);
            $('#r25m_div').html(tmp_chkbox_content);
          }  

          else if (b == '25c') {  
            tmp_chkbox_content = chkbox_liststr(obj[b], '25c', tmp_date_str, userid, admin);
            $('#r25c_div').html(tmp_chkbox_content);
          }  
         }
              
        if (!display_msg_status) {
            $('#snackbar').text('Ok....');
            show_my_msg();
            display_msg_status = true;
        }



    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }


    },
    error: function(){alert("Fail！")}
  });


  });


//--------------------------------






















$("#bookcancel").click(function(){   

var t0018_server_cancel = "https://script.google.com/macros/s/AKfycbyUGg0a8Iu7kpOnUjlx74AHHuqB50gUWFuqUBiAh0v8_sk6VhC72j0rdy60OFdZDwS7qQ/exec"

         var array = []; 
         $("input:checkbox[name=cancelchk]:checked").each(function() { 
             array.push($(this).val()); 
         }); 
         var tmpcancel = array.join('[,]');


// imp1
$.ajax({
    url: t0018_server_cancel,

    data: {

        //    var array = []; 
        //    $("input:checkbox[name=cancelchk]:checked").each(function() { 
        //       array.push($(this).val()); 
        //    }); 
            "tmpcancel" : tmpcancel,
            "userid":$('#userid').val(),
            "userpw":$('#userpw').val(),


       // "tmpdate": $('#tmpdate').val(),
    },
    success: function(response) {
    try {
        var display_msg_status = false;      
        var obj = JSON.parse(response);  //[["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"],["11m","03:30pm-04:00pm","mary","mary job"]]

        var cnt = 1;
        var tmp_chkbox_content = "";
        var tmp_date_str = "";
        var userid = "";
        var admin = "";
        for (var b in obj) {   //test     //["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"]

          if (b=='error') {
            if (!display_msg_status) {
            $('#snackbar').text(obj[b]);

            alert(obj[b]);

            }
          }

          if (b=='date') {
            $('#testspan').text(obj[b]);
            tmp_date_str = obj[b];
          }

          if (b=='admin') {
            admin = obj[b];
            $('#admin').text(admin);
          }          

          if (b=='link') {
			tmp_link = obj[b];          
			tmp_link = "<a href='" + tmp_link + "'  target='_blank'>請按這裏觀看" + tmp_date_str + "時間表</a>"
			
			 target="_blank"
			
            $('#link_div').html(tmp_link);
          }          
		  
		  
          if (b=='userid') {
            userid = obj[b];
          }          

          if (b == '11m') {   
            tmp_chkbox_content = chkbox_liststr(obj[b], '11m', tmp_date_str, userid, admin);
            $('#r11m_div').html(tmp_chkbox_content);
          }  
          else if (b == '11b') {  
            tmp_chkbox_content = chkbox_liststr(obj[b], '11b', tmp_date_str, userid, admin);
            $('#r11b_div').html(tmp_chkbox_content);
          }  
          else if (b == '25i') {
            tmp_chkbox_content = chkbox_liststr(obj[b], '25i', tmp_date_str, userid, admin);
            $('#r25i_div').html(tmp_chkbox_content);
          }  

          else if (b == '25m') {
            tmp_chkbox_content = chkbox_liststr(obj[b], '25m', tmp_date_str, userid, admin);
            $('#r25m_div').html(tmp_chkbox_content);
          }  

          else if (b == '25c') {  
            tmp_chkbox_content = chkbox_liststr(obj[b], '25c', tmp_date_str, userid, admin);
            $('#r25c_div').html(tmp_chkbox_content);
          }  
         }
              
        if (!display_msg_status) {
            $('#snackbar').text('Ok....');
            show_my_msg();
            display_msg_status = true;
        }



    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }


    },
    error: function(){alert("Fail！")}
  });


  });





//----------------------------------

  $('#applyroom').click(function() {
  $('#snackbar').text('Got it, Please wait..');
  show_my_msg();


  var t0018_server_create_booking = "https://script.google.com/macros/s/AKfycbxKa_9UshelXmQZpriMSacXKygvH22LN7tO14GxDutqzLWabZJlSlXjtfWW7hveLBdA/exec"


$.ajax({



  url: t0018_server_create_booking,

  data: {
        "tmproom": $("input[name='room']:checked").val(),
        "time01" : $('#time01').html(),
        "time02" : $('#time02').html(),
        "tmpdate": $('#tmpdate').val(),
        "remark": $('#remark_area').val(),
        "userid":$('#userid').val(),
        "userpw":$('#userpw').val(),
  },
    success: function(response) {

    try {
        var display_msg_status = false;
        var obj = JSON.parse(response);  //[["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"],["11m","03:30pm-04:00pm","mary","mary job"]]
        var cnt = 1;
        var tmp_chkbox_content = "";
        var tmp_date_str = "";
        var userid = "";
        var admin = "";
        for (var b in obj) {   //test     //["11m","02:00pm-03:00pm","rudy","0200  meeting room half hour"]
          
          if (b=='date') {
            $('#testspan').text(obj[b]);
            tmp_date_str = obj[b];
          }

          if (b=='userid') {
            userid = obj[b];
          }          

          if (b=='admin') {
            admin = obj[b];
            $('#admin').text(admin);

          }          

          if (b=='link') {
			tmp_link = obj[b];  
			tmp_link = "<a href='" + tmp_link + "'  target='_blank'>請按這裏觀看" + tmp_date_str + "時間表</a>"
            $('#link_div').html(tmp_link);

          }          

          if (b=='error') {
            if (!display_msg_status) {
            $('#snackbar').text(obj[b]);
            show_my_msg();
            display_msg_status = true;
			alert(obj[b]);
            }
          }
          

          if (b == '11m') { 
            $('#r11m_div').empty();   
            tmp_chkbox_content = chkbox_liststr(obj[b], '11m', tmp_date_str, userid, admin);
            $('#r11m_div').html(tmp_chkbox_content);
          }  
          else if (b == '11b') {  
            $('#r11b_div').empty();   
            tmp_chkbox_content = chkbox_liststr(obj[b], '11b', tmp_date_str, userid, admin);
            $('#r11b_div').html(tmp_chkbox_content);
          }  
          else if (b == '25i') {
            $('#r25i_div').empty();   
            tmp_chkbox_content = chkbox_liststr(obj[b], '25i', tmp_date_str, userid, admin);
            $('#r25i_div').html(tmp_chkbox_content);
          }  

          else if (b == '25m') {
            $('#r25m_div').empty();   
            tmp_chkbox_content = chkbox_liststr(obj[b], '25m', tmp_date_str, userid, admin);
            $('#r25m_div').html(tmp_chkbox_content);
          }  

          else if (b == '25c') {  
            $('#r25c_div').empty();   
            tmp_chkbox_content = chkbox_liststr(obj[b], '25c', tmp_date_str, userid, admin);
            $('#r25c_div').html(tmp_chkbox_content);
          }  
         }

        if (!display_msg_status) {
            $('#snackbar').text('Ok....');
            show_my_msg();
            display_msg_status = true;
        }

    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }



    },
    error: function(){alert("Fail！")}
  });


   });


//----------------------------------

  $('#login').click(function() {
  $('#snackbar').text('Get it, Please Wait..');
  show_my_msg();


  var t0018_login = "https://script.google.com/macros/s/AKfycbxLqQVQojb7V6MqRw3GY7zTM7fiuBMrn4VAUJ4jaslFSk1F0-RILmEvcR5piy1KYRxvaQ/exec"


$.ajax({



  url: t0018_login,

  data: {
        "userid":$('#userid').val(),
        "userpw":$('#userpw').val(),
  },
    success: function(response) {

    try {
        var display_msg_status = false;
        var obj = JSON.parse(response);  
//        var cnt = 1;
//        var tmp_chkbox_content = "";
//        var tmp_date_str = "";
//        var userid = "";
//        var admin = "";
        for (var b in obj) {   
          


          if (b=='usertype')
			  if (obj[b] == 'admin') {
				  $(".r11b_class").css("display", "block");
				  //document.getElementById("d1").style.display = "block";
			  }
			  else {
				  $(".r11b_class").css("display", "none");
				  //document.getElementById("d1").style.display = "block";
			  }

          if (b=='error') {
            if (!display_msg_status) {
            $('#snackbar').text(obj[b]);
            show_my_msg();
            display_msg_status = true;
            }
			alert(obj[b])
          }
          
		  
         }

        if (!display_msg_status) {
            $('#snackbar').text('Ok....');
            show_my_msg();
            display_msg_status = true;
        }

    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }



    },
    error: function(){alert("Fail！")}
  });


   });







})

