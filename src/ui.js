class UI {
    constructor(){
        this.postTitle = document.querySelector('#post-title');
        this.postBody = document.querySelector('#post-body');
        this.postIt = document.querySelector('#post-it');
        this.postId = document.querySelector('#id');
        this.allPosts = document.querySelector('#posts');
        this.postBtn  =document.querySelector('.post-submit');
    }

    showPosts(posts){
      

        let output = "";
        posts.forEach(post => {
           // console.log(post);
            output += `<div class="card mb-3">
            <h4 class="card-title pl-3 pt-2">${post.title}</h4>
              <div class="card-body">
               <h5>${post.body}</h5>
              <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
              <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
            </div>
          </div>`
        });
       this.allPosts.innerHTML = output;
        
    }
    showAlert(message, className){
        const html = `<div class="${className}">${message}</div>`;
        this.allPosts.insertAdjacentHTML('beforebegin', html);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
    showClearFields(){
        this.postTitle.value = '';
        this.postBody.value = '';
    }
    showClearId(){
        this.postId.value = '';
    }

    fillFormToEdit(data){
        this.postId.value = data.id;
        this.postTitle.value = data.title;
        this.postBody.value = data.body;

        this.changeFormState('edit');
    }

    changeFormState(type){

        if(type === 'edit'){
            this.postBtn.innerHTML = 'Update Post';
            this.postBtn.className = 'post-update btn btn-warning btn-block';
            const html = `<button type="button" class="cancel btn btn-primary btn-block" id="post-cancel">Cancel Edit</button>`;
            this.postBtn.insertAdjacentHTML('afterend', html);
        }
        else{
            //Remove cancel button if it's there
            if(document.querySelector('.cancel')){
                document.querySelector('.cancel').remove();
            }
            this.postBtn.innerHTML = 'Post It';
            this.postBtn.className = 'post-it btn btn-primary btn-block';

            // clear fields ,id, title, body

            this.showClearFields();
            this.showClearInput();

        }
    }
  
}

export const ui = new UI()