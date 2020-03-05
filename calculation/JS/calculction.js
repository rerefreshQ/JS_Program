var tempResult;
var listNumber;

$(function() {
    nextAsk();
});

$('.number>ul>li').click(function() {
    var userClick = $(this).text();
    switch (userClick) {
        case 'C':
            tempResult = '';
            $('#cal').text(tempResult);
            $('section.result div.error').css("display", "none");
            $('section.result div.ask').css("display", "block");
            break;

        case 'OK':

            if (parseInt($('#cal').text()) == listNumber[2]) {
                // 答案正确
                $('section.result div.right').css("display", "block");
                $('section.result div.ask').css("display", "none");

                // $('#liNextAsk').css("display", "block");   // 打开下一题
                $('.input section.number ul li button').attr("disabled", true); //关闭所有
                $('#nextAsk').attr("disabled", false); // 打开下一题

                // $('#idC').attr("disabled", true); // 关闭C
            } else {
                // 答案错误
                $('section.result div.error').css("display", "block");
                $('section.result div.ask').css("display", "none");
            }
            break;
        case '下一题':
            nextAsk();
            break;
        default:
            if (tempResult.length == 3) {
                tempResult = tempResult.substring(0, 2);
            }
            tempResult = tempResult + userClick;
            $('#cal').text(tempResult);
            break;
    }
});


function nextAsk() {
    listNumber = getRandList(); // 得到题目和答案 [A,+B,=result]

    var cal = $('input:radio[name=radioCal]:checked').val(); // 做加法还是减法的 redio
    if (cal == 'Add') {
        $('#rand1').text(listNumber[0]);
        $('#AddOrCut').text('+');
        $('#rand2').text(listNumber[1]);
        $('#cal').text('');
        tempResult = '';
    }
    if (cal == 'Cut') {
        listNumber = listNumber.reverse();
        $('#rand1').text(listNumber[0]);
        $('#AddOrCut').text('-');
        $('#rand2').text(listNumber[1]);
        $('#cal').text('');
        tempResult = '';
    }
    console.log(listNumber);
    $('section.result div.right').css("display", "none");
    $('section.result div.ask').css("display", "block");


    $('.input section.number ul li button').attr("disabled", false); //打开所有
    // $('#idC').attr("disabled", false) // 打开C
    $('#nextAsk').attr("disabled", true); // 关闭下一题
    $('#loading').css("display", "none");
}

function getRandList() {
    // 得到 listRand[A, B, result] 3 个数的组合 list
    var listRand = [];
    var x = parseInt($('#textStart').val());
    var y = parseInt($('#textEnd').val());

    var result;
    var A = parseInt(Math.random() * (x - y) + y);
    var B = parseInt(Math.random() * (x - y) + y);

    // console.log(A);
    // console.log(B);

    if (A > B) {
        // A:10 B:8
        result = A;
        A = result - B;
        // result:10 B:8 A:2
    } else if (A == B) {
        // A:10 B:10
        result = A;
        A = result - B;
        // result:10 B:10 A:0
    } else if (A < B) {
        // A:7 B:25
        result = B; // result:25 B:25 A:7
        B = A; // result:25 B:7 A:7
        A = result - B;
        // result:12 B:10 A:2
    };

    listRand = [A, B, result];
    return listRand;
};


// $('#textStartAdd').mousedown(function() {
//     UpDownMore($('#textStart'), 1);
// });
// $('#textStartAdd').mouseup(function() {
//     clearInterval(time1);
// });
// $('#textStartCut').mousedown(function() {
//     UpDownMore($('#textStart'), -1);
// })
// $('#textStartCut').mouseup(function() {
//     clearInterval(time1);
// })

// $('#textEndAdd').mousedown(function() {
//     UpDownMore($('#textEnd'), 1);
// })
// $('#textEndAdd').mouseup(function() {
//     clearInterval(time1);
// })

// $('#textEndCut').mousedown(function() {
//     UpDownMore($('#textEnd'), -1);
// })
// $('#textEndCut').mouseup(function() {
//     clearInterval(time1);
// })

$('#textStartAdd').click(function() {
    UpDown($('#textStart'), 10);
});

$('#textStartCut').click(function() {
    UpDown($('#textStart'), -10);
})


$('#textEndAdd').click(function() {
    UpDown($('#textEnd'), 10);
})

$('#textEndCut').click(function() {
    UpDown($('#textEnd'), -10);
})






function UpDownMore(textId, number) {
    time1 = setInterval(() => {
        if (parseInt(textId.val()) == 0 && number == -1) {

        } else {
            textId.val(parseInt(textId.val()) + number);
        }
    }, 50);
};


function UpDown(textId, number) {
    if (parseInt(textId.val()) == 0 && number < 0) {

    } else {
        if (parseInt(textId.val()) + number >= 100) {

        } else {
            textId.val(parseInt(textId.val()) + number);
        }
    }
};