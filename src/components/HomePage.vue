<template>
    <h1>Home</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomePage',
    computed: mapGetters('auth', ['getUser'])
}
</script>

<style>

</style>