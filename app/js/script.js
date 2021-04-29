const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const menu = document.querySelector('.has-fade');
const body = document.querySelector('body');
const hero = document.querySelector('#hero');

//Menu_Links
const home_links = document.querySelectorAll('.menu_links')
//Hamburger Listener
btnHamburger.addEventListener('click', function(){
    if(header.classList.contains('open')){
        body.classList.remove('noscroll')
        header.classList.remove('open');
        menu.classList.remove('fade-in');
        menu.classList.add('fade-out');
        hero.classList.remove('opacity')
    }
    else {
        body.classList.add('noscroll');
        hero.classList.add('opacity');
        header.classList.add('open');
        menu.classList.remove('fade-out');
        menu.classList.add('fade-in');
    }
})
//In order to close modal
for (const link of home_links) {
    link.addEventListener("click", clickHandler);
  }
   
  function clickHandler() {
    if(header.classList.contains('open')){
        body.classList.remove('noscroll')
        header.classList.remove('open');
        menu.classList.remove('fade-in');
        menu.classList.add('fade-out');
        hero.classList.remove('opacity')
    }
  }


//Getting data from json.placeholder using Axios

//It will prob be good to manage an initial helper class "loading" with some css loading effect and remove it 
//when axios complete or either show an error message in case it fails.
const getUsers = async() => {
    try{
        const resp = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users'
        });
        return resp.data;
    }catch(err){
        console.log(err);
    }
}

const getPosts = async() => {
    try{
        const resp = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        });
        return resp.data;
    }catch(err){
        console.log(err);
    }
}
  
Promise.all([getUsers(), getPosts()]).then(function (results) {
    const users = results[0];
    const posts = results[1];

    const newUsers = users.slice(0, 4);
    const newPosts = newUsers.map(user =>{
        const FoundPost = posts.find(post =>  post.userId === user.id);
        return FoundPost;
    })
    //Fill name for every user on slider
    newUsers.forEach((user,index) => {
        const name = document.getElementById(`name${index+1}`);
        name.innerHTML = user.name
    });
    //Fill quote for every user on slider
    newPosts.forEach((post,index) => {
        const quote = document.getElementById(`quote${index+1}`);
        quote.innerHTML = post.body
    });
});