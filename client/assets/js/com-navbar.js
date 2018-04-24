var navbar = Vue.component('navbar', {
    props: ['logout'],
    template: `
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Todolist.com</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                    </li>
                </ul>

                <div>
                    <button type="button" id="sign-out" class="btn btn-info" @click="logout">Sign Out</button>
                    <button id="sign-in" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"  data-target="#elegantModalFormLogin">Sign In</button>
                    <button id="register" class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#elegantModalForm">Register</button>        
                </div>

            </div>
        </nav>
    </div>`
})