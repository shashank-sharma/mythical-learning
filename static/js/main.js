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
            $('#progress').css('display','block');
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
                    $("#problemanswer").append('<li><div class="collapsible-header"><i class="material-icons">question_answer</i>Answer - '+kls+'</div><div class="collapsible-body '+ kls +'"><h3>Solution:<a class="btn-floating right green save-answer"><i class="material-icons">add</i></a></h3></div>');
                    var str;
                    for (i = 1; i < data.length; i++) {
                        str = data[i].replace('\t', '    ');
                        console.log(str);
                        $("."+kls).append('<xmp>'+str+'</xmp>');
                    }
                    $("."+kls).append('<a href = "'+data[0]+'">'+data[0]+'</a>')
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
