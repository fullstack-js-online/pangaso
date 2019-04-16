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
                        @click="handleConfirm()"
                        :class="`${action === 'DeleteResources' || (action === 'RunAction' && data.isDestructive) ? DANGER_BUTTON : PRIMARY_BUTTON}`"
                    >
                        {{ action === 'DeleteResources' ? 'Delete' : 'Run Action' }}
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
        ['DeleteResources', 'RunAction'].forEach(event => {
            Bus.$on(event, items => {
                /**
                 * 
                 * Display the confirm modal
                 * 
                 */
                this.open = true

                /**
                 * 
                 * Set the payload for this 
                 */
                this.data = items

                /**
                 * 
                 * Set the current action name
                 * 
                 */
                this.action = event

                switch (this.action) {
                    case 'DeleteResources':
                        this.message =
                            items.length > 1
                                ? 'Delete resources ? '
                                : 'Delete resource ?'

                        this.messageBody =
                            items.length === 1
                                ? 'Are you sure you want to delete this resource ?'
                                : `Are you sure you want to delete ${
                                    items.length
                                } resources ?`
                        break
                     case 'RunAction':
                        this.message = this.data.name

                        this.messageBody = items.count === 1 ? 'Are you sure you want to run this action ?' : `Are you sure you want to run this action on ${items.count} resources ?`

                        break
                    default:
                        break
                }
            })
        })
    },

    methods: {
        handleConfirm() {
            this.open = false

            Bus.$emit(`${this.action}Confirmed`, this.data)

            this.cancel()
        },
        cancel() {
            this.data = {}

            this.action = ''

            this.open = false
        }
    }
}
</script>
