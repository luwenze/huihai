$(function(){
    $('#showBtn').on('click',function(){
        $(this).toggleClass('change');
        $('.show').slideToggle(100);
        $('.hide').slideToggle(100);
    });
});