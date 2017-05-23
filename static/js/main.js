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
                    var kls = data[0].slice(38, data[0].length);
                    $("#problemanswer").append('<li><div class="collapsible-header"><i class="material-icons">question_answer</i>Answer - '+kls+'</div><div class="collapsible-body '+ kls +'"><h3>Solution:</h3></div>');
                    var str;
                    for (i = 1; i < data.length; i++) {
                        str = data[i].replace('\t', '    ');
                        console.log(str);
                        $("."+kls).append('<pre>'+str+'</pre>');
                    }
                    $("."+kls).append('<a href = "'+data[0]+'">'+data[0]+'</a>')
                    $('#progress').css('display', 'none');
                }
            });
        });

        $('.save-answer').click(function(){
            $('#save').css('display', 'block');

            $.ajax({
                type: "GET",
                url: "/ajax/saveanswer?"

            });

        });
    });
