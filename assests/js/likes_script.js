    /***********************Like-Unlike********************************************/

class ToggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let x=this;

            $.ajax({
                type:'Post',
                url:$(x).attr('href')
            })
            .done(function(data){
                let likesCount=parseInt($(x).attr('data-likes'));
                if (data.data.deleted==true){
                    likesCount-=1;
                    // x.style.color='black'
                }else {
                    likesCount+=1;
                    // x.style.color='blue'
                };
                $(x).attr('data-likes',likesCount)
                $(x).html(`${likesCount} <i class="fa fa-thumbs-up"></i>`)
            })
            .fail(function(err){
                console.log(err)
            })
        })
    }
}

