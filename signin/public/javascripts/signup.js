$(function () {
    //触碰输入栏
    $('input:not(.button)').blur(function () {
        if(validator.isFieldValid(this.id,$(this).val())){
            $(this).parent().find('.error').text('').hide();
        }else {
            $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
        }
    });
    //点击提交
    $('input.submit').click(function () {
        $('input:not(.button)').blur();
        if(!validator.isFormValid())
            return false;
    });
    //点击清除
    $('input.reset').click(function () {
        $('input:not(.button)').val('');
        $(this).parent().parent().find('.error').text('').hide();
        return false;
    });
});