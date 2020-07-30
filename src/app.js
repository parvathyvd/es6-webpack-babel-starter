import {http} from './http';
import {ui} from './ui';


const getPosts = () =>{
const result = http.get('http://localhost:3000/posts');
result.then(data => ui.showPosts(data))
        .catch(err => console.log(`this is the error`,err))
}


const submitPost = () =>{
    const title =  document.querySelector('#post-title').value;
    const body =  document.querySelector('#post-body').value;
    const id =  document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    if((title === '') || (body==='')){
        ui.showAlert(`Please fill all the fields`, 'alert alert-danger');
    }
    else{
        if(id === ''){
            http.post('http://localhost:3000/posts',data)
                .then(data => {
                    getPosts();
                    ui.showAlert(`Post Added`,`alert alert-success`);
                    ui.showClearFields();
                })
                .catch(err => console.log(err)) 
            }
            else{
                //update post
                http.put(`http://localhost:3000/posts/${id}`,data)
                .then(data => {
                    getPosts();
                    ui.showAlert(`Post Updated`,`alert alert-success`);
                    ui.changeFormState('add');
                })
                .catch(err => console.log(err)) 
            }

        }
} 
       


const deletePost = (e) =>{
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert(`Post Deleted`, 'alert alert-success');
                getPosts();

            })
        }
    }
}

const editPost = (e) =>{
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.innerHTML;
        const title = e.target.parentElement.previousElementSibling.parentElement.previousElementSibling.innerHTML;

        // data object
        const data = {
            id,
            title,
            body
        }

        // fill the form with the the post to edit

        ui.fillFormToEdit(data);

    

    }

}

const cancelEdit = (e) =>{

    if(e.target.classList.contains('cancel')){
        console.log('cancel',e.target);

        ui.changeFormState('add');
    }

}



const postIt = document.querySelector('#post-it');
const posts = document.querySelector('#posts');
const postContainer = document.querySelector('.post-container');

document.addEventListener('DOMContentLoaded', getPosts);
postIt.addEventListener('click', submitPost);
posts.addEventListener('click', deletePost);
posts.addEventListener('click', editPost);
postContainer.addEventListener('click', cancelEdit);





