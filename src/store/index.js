import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import dataTable from './modules/Table/dataTable'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dataTable
    },

    state: {
        form: {
            id: '',
            smartphone: '',
            price: '',
            company: null
        },
        model: 'Add',
        searchText: '',
        listsTodoHeader: ['#', 'Name', 'Email', 'Website'],
        listsTodo: [],
        editing: null
    },

    // Xử lý dữ liệu
    getters: {
        dataFilter: state => {
            if (state.searchText) {
                return state.dataTable.data.filter((item) => {
                    return state.searchText
                        .toLowerCase()
                        .split(" ")
                        .every((u) => item.smartphone.toLowerCase().includes(u));
                });
            }
            return state.dataTable.data;
        },
        dataSortPrice: (state, getters) => {
            return getters.dataFilter.sort((a, b) => a.price - b.price)
        },
        lengthListTodo: (state) => {
            return state.listsTodo.length
        }
    },

    // Mutations: dùng để thay đổi giá trị của state
    mutations: {
        handleDataDelete(state, id) {
            let dataDelete = state.dataTable.data.filter(item => item.id != id)
            state.dataTable.data = dataDelete
        },
        addDataForm(state, data) {
            let arrId = []
            state.dataTable.data.map(item => {
                arrId.push(item.id)
            })
            state.form.id = Math.max(...arrId) + 1
            state.dataTable.data.push(JSON.parse(JSON.stringify(data)))
        },
        handleEdit(state, phone) {
            state.form = JSON.parse(JSON.stringify(phone));
            state.model = 'Edit'
        },
        editDataForm(state, data) {
            state.dataTable.data = JSON.parse(JSON.stringify(
                state.dataTable.data.map(item => {
                    if (item.id == data.id) return data
                    else return item
                })
            ))
        },
        setModelAdd(state, model) {
            state.model = model
        },
        handleSearch(state, text) {
            state.searchText = text
        },

        // Get API
        setLists(state, listsTodo) {
            state.listsTodo = listsTodo
        },
        // Delete
        deleteItem(state, id) {
            state.listsTodo = state.listsTodo.filter(item => item.id != id)
        },
        //Edit
        setEditModel(state, id) {
            state.editing = id
        },
        handleCancel(state) {
            state.editing = null
        },
        editDataAPI(state, data) {
            state.listsTodo = state.listsTodo.map(item =>
                item.id === data.id ? data : item
            )
            state.editing = null
        }
    },

    actions: {
        async getList({ commit }) {
            try {
                const reponse = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                )
                const data = await reponse.json();
                commit('setLists', data)
            } catch (e) {
                console.log(e)
            }
        },

        async handleDeleteAPI({ commit }, id) {
            try {
                await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    method: 'DELETE'
                });
                commit('deleteItem', id)
            } catch (error) {
                console.log(error)
            }
        },

        async handleEditAPI({ commit }, todo) {
            try {
                const reponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${todo.id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(todo),
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                    }
                );
                const data = await reponse.json()
                commit('editDataAPI', data)
            } catch (error) {
                console.log(error)
            }
        }
    },
})
