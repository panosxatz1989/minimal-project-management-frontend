<template>
    <h1>Home</h1>
    <router-link to="/projects" class="is-link">All Projects</router-link>
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