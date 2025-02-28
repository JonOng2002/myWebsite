<template>
    <div :class="{'bg-white': isDark, 'bg-black': !isDark }" class=" flex items-center justify-center col-span-1 row-span-1 rounded-[2rem] transition duration-100 hover:ring-2 hover:ring-500 hover:scale-105 overflow-hidden">
        <a href="https://github.com/JonOng2002">
            <img v-if="isDark" src="../assets/github-mark.png">
            <img v-else src="../assets/githubdark.png">
        </a>
    </div>
</template>

<script>
export default {
    props: {
        isDark: {
            type: Boolean,
            required: true
        }
    }
}
</script>
