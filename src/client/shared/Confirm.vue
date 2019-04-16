<template>
    <div
        class="absolute w-full h-full pin-t z-50 bg-grey-darkest-modal"
        v-if="open"
    >
        <div class="w-full flex">
            <div
                class="bg-white rounded-lg shadow w-full mt-24 max-w-sm mx-auto"
            >
                <div class="p-8">
                    <h4 class="font-thin text-lg mb-8">
                        {{ message }}
                    </h4>

                    <span class="text-grey-dark">
                        {{ messageBody }}
                    </span>
                </div>

                <footer
                    class="w-full flex bg-grey-lighter justify-end rounded-b-lg px-8 py-4"
                >
                    <button
                        @click="cancel()"
                        class="bg-transparent mr-6 text-grey-dark focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        @click="handleDelete()"
                        class="trans-30 text-white bg-red-light focus:outline-none px-8 h-9 rounded-lg hover:bg-red-dark"
                    >
                        Delete
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        open: false,
        action: '',
        data: {},
        message: '',
        messageBody: ''
    }),

    mounted() {
        Bus.$on('DeleteResources', items => {
            this.open = true

            this.data = items

            this.action = 'DeleteResources'

            switch (this.action) {
                case 'DeleteResources':
                    this.message = items.length > 1 ? 'Delete resources ? ' : 'Delete resource ?'

                    console.log('-->', items.length)

                    this.messageBody = items.length === 1 ? 'Are you sure you want to delete this resource ?' : `Are you sure you want to delete ${items.length} resources ?`
                    break;
                default:
                    break;
            }
        })
    },

    methods: {
        handleDelete() {
            this.open = false

            Bus.$emit(`${this.action}Confirmed`, this.data)
        },
        cancel() {
            this.data = {}

            this.action = ''

            this.open = false
        }
    }
}
</script>
