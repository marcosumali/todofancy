var login = Vue.component('login', {
    props: ['loginstatussuccess', 'loginstatusfail', 'fblogin'],
    data() {
        return {
            logusername: '',
            logpassword: ''
        }
    },
    methods: {
        loginUser: function () {
            let obj = {
                email: this.logusername,
                password: this.logpassword
            }
            console.log('ini form dari child', obj)
            this.$emit('loguser', obj)
        }
    },
    template:`
    <div>
        <form>
            <div class="modal fade" id="elegantModalFormLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content form-elegant">
                        <div class="modal-header text-center">
                            <h3 class="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Sign In</strong></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body mx-4">
                            <div class="md-form mb-4">
                                <div class="login-success">
                                    <strong></strong> {{ loginstatussuccess }}
                                </div>
                                <div class="login-fail">
                                    <strong></strong> {{ loginstatusfail }}
                                </div>
                            </div>

                            <div class="md-form mb-4">
                                <input type="text" id="Form-email2" class="form-control email" placeholder="Your email" ref="email2" v-model="logusername">
                            </div>

                            <div class="md-form b-3">
                                <input type="password" id="Form-pass2" class="form-control password" placeholder="Your password" ref="password2" v-model="logpassword"><br>
                            </div>

                            <div class="text-center mb-3">
                                <button type="button" class="btn blue-gradient btn-block btn-rounded z-depth-1a" @click="loginUser">SIGN IN</button>
                            </div>
                            <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign In with:</p>

                            <div class="row my-3 d-flex justify-content-center">            
                                <!-- <fblogin></fblogin> -->            
                                <!-- <button type="button" class="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i class="fa fa-facebook text-center"></i></button> -->
                            </div>
                        </div>
                    
                        <div class="modal-footer mx-5 pt-3 mb-1">
                            <p class="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#elegantModalForm" class="blue-text ml-1"> Register</a></p>
                        </div>
                    </div>
                </div>
            </div>            
        </form>
    </div>
    `
})




