    $(document).ready(function() {
        $('.get-link').click(function() {
            $('#progress').css('display','block');

            $.ajax({
                type: "GET",
                url: "/ajax/getlink",
                success: function(data) {
                    $('#problemq').html('<h3>Problem</h3><br><hr>');
                    $('#problemlink').html('<a href = "'+data[0]+'">'+data[0]+'</a>');
                    for (i = 1; i < data.length; i++) {
                        //$('ul').append('<li>' + data[i] + '</li>');
                        $('#problemq').append('<p>'+data[i]+'</p>');
                    }
                    $('#progress').css('display', 'none');
                    $('#problema').css('display', 'block');
                }
            });
        });


        $('.get-answer').click(function() {
            $('.loadd').css('display','block');
            var code = $("a.red").attr('data-tooltip');
            var geturl = $("#problemlink").text();

            $.ajax({
                type: "GET",
                url: "/ajax/getanswer?link="+geturl,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('No more solution left', 4000);
                    }
                    else
                    {
                    var kls = data[0].slice(38, data[0].length);
                    $("#problemanswer").append('<li><div class="collapsible-header"><span class="red badge code-badge" id="'+kls+'" style="color:white;">'+ code +'</span><i class="material-icons">question_answer</i>Answer - '+kls+'</div><div class="collapsible-body '+ kls +'"><h3>Solution:</h3><a class = "btn-floating btn waves-effect waves-light right green save-answer" data-code = "'+ kls +'"><i class="material-icons">add</i></a></div>');
                    var str;
                        $("."+kls).append('<pre class="prettyprint linenums:1" id="'+kls+'"></pre>');
                    for (i = 1; i < data.length; i++) {
                        str = data[i].replace('\t', '    ');
                        console.log(str);
                        $("#out").append('<code>'+str+'\n'+'</code>');
                    }
                    var src = $('#out').html();
                    $("pre").html(PR.prettyPrintOne(src));
                        //$("."+kls).append('</xmp>');
                    $("."+kls).append('<a href = "'+data[0]+'">'+data[0]+'</a>')
                }
                    $('.loadd').css('display', 'none');
                }
            });
        });

$('.refresh').click(function(){
    $(".blog-content").fadeOut(1000);
});

        $('.get-blog').click(function() {
            console.log('GET');
            $('#preload').css('display','block');
            for (j=0; j<5; j++)
            {
            console.log(j);
            $.ajax({
                type: "GET",
                url: "/ajax/getblog",
                success: function(data) {
                    for (i = 0; i < data.length; i++) {
                        //$('ul').append('<li>' + data[i] + '</li>');
                        $('#blogshow').append('<div class="col s12 blog-content '+ data[i][3] +'" style = "color: white;display: none;">'+
                            '<div class="card horizontal black">'+
                            '<div class="card-image red center" style="padding: 20px;">'+
                            data[i][1]+'</div>'+
                            '<div class="card-stacked">'+
                            '<div class="card-content flow-text">'+
                            '<a href = "javascript:void(0);" class="right delete" style="color: white" id = "'+ data[i][3] +'"><i class="material-icons">delete</i></a>'+
                            '<a href="#modal1" class="modal-trigger right view-blog" style="color: white" id = "'+ data[i][3] +'"><i class="material-icons">pageview</i></a>'+
                            '<a href="javascript:void(0);" class="right save-blog" style="color: white" id = "'+ data[i][3] +'"><i class="material-icons">note_add</i></a>'+
                            '<p>'+data[i][0]+'</p>'+
                            '</div>'+
                            '<div class="card-action">'+
                            '<a href = "'+data[i][2]+'" class = "'+ data[i][3] +'" target="_blank">Link</a>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>');
                        $("."+data[i][3]).fadeIn();
                        $("#more-button").fadeIn();
                    }
                    $('#preload').css('display', 'none');
                }
            });
        }
        });

        $('#blogshow').on( 'click', '.view-blog', function() {
            var id = $(this).attr('id');
            var code = $("a."+id).attr("href");

            $("#asd").attr("data-src", code);
            console.log(code);
            var iframe = $("#asd");
            iframe.attr("src", code);
            //iframe.attr("src", iframe.data("src")); 
        });


        $('#blogshow').on( 'click', '.delete', function() {
            var id = $(this).attr('id');
            console.log('Deleting');
            console.log(id);
            $('div.'+id).hide(1000);

        });

        $('#blogshow').on( 'click', '.save-blog', function() {
            console.log('Saving-------------');
            var id = $(this).attr('id');
            var title = $('.'+id).find('p').text();
            var score = $('.'+id).find('.card-image').text();
            var url = $('.'+id).find('a.'+id).attr('href');
            /*console.log("ID -" + id);
            console.log("Title -"+title);
            console.log("Score -"+score);
            console.log("Link -"+link);*/
            $.ajax({
                type: "GET",
                url: "/ajax/saveblog?title="+title+"&score="+score+"&url="+url+"&id="+id,
                success: function(data){
                    if(data == 'no')
                    {
                        Materialize.toast('Already saved', 4000);
                    }
                    else
                    {
                        Materialize.toast('Saved', 4000);
                    }
                    $('#progress').css('display', 'none');
                    $('.'+id).find('.card-image').attr('class', 'card-image green center');
                }
            });
        });

        $('#blogshow').on( 'click', '.done-delete', function() {
            var id = $(this).attr('id');
            $.ajax({
                type: "GET",
                url: "/ajax/deleteblog?id="+id,
                success: function(data){
                    Materialize.toast('Deleted', 4000);
                    $('#progress').css('display', 'none');
                    $('#'+id).find('.card-image').attr('class', 'card-image red center');
                    $('div#'+id).hide(1000);
                }
            });
        });

