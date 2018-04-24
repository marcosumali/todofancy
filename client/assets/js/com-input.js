var inputsection = Vue.component('inputsection', {
    props: ['greet', 'fullname', 'pleaselogin', 'prologue', 'emptystatus', 'enter', 'show', 'showemptystatus'],
    data() {
        return {
            todo: ''
        }
    },
    methods: {
        enterTodo: function () {
            let obj = {
                todo: this.todo,
            }
            // console.log('ini form dari child', obj)
            this.$emit('newtodo', obj)
        }
    },
    template:`
    <div>
        <div class="col-md-6 offset-md-3">
            <div class="greet animated swing">
                <h1 class="animated swing">{{ greet }} <span class="blue-text ml-1" style="color:white">{{ fullname }}</span></h1>
                <h4 class="animated swing"><span style="color:whitesmoke">{{ pleaselogin }}</span></h4>
            </div>
        </div>

        <div class="col-md-6 offset-md-3">
            <div class="prologue">
                <transition name="bounce">
                    <h4 v-if="show">{{ prologue }}</h4>
                </transition>
            </div>
        </div>

        <div class="col-md-6 offset-md-3">
            <div class="input-section-todo">
                    <div class="form-group">
                        <div class="col-md-12">
                            <input type="text" class="form-control animated fadeInDownBig" id="input-todo" aria-describedby="emailHelp" placeholder="Your to do list . . ." ref="inputtodo" v-model='todo' @keyup.enter="enterTodo">
                        </div>    
                    </div>
            </div>
        </div>

        <div class="col-md-6 offset-md-3">
            <div class="prologue">
                <transition name="bounce">
                    <h5 v-if="showemptystatus" style="color:white;font-style: italic;">{{ emptystatus }}</h5>
                </transition>
            </div>
        </div>

    </div>
    `
})




