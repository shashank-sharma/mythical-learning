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
            console.log(code);
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
