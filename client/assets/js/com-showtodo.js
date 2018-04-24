var showtodo = Vue.component('showtodo', {
    props: ['todolists', 'deletetodo', 'show'],
    data() {
        return {
        }
    },
    methods: {
        showTodo: function () {
        }
    },
    template:`
    <div>
        <div class="col-md-6 offset-md-3 container-todolist" v-for="todolist in todolists">
            <div class="col-md-12 items-todolist">
                <div class="todolist-row">
                    <div class="todolist col-md-11">
                        <h4 v-if="show" class="animated slideInLeft" ref="todolist" :key="">{{ todolist.description }}</h4>
                    </div>
                    <div class="button col-md-1">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="deletetodo(todolist._id)">
                            <span aria-hidden="true">&times;</span>
                        </button>        
                    </div>
                </div>
            </div>
        </div>    
    </div>    
    `
})




