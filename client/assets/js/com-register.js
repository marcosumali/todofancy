var register = Vue.component('register', {
    props: ['registerstatus', 'register'],
    data() {
        return {
            regFirstName: '',
            regLastName: '',
            regEmail: '',
            regPassword: ''
        }
    },
    methods: {
        registerUser: function () {
            let obj = {
                firstname: this.regFirstName,
                lastname: this.regLastName,
                email: this.regEmail,
                password: this.regPassword
            }
            // console.log('ini form dari child', obj)
            this.$emit('reguser', obj)
        }
    },
    template:`
    <div>
        <form>
            <div class="modal fade" id="elegantModalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content form-elegant">
                        <div class="modal-header text-center">
                            <h3 class="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Register</strong></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body mx-4">

                            <div class="md-form mb-4">
                                <div class="reg-success">
                                    <strong></strong> {{ registerstatus }}
                                </div>
                            </div>

                            <div class="md-form mb-4">
                                <input type="text" id="Form-firstname" class="form-control firstname" placeholder="Your first name" ref="firstname" v-model="regFirstName">
                            </div>

                            <div class="md-form mb-4">
                                <input type="text" id="Form-lastname" class="form-control lastname" placeholder="Your last name" ref="lastname" v-model="regLastName">
                            </div>

                            <div class="md-form mb-4">
                                <input type="text" id="Form-email1" class="form-control email" placeholder="Your email" ref="email1" v-model="regEmail">
                            </div>

                            <div class="md-form b-3">
                                <input type="password" id="Form-pass1" class="form-control password" placeholder="Your password" ref="password1" v-model="regPassword"><br>
                            </div>

                            <div class="text-center mb-3">
                                <button type="button" class="btn blue-gradient btn-block btn-rounded z-depth-1a" @click="registerUser">JOIN</button>
                            </div>
                        </div>
                    
                        <div class="modal-footer mx-5 pt-3 mb-1">
                            <p class="font-small grey-text d-flex justify-content-end">Already a member? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#elegantModalFormLogin" class="blue-text ml-1"> Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>            
        </form>
    </div>
    `
})