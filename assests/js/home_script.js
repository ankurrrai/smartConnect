{
    // method to sumbit the form data for new post using AJAX 
    let createPost=function(){
        let newPostForm=$('#create-post');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), //it is using for coverting xml to json in key value format
                success:function(data){
                    console.log(data)
                    let newPost= newPostDOM(data.data.newPost)
                    $('#all-post>ul').prepend(newPost);
                    deletePost($(' .delete-post-button ',newPost));
                    createComment(data.data.newPost._id);// call the create comment to add comment by using ajax
                    newPostForm[0].reset();
                    new ToggleLike($(' .toogle-like-button',newPost));
                    NotyNotification('Post Published!','success');
                    
                },
                error: function(error){
                    console.log(error.responseText)
                    NotyNotification(error.responseText,'error')
                }
            })

        });
    };
    
    // method to create DOM

    let newPostDOM=function(p){
        return $(`<li id="post-${p._id}">

        <div class="home-allPost">
            
            <div class="home-allPost-content">
               <div>
                   <small> ${p.user.name} <br></small>
                   <span>
                       ${p.content}
                   </span>
                   <div class="likes-button">
                    <a href="/likes/toggle/?id=${p._id}&type=Post" class="toogle-like-button" data-likes="0">0 <i class="fa fa-thumbs-up"></i></a>
                   </div>
                </div>
               
    
               <div class="post-comments">
                       <form action="/comment/create" id="post-comment-form-${p._id}" class="post-comment-form" method="post">
                           <input type="text" name="content" placeholder="Add Comment..." required>
                           <input type="hidden" name="post" value="${p._id}" readonly>
                           <input type="submit" value="Add Comment">
                       </form>
                   </div>
               
               <div class="post-comments-list">
                   <ul id="post-comments-${p._id}">
                       
                   </ul>
                   
                   
               </div>
    
            </div>

            <div class="delete-button">
                   <a class="delete-post-button" href="/posts/destroy/?id=${p._id}">Del</a>
               </div>
        
    
            
    
       </div>
    
    </li>`)
    }

    // add eventListener to deletePost for newly added post
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    
                    $(`#post-${data.data.post_id}`).remove() //post_id is key which we are passing from server side
                    NotyNotification('Post and associated comment deleted!','success');
                },
                error:function(error){
                    console.log(error.responseText)
                    NotyNotification(error.responseText,'error')
                }
            })
        })
    };

    // Added eventlistner after render the page
    let deleteExistingPost=function(){
        let deletePostButton=$('.delete-post-button')
        for (let li of deletePostButton){
            deletePost(li);
        };
    }


   


    /* **************************************Comment Addition and deletion started******************************************** */



    // add a new comment using AJAX
    let createComment=function(newCommentid){
        
        let newComment=$('#post-comment-form-'+newCommentid)
        $(newComment).submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comment/create',
                data:newComment.serialize(),
                success:function(data){
                    // console.log(data)
                    let comment=newCommentDOM(data.data.new_comment);
                    // $('#post-comments-'+newCommentid).prepend(comment);
                    $('#post-comments-'+newCommentid).append(comment);
                    deleteComment($(' .delete-comment-button',comment));
                    new ToggleLike($(' .toogle-like-button',comment));
                    newComment[0].reset();
                    NotyNotification('Comment Added','success')
                },
                error:function(error){
                    console.log(error.responseText);
                    NotyNotification(error.responseText,'error');
                }
            })
        });
    }
    // comment prepend to the list
    let newCommentDOM=function(cmnt){
        return $(`<li id="comment-${cmnt._id}">
                        
            <div class="comment-content">
                ${cmnt.content}
                <br>
                <small>
                    ${cmnt.user.email}
                </small>
                <div class="likes-button">
                    <a href="/likes/toggle/?id=${cmnt._id}&type=Comment" class="toogle-like-button" data-likes="0">0 <i class="fa fa-thumbs-up"></i></a>
                </div>
            </div>

            <div class="comment-delete-button">
                <a class="delete-comment-button" href="/comment/destroy/?id=${cmnt._id}">Del Comment</a>
            </div>
       
    </li>`)
    };

    // delete the comment using ajax
    let deleteComment=function(deleteCommentLink){
        $(deleteCommentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteCommentLink).prop('href'),
                success:function(data){
                    $('#comment-'+data.data.comment_id).remove();
                    NotyNotification('Comment Deleted','success')

                },
                error:function(error){
                    console.log(error.responseText);
                    NotyNotification(error.responseText,'error');
                }
            })
        })
    };

    // added eventlistener to existing comment form
    let rederCommentForm=function(){
        let allCommentForm=$('.post-comment-form');
        for (let cForm of allCommentForm ){
            let commentId=cForm.children[1].value
            createComment(commentId)
        }
    }

    // Added eventlistner to existing comment after render the page
    let deleteExistingComment=function(){
        let deleteCommentButton=$('.delete-comment-button')
        for (let li of deleteCommentButton){
            deleteComment(li);
        };
    };



    /****************************Common Functions***************************************/
    
    // noty notification
    let NotyNotification=function(text,type){
        new Noty({
            theme:'relax',
            text:text,
            type: type,
            layout: 'topRight',
            timeout:1500
        }).show()
    };



    /*********************Main Call***********************************************************/
    
    
    let main=function(){
        deleteExistingPost(); 
        createPost();

        rederCommentForm();
        deleteExistingComment();
    };
    main()
}