// Save answer

        $('#problemanswer').on( 'click', '.save-answer', function() {
            $('#progress').css('display','block');
            var code = $(this).attr("data-code");
            var geturl = $("#problemlink").text();
            consolelog(code);
            $.ajax({
                type: "GET",
                url: "/ajax/saveanswer?code="+code+"&url="+geturl,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('Already saved', 4000);
                    }
                    else
                    {
                        Materialize.toast('Saved', 4000);
                        $("#"+code+".code-badge").removeClass("red").addClass("green");
                    }
                    $('#progress').css('display', 'none');
                }
            });
        });

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////             CODEFORCES             ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
        function cfreload(){
            $("#problem-page").fadeOut(1000);
            $('#problem-page').html('');
            $("#problem-page").fadeIn(1000);
            $("#problem-answer").css('display', 'none');
            $('#problemanswer').html('');
            $(".difficulty-A").fadeIn(1000);
            $(".difficulty-B").fadeIn(1000);
            $(".difficulty-C").fadeIn(1000);
            $(".difficulty-D").fadeIn(1000);
            $('.cfdone1').css('display','none');
            $('.cfdone2').css('display','none');
            $('.cfdone3').css('display','none');
            $('.cfdone4').css('display','none');
            $('#cfchoose1').css('display', 'block');
            $('#cfchoose2').css('display', 'block');
            $('#cfchoose3').css('display', 'block');
            $('#cfchoose4').css('display', 'block');
            $("#cfcheck").attr('class', 'A');
        };
        $('#cfreload').click(function(){
            cfreload();
        });
        $('.cfgetlink').click(function() {
            console.log("Working");
            var quality = document.getElementById('cfcheck').className
            console.log(quality);
            $('#progress').css('display','block');
            $(".difficulty-A").fadeOut(1000);
            $(".difficulty-B").fadeOut(1000);
            $(".difficulty-C").fadeOut(1000);
            $(".difficulty-D").fadeOut(1000);
            $.ajax({
                type: "GET",
                url: "/ajax/cfgetlink?type=random&quality="+quality,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('No question for this rating', 4000);
                        $('#progress').css('display', 'none');
                        cfreload();
                    }
                    //console.log(data);
                    cfindex = data[2]['index'];
                    if(cfindex == 'E' || cfindex == 'F' || cfindex == 'G' || cfindex == 'H' || cfindex == 'I')
                    {
                        cfindex = 'D';
                    }
                    $('.difficulty-'+cfindex).fadeIn(1000);
                    $('#problem-page').html('<h3>Problem</h3><br><h6 class="right">Double tap to add</h6><hr>');
                    //$('#problemlink').html('<a href = "'+data[0]+'">'+data[0]+'</a>');
                    //for (i = 0; i < data.length; i++) {
                        //$('ul').append('<li>' + data[i] + '</li>');
                        //console.log(data[i]);
                    //}
                    //$('#problem-page').append('<p>'+data+'</p>');
                    $('#problem-page').append('<h1>'+data[0]+'</h1>'+data[3]+'<a href="'+data[1]+'" id = "problemlink">'+data[1]+'</a><br>');
                    $('#problem-page').append('<p>'+data[4]+'</p><p>'+data[5]+'</p><p>'+data[6]+'</p><hr><p>'+data[7]+'</p>');
                    $('#progress').css('display', 'none');
                    $('#problem-answer').css('display','block');
                    //$('#problema').css('display', 'block');
                }
            });
        });

        $('.cfgetnicelink').click(function() {
            console.log("Working");
            var quality = document.getElementById('cfcheck').className
            console.log(quality);
            $('#progress').css('display','block');
            $(".difficulty-A").fadeOut(1000);
            $(".difficulty-B").fadeOut(1000);
            $(".difficulty-C").fadeOut(1000);
            $(".difficulty-D").fadeOut(1000);

            $.ajax({
                type: "GET",
                url: "/ajax/cfgetlink?type=ordered&quality="+quality,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('No question for this rating', 4000);
                        $('#progress').css('display', 'none');
                        cfreload();
                    }
                    //console.log(data);
                    cfindex = data[2]['index'];
                    if(cfindex == 'E' || cfindex == 'F' || cfindex == 'G' || cfindex == 'H' || cfindex == 'I')
                    {
                        cfindex = 'D';
                    }
                    $('.difficulty-'+cfindex).fadeIn(1000);
                                        $('.cfdone1').css('display','block');
                    $('.cfdone2').css('display','block');
                    $('.cfdone3').css('display','block');
                    $('.cfdone4').css('display','block');
                    $('#problem-page').html('<h3>Problem</h3><br><h6 class="right">Double tap to add</h6><hr>');
                    //$('#problemlink').html('<a href = "'+data[0]+'">'+data[0]+'</a>');
                    //for (i = 0; i < data.length; i++) {
                        //$('ul').append('<li>' + data[i] + '</li>');
                        //console.log(data[i]);
                    //}
                    //$('#problem-page').append('<p>'+data+'</p>');
                    $('#problem-page').append('<h1>'+data[0]+'</h1>'+data[3]+'<a href="'+data[1]+'" id = "problemlink">'+data[1]+'</a><br>');
                    $('#problem-page').append('<p>'+data[4]+'</p><p>'+data[5]+'</p><p>'+data[6]+'</p><hr><p>'+data[7]+'</p>');
                    $('#progress').css('display', 'none');
                    $('#problem-answer').css('display','block');
                    //$('#problema').css('display', 'block');
                }
            });
        });

        $('#cfdone1, #cfdone2, #cfdone3, #cfdone4').click(function(){
            $('#progress').css('display', 'block');
            var quality = document.getElementById('cfcheck').className
            var geturl = $("#problemlink").text();
            $.ajax({
                type: "GET",
                url: "/ajax/cfdone?url="+geturl+'&quality='+quality,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('You are feeling lucky', 4000);
                    }
                    else
                    {
                        Materialize.toast('Marked as done', 4000);
                    }
                    $('#progress').css('display', 'none');
                }

            });

        });

        $('#problem-answer').on( 'click', '.cfgetanswer', function() {
            $('#preload').css('display','block');
            //var code = $("a.red").attr('data-tooltip');
            var geturl = $("#problemlink").text();
            var code = $("a.red.tooltipped").attr('data-tooltip');
            var version = document.forms[0];
            for(var i=0; i<version.length;i++)
            {
                if (version[i].checked){
                    var cfversion = version[i].value;
                    break;
                }
            }


            $.ajax({
                type: "GET",
                url: "/ajax/cfgetanswer?link="+geturl+"&code="+code+"&version="+cfversion,
                success: function(data) {
                    if(data == 'no')
                    {
                        Materialize.toast('No more solution left', 4000);
                    }
                    else
                    {
                        if(data[3] == 'white')
                        {
                            rcolor = 'black'
                        }
                        else{
                            rcolor = 'white'
                        }
                    $("#problemanswer").html('<div class="row"><div class="col s12 m6"><div class = "card flow-text '+data[3]+'" style="padding: 3%; color:'+rcolor+';">'+data[2]+' | '+data[4]+'</div></div></div>'+'<div id = "cfcode">'+PR.prettyPrintOne(data[0])+'<br>'+'<a href = "'+data[1]+'">'+data[1]+'</a><div>');
                    var src = $('#cfcode').html();
                }
                    $('#preload').css('display', 'none');
                }
            });
        });

        $('#cfchoose1').click(function(){
            $('#cfchoose1').css('display', 'none');
            $("#cfcheck").attr('class', 'A');
            $(".difficulty-B").fadeOut(1000);
            $(".difficulty-C").fadeOut(1000);
            $(".difficulty-D").fadeOut(1000);
        });

        $('#cfchoose2').click(function(){
            $('#cfchoose2').css('display', 'none');
            $("#cfcheck").attr('class', 'B');
            $(".difficulty-A").fadeOut(1000);
            $(".difficulty-C").fadeOut(1000);
            $(".difficulty-D").fadeOut(1000);
        });
        $('#cfchoose3').click(function(){
            $('#cfchoose3').css('display', 'none');
            $("#cfcheck").attr('class', 'C');
            $(".difficulty-A").fadeOut(1000);
            $(".difficulty-B").fadeOut(1000);
            $(".difficulty-D").fadeOut(1000);
        });
        $('#cfchoose4').click(function(){
            $('#cfchoose4').css('display', 'none');
            $("#cfcheck").attr('class', 'D');
            $(".difficulty-A").fadeOut(1000);
            $(".difficulty-B").fadeOut(1000);
            $(".difficulty-C").fadeOut(1000);
        });
        $('#save-rating1').click(function(){
            $('#progress').css('display', 'block');
            var geturl = $("#problemlink").text();

            $.ajax({
                type: "GET",
                url: "/ajax/saverating1",
                success: function(data) {
                    $("#save-rating1").removeClass("blue").addClass("red pulse");
                    $("#save-rating2").removeClass("red pulse").addClass("blue");
                    $("#save-rating3").removeClass("red pulse").addClass("blue");
                    $("#save-rating4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });

        $('#save-rating2').click(function(){
            $('#progress').css('display', 'block');
            var geturl = $("#problemlink").text();

            $.ajax({
                type: "GET",
                url: "/ajax/saverating2",
                success: function(data) {
                    $("#save-rating1").removeClass("red pulse").addClass("blue");
                    $("#save-rating2").removeClass("blue").addClass("red pulse");
                    $("#save-rating3").removeClass("red pulse").addClass("blue");
                    $("#save-rating4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });

        $('#save-rating3').click(function(){
            $('#progress').css('display', 'block');
            var geturl = $("#problemlink").text();

            $.ajax({
                type: "GET",
                url: "/ajax/saverating3",
                success: function(data) {
                    $("#save-rating1").removeClass("red pulse").addClass("blue");
                    $("#save-rating2").removeClass("red pulse").addClass("blue");
                    $("#save-rating3").removeClass("blue").addClass("red pulse");
                    $("#save-rating4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });

        $('#save-rating4').click(function(){
            $('#progress').css('display', 'block');
            var geturl = $("#problemlink").text();

            $.ajax({
                type: "GET",
                url: "/ajax/saverating4",
                success: function(data) {
                    $("#save-rating1").removeClass("red pulse").addClass("blue");
                    $("#save-rating2").removeClass("red pulse").addClass("blue");
                    $("#save-rating3").removeClass("red pulse").addClass("blue");
                    $("#save-rating4").removeClass("blue").addClass("red pulse");
                    $('#progress').css('display', 'none');
                }

            });

        });

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////            CODEFORCES END          ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////

// save-lang1 id is used to make sure that the user get the content of their desired language only
// For that purpose we used AJAX call to save the data which user clicked in backend
// save-lang have 4 buttons with 1,2,3,4 and each save different language data
// It makes simple call with url and on views it save the data in Language model by updating it

        $('#save-lang1').click(function(){
            $('#progress').css('display', 'block');

            $.ajax({
                type: "GET",
                url: "/ajax/save-lang1",
                success: function(data) {
                    $("#save-lang1").removeClass("blue").addClass("red pulse");
                    $("#save-lang2").removeClass("red pulse").addClass("blue");
                    $("#save-lang3").removeClass("red pulse").addClass("blue");
                    $("#save-lang4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });

        $('#save-lang2').click(function(){
            $('#progress').css('display', 'block');

            $.ajax({
                type: "GET",
                url: "/ajax/save-lang2",
                success: function(data) {
                    $("#save-lang1").removeClass("red pulse").addClass("blue");
                    $("#save-lang2").removeClass("blue").addClass("red pulse");
                    $("#save-lang3").removeClass("red pulse").addClass("blue");
                    $("#save-lang4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });
        $('#save-lang3').click(function(){
            $('#progress').css('display', 'block');

            $.ajax({
                type: "GET",
                url: "/ajax/save-lang3",
                success: function(data) {
                    $("#save-lang1").removeClass("red pulse").addClass("blue");
                    $("#save-lang2").removeClass("red pulse").addClass("blue");
                    $("#save-lang3").removeClass("blue").addClass("red pulse");
                    $("#save-lang4").removeClass("red pulse").addClass("blue");
                    $('#progress').css('display', 'none');
                }

            });

        });
        $('#save-lang4').click(function(){
            $('#progress').css('display', 'block');

            $.ajax({
                type: "GET",
                url: "/ajax/save-lang4",
                success: function(data) {
                    $("#save-lang1").removeClass("red pulse").addClass("blue");
                    $("#save-lang2").removeClass("red pulse").addClass("blue");
                    $("#save-lang3").removeClass("red pulse").addClass("blue");
                    $("#save-lang4").removeClass("blue").addClass("red pulse");
                    $('#progress').css('display', 'none');
                }

            });

        });

    $( "#targe" ).click(function() {
  $('.tap-target').tapTarget('open');
});

    });
