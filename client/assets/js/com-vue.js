new Vue({
    el: '#app',
    data: {
        greet: 'Hi',
        prologue: 'Why would you like to do today?',
        register_status: '',
        regFirstName: '',
        regLastName: '',
        regEmail: '',
        regPassword: '',
        login_status_success: '',
        login_status_fail: '',
        todolists: [],
        full_name: '',
        please_login: '',
        empty_status: '',
        show_empty_status: false,
        show: false,
        notification: ''
    },
    component: {
        navbar: navbar,
        register: register,
        login: login,
        inputsection: inputsection,
        showtodo: showtodo,
        fblogin: fblogin
    },
    created: function() {
        this.showTodos();
    },
    methods: {
        register: function (e) {                    
            let userObj = {
                first_name: e.firstname,
                last_name: e.lastname,
                email: e.email,
                password: e.password,
            }
            // console.log(userObj)

            axios.post('http://localhost:3000/users/register', userObj)
            .then((result) => {

                localStorage.setItem('token', result.data.token);

                this.register_status = 'Registration successfull !';
                $('.reg-success').css({'display':'block'});
                $('#Form-firstname').val('');
                $('#Form-lastname').val('');
                $('#Form-email1').val('');
                $('#Form-pass1').val('');
                // console.log('ini resultnya',result);
                
                let token = localStorage.getItem('token');

                let todoObj = {
                    token,
                    description: 'Please press enter to input',
                }

                axios.post('http://localhost:3000/todos', todoObj)
                    .then((result) => {
                        console.log(result)
                    })

                setTimeout(function (){
                    window.location.href = 'index.html';
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
            });

        },
        login: function(e) {
            let userObj = {
                email: e.email,
                password: e.password,
            }
            // console.log(userObj);
            
            axios.post('http://localhost:3000/users/login', userObj)
            .then((result) => {
                // console.log('masuk axios login')
                // let checkToken = localStorage.getItem('token');
                
                localStorage.setItem('token', result.data.token);

                this.login_status_success = 'Sign In successfull !';
                $('.login-success').css({'display':'block'});
                $('.login-fail').css({'display':'none'});
                // $('#sign-in').css({'display':'none'});
                // $('#sign-out').css({'display':'block'});
                $('#Form-email2').val('');
                $('#Form-pass2').val('');
                // console.log('ini resultnya',result);
                
                setTimeout(function (){
                    window.location.href = 'index.html';
                }, 2000);
            })
            .catch((error) => {
                
                if (error.response.data.message == 'Error: Username or password is null') {
                    this.login_status_fail = 'Your Username or Password cannot empty !';
                    $('.login-fail').css({'display':'block'});
                    $('.login-success').css({'display':'none'});
                    $('#Form-email2').val('');
                    $('#Form-pass2').val('');                            
                    
                } else {
                    this.login_status_fail = 'Username or Password is incorrect !';
                    // console.log(this.login_status)
                    $('.login-fail').css({'display':'block'});
                    $('.login-success').css({'display':'none'});
                    $('#Form-email2').val('');
                    $('#Form-pass2').val('');
                    console.log('ini error',error);
                }
            });
        },
        logout: function() {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
            // $('#sign-in').css({'display':'block'});
            // $('#sign-out').css({'display':'none'});

        },
        addTodo: function(e) {
            // console.log('test todo add')

            let token = localStorage.getItem('token');
            
            if (token) {
                let todoObj = {
                    token,
                    description: e.todo,
                }
                // console.log('ini hasil input',todoObj);
                
                if (!todoObj.description) {
                    this.empty_status = 'Your input cannot be empty :)';
                    this.show_empty_status = true;
                    $('#input-todo').val('');

                } else {
                    axios.post('http://localhost:3000/todos', todoObj)
                    .then((result) => {
                        this.empty_status = '';                        
                        this.show_empty_status = false;
                        // this.show = true;
                        // console.log('ini resultnya addtodo',result);

                        this.todolists.push({_id: result.data.todo._id, description: result.data.todo.description});
                        $('#input-todo').val('');

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                }

            } else {
                this.please_login = 'Please kindly sign in :)'                            

            }

        },
        showTodos: function() {
            let token = localStorage.getItem('token');
            // console.log('ini hasil dari token',token);
            
            if (token) {
                axios.post('http://localhost:3000/todos/find', {token: token})
                .then((result) => {
                    // console.log('hasil post axios',result);

                    let fullname = result.data.todos[0].userId.first_name + ' ' + result.data.todos[0].userId.last_name;
                    this.full_name = fullname;
                    this.show = true;

                    for (let i = 0; i < result.data.todos.length; i++) {
                        if (result.data.todos[i].description == 'Please press enter to input') {
                            this.notification = result.data.todos[i].description;
                        } else {
                            this.todolists.push({_id: result.data.todos[i]._id, description: result.data.todos[i].description});
                        }

                    }
                    // console.log('ini hasil push', this.todolists[0].description);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        },
        deleteTodo: function(todolist_id) {
            // console.log('delete todos');

            let token = localStorage.getItem('token');
            
            let todoObj = {
                token,
                id: todolist_id,
            }
            // console.log(todoObj);

            axios.post('http://localhost:3000/todos/delete', todoObj)
            .then(result => {
                // console.log(result);
                let index = this.todolists.indexOf(result.data.id_todo);
                // console.log(index);
                this.todolists.splice(index,1);
                // window.location.href = 'index.html';

            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        enter: function(event) {                   
            if (event.target.id == 'input-todo') {
                if (event.keyCode == 13) {
                    this.addTodo();
                }

            } else if (event.target.id == 'Form-email2' || event.target.id == 'Form-pass2') {
                if (event.keyCode == 13) {
                    this.login();
                }

            }
        }

    }
})